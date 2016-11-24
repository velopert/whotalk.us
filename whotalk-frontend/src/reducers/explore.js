import EXPLORE from 'actions/ActionTypes/explore';
import rs from 'helpers/requestStatus';

const initialState = {
    activityData: [],
    requests: {
        getInitialActivity: {
            ...rs.requests
        }
    }
}



function explore(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case EXPLORE.INITIALIZE:
            return {
                ...initialState
            }

        default:
            return state;
    }
}

export default explore;