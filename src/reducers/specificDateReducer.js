const specificDateReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SPECIFIC_DATE_HISTORY':
          return action.data;
        default:
          return state;
      }
  }
  export default specificDateReducer;
  