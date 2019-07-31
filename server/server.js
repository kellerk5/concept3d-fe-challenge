/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const AWS = require("aws-sdk");

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});
const awsClient = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/locations', (req, res) => {
  const params = {
    TableName: "Markers",
    ProjectionExpression: "#id, #name, #lat, #lng",
    ExpressionAttributeNames: {
        "#id": "id",
        "#name": "name",
        "#lat": "lat",
        "#lng": "lng",
    }
  };
  awsClient.scan(params, (err, data) => {
    if (err) {
      console.error("Error while scanning database table: ", JSON.stringify(err, null, 2));
    } else {
      return res.send({ locations: data.Items })
    }
  });
});

app.post('/locations', (req, res) => {
  // input field validation
  // TO-DO: break validation into separate utility
  if (!req.body.name || !req.body.lat || !req.body.lng) { return res.status(500).send({ message: 'Please fill out the appropriate fields!' })}
  const latLngReg = /^-?\d{1,3}(?:\.\d{1,10})?$/;
  if (!req.body.lat.match(latLngReg) || !req.body.lng.match(latLngReg)) { return res.status(500).send({ message: 'Lat and Lng must be valid coordinates!' })}
  const lat = Number(req.body.lat);
  const lng = Number(req.body.lng);
  if (lat > 90 || lat < -90) { return res.status(500).send({ message: 'Lat must be within -90 to 90!' })}
  if (lng > 180 || lng < -180) { return res.status(500).send({ message: 'Lng must be within -180 to 180!' })}

  const newObj = {
    name: req.body.name,
    lat: lat,
    lng: lng,
  };
  const newMarker = {
    TableName: 'Markers',
    Item: {
        id: Math.random(),
        ...newObj
    },
  };
  awsClient.put(newMarker, (err, data) => {
    if (err) {
      console.error("Unable to add new marker to database table: ", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded! ", JSON.stringify(data));
    }
  });
  res.status(200).send(newObj);
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const portNumber = process.env.PORT || 3001;

app.listen(portNumber, () => {
  console.log('RrrarrrrRrrrr server alive on port 3001');
});
