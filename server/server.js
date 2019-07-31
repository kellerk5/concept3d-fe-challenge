/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const initialLocations = [
//   {
//     id: 'id1',
//     name: 'Denver',
//     lat: 39.742043,
//     lng: -104.991531,
//   },
//   {
//     id: 'id2',
//     name: 'LA',
//     lat: 34.052235,
//     lng: -118.243683,
//   },
//   {
//     id: 'id3',
//     name: 'Boston',
//     lat: 42.364506,
//     lng: -71.038887,
//   },
// ];

// app.locals.idIndex = 3;
// app.locals.locations = initialLocations;

// app.get('/locations', (req, res) => res.send({ locations: app.locals.locations }));

app.post('/locations', (req, res) => {
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
