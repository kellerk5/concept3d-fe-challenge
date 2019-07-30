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
  // VALIDATION: make sure lat/lng/name are present and then run regex
  if (req.body.name && req.body.lat && req.body.lng) {
    // TODO: why regex no work? maybe we don't need this........
    // const latLngReg = new RegExp('^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$');
    // let nameReg;
    // if (latLngReg.exec(req.body.lat) && latLngReg.exec(req.body.lng)) {
      // const newObj = {
      //   name: req.body.name,
      //   lat: Number(req.body.lat),
      //   lng: Number(req.body.lng),
      // };
      // res.status(200).send(newObj);
    // }
    const newObj = {
      name: req.body.name,
      lat: Number(req.body.lat),
      lng: Number(req.body.lng),
    };
    res.status(200).send(newObj);
  } else {
    // return NOT OKAY
    // res.status(400).send('<p>User error: invalid coordinates or name. Please try again!</p>');
    throw new Error('Please fill out the appropriate fields');
  }
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const portNumber = process.env.PORT || 3001;

app.listen(portNumber, () => {
  console.log('RrrarrrrRrrrr server alive on port 3001');
});
