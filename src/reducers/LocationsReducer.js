let initialState = {
  data: [
    {
      id: 'id1',
      name: 'Denver',
      lat: 39.742043,
      lng: -104.991531,
    },
    {
      id: 'id2',
      name: 'LA',
      lat: 34.052235,
      lng: -118.243683,
    },
    {
      id: 'id3',
      name: 'Boston',
      lat: 42.364506,
      lng: -71.038887,
    },
  ],
};

const Locations = (state = initialState, action) => {
  switch (action.type) {
    // case 'STORE_LOCATIONS':
    //   return Object.assign({}, state, {
    //     data: state.data.concat(action.data),
    //   });
    case 'ADD_LOCATION':
      console.log('testing our newly added location: ', action.data);
      return Object.assign({}, state, {
        data: state.data.concat(action.data),
      });
    default:
      return state;
  }
};

export default Locations;
