/* eslint-disable no-alert */
/* eslint-disable no-else-return */
require('isomorphic-fetch');

const storeAllLocations = (locations) => {
  return {
    type: 'STORE_LOCATIONS',
    data: locations.locations,
  };
};

const postNewLocation = (location) => {
  return {
    type: 'ADD_LOCATION',
    data: location,
  };
};

// const handleError = (response) => {
//   return {
//     type: 'NEW_ERROR',
//     data: response.ok,
//   };
// };

export const fetchAllLocations = () => {
  return (dispatch) => {
    return fetch('/locations', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(locations => locations.json())
      .then(json => dispatch(storeAllLocations(json)));
  };
};

export const saveLocation = (data) => {
  return (dispatch) => {
    return fetch('/locations', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          const json = response.json();
          return json;
        } else {
          alert('oh no, something went wrong!');
        }
      })
      .then(json => dispatch(postNewLocation(json)));
  };
};
