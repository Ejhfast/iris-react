import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';


const valueOrNull = (value) => {
    if (value !== undefined) {
        return value;
    }
    return null;
};

let genId = 0;
const appendMessages = (oldMessages, action) => { // text, origin = 'user', type = null, arg = null) => {
    const newMessages = [];
    for (const m of action.text) {
        newMessages.push({'origin': action.origin, 'text': m, 'id': genId++,
                          'state': valueOrNull(action.state), 'arg': valueOrNull(action.arg)});
    }
    return oldMessages.concat(newMessages);
};

const appendMessagesConvo = (convo, action) => {
    const { messages } = convo;
    return { ...convo, messages: appendMessages(messages, action) };
};

const conversation = (state = {'history': [], 'currentConvo': { 'messages': [], 'title': null, 'id': 0 }, 'state': 'START'}, action) => {
    const { history, currentConvo } = state;
    switch (action.type) {
        case types.ADD_MESSAGE:
            return { history, currentConvo: appendMessagesConvo(currentConvo, action), 'state': state.state };
        case types.ADD_SERVER_MESSAGE:
            let newConvo = appendMessagesConvo(currentConvo, action);
            if (action.state === 'START') {
                newConvo = {...newConvo, title: action.label };
                return { history: history.concat([newConvo]), 'currentConvo': { 'messages': [], 'id': newConvo.id + 1 }, state: 'START' };
            }
            return { history, currentConvo: newConvo, state: action.state };
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
