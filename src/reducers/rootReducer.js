import coinHistoryReducer from './getCoinHistoryReducer';
import specificDateReducer from './specificDateReducer';
import yearWiseHistoryReducer from './yearWiseHistoryReducer';

const appReducer = (currentState = {}, action) => {
    return {
        coinHistoryReducer: coinHistoryReducer(currentState.coinHistoryReducer, action),
        specificDateReducer: specificDateReducer(currentState.specificDateReducer, action),
        yearWiseHistoryReducer: yearWiseHistoryReducer(currentState.yearWiseHistoryReducer, action)
    }
};

export default appReducer;
