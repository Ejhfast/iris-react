import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

let genId = 0;
const appendMessage = (messages, text, origin = 'user', type = null) => {
    return [...messages, {'origin': origin, 'text': text, 'id': genId++, 'state': type}];
};

const conversation = (state = {'history': [], 'messages': [], 'state': 'START'}, action) => {
    const { history, messages } = state;
    switch (action.type) {
        case types.ADD_MESSAGE:
            return { history, messages: appendMessage(messages, action.text), 'state': state.state };
        case types.ADD_SERVER_MESSAGE:
            let newMessages = messages;
            for (const m of action.text) {
                newMessages = appendMessage(newMessages, m, 'iris', action.state);
            }
            if (action.state === 'START') {
                return { history: [...history, newMessages], messages: [], state: 'START' };
            }
            return { history, messages: newMessages, state: action.state };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    conversation,
    routing
});

export default rootReducer;
