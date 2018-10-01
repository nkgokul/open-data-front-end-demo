const yearWiseHistoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_YEAR_WISE_HISTORY':
          return action.data;
        default:
          return state;
      }
  }
  export default yearWiseHistoryReducer;