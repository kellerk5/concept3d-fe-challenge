const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
});

const awsClient = new AWS.DynamoDB.DocumentClient();

const initialLocations = [
  {
    id: 1,
    name: 'Denver',
    lat: 39.742043,
    lng: -104.991531,
  },
  {
    id: 2,
    name: 'LA',
    lat: 34.052235,
    lng: -118.243683,
  },
  {
    id: 3,
    name: 'Boston',
    lat: 42.364506,
    lng: -71.038887,
  },
];

initialLocations.forEach((marker) => {
  const newMarker = {
    TableName: 'Markers',
    Item: marker,
  };
  awsClient.put(newMarker, (err, data) => {
    if (err) {
      console.error(JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded: ', JSON.stringify(data));
    }
  });
});
