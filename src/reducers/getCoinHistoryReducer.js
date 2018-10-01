const coinHistoryReducer = (state = [], action) => {
  switch(action.type) {
      case 'SET_COIN_HISTORY':
        return action.data;
      default:
        return state;
    }
}
export default coinHistoryReducer;
