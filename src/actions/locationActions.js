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
        if (!response.ok) {
          return response.json().then((json) => {
            throw Error(json.message);
          });
        }
        return response.json();
      })
      .then(json => dispatch(postNewLocation(json)))
      .catch((error) => {
        return alert(error);
      });
  };
};
