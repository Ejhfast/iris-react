import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

let genId = 0;
const appendMessage = (messages, text, origin = 'user', type = null, arg = null) => {
    return [...messages, {'origin': origin, 'text': text, 'id': genId++, 'state': type, 'arg': arg}];
};

const conversation = (state = {'history': [], 'messages': [], 'state': 'START'}, action) => {
    const { history, messages } = state;
    switch (action.type) {
        case types.ADD_MESSAGE:
            return { history, messages: appendMessage(messages, action.text), 'state': state.state };
        case types.ADD_SERVER_MESSAGE:
            let newMessages = messages;
            for (const m of action.text) {
                let arg = null;
                if (action.arg !== undefined) {
                    arg = action.arg;
                }
                newMessages = appendMessage(newMessages, m, 'iris', action.state, arg);
            }
            if (action.state === 'START') {
                return { history: [...history, newMessages], messages: [], state: 'START' };
            }
            return { history, messages: newMessages, state: action.state };
        default:
            return state;
    }
};

const variables = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_VARIABLES:
            return action.variables;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    conversation,
    variables,
    routing
});

export default rootReducer;
