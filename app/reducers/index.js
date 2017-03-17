import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import * as _ from 'lodash';

const valueOrNull = (value) => {
    if (value !== undefined) {
        return value;
    }
    return null;
};

const appendMessages = (oldMessages, action) => { // text, origin = 'user', type = null, arg = null) => {
    const newMessages = [];
    let currentMax = 0;
    if (oldMessages.length > 0) {
        console.log('map', _.map(oldMessages, function(m) { return m.id; }));
        currentMax = _.max(_.map(oldMessages, function(m) { return m.id; }));
    }
    for (const m of action.text) {
        currentMax++;
        newMessages.push({'origin': action.origin, 'text': m, 'id': currentMax,
                          'state': valueOrNull(action.state), 'arg': valueOrNull(action.arg)});
    }
    return oldMessages.concat(newMessages);
};

const appendMessagesConvo = (convo, action) => {
    const { messages } = convo;
    return { ...convo, messages: appendMessages(messages, action), args: action.arg_map };
};

const conversation = (state = {'history': [], 'currentConvo': { 'messages': [], 'title': null, 'hidden': false, 'id': 0, 'args': {} }, 'state': 'START'}, action) => {
    const { history, currentConvo } = state;
    let newConvo;
    switch (action.type) {
        case types.UPDATE_HISTORY:
            console.log(action.conversation.currentConvo);
            return { history: action.conversation.history, currentConvo: action.conversation.currentConvo, 'state': state.state };
        case types.ADD_MESSAGE:
            return { history, currentConvo: appendMessagesConvo(currentConvo, action), 'state': state.state };
        case types.ADD_SERVER_MESSAGE:
            if (action.text.length === 0) {
                return state;
            }
            newConvo = appendMessagesConvo(currentConvo, action);
            if (action.state === 'START') {
                // hardcoding some logic here for syncing history with server on START
                // this allows some commands to overwrite history immediately
                let theId = action.history.length;
                newConvo = {...newConvo, title: action.label, id: theId };
                return { history: action.history.concat([newConvo]), 'currentConvo': { 'messages': [], 'title': null, 'hidden': false, 'id': newConvo.id + 1, 'args': {} }, state: 'START' };
            }
            return { history, currentConvo: newConvo, state: action.state };
        case types.HIDE_CONVERSATION:
            const newHistory = _.map(history, conv => {
                const out = {...conv};
                if (conv.id === action.id) {
                    out.hidden = !out.hidden;
                }
                return out;
            });
            newConvo = {...currentConvo};
            if (newConvo.id === action.id) {
                newConvo.hidden = !newConvo.hidden;
            }
            return { history: newHistory, currentConvo: newConvo, state: state.state};
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

const predictions = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_PREDICTIONS:
            return action.predictions;
        default:
            return state;
    }
};

const inputHistory = (state = {'history': [], 'currId': null, 'showHistory': false }, action) => {
    let newId;
    switch (action.type) {
        case types.ADD_INPUT_HISTORY:
            newId = state.currId;
            if (state.history.length === 0 && newId === null) {
                newId = 0;
            }
            return {...state, 'history': [...state.history, action.message], 'currId': newId};
        case types.MOVE_INPUT_HISTORY:
            if (state.history.length === 0) {
                return state;
            }
            newId = state.currId || 0;
            if (action.direction === 'up') {
                if (newId < (state.history.length - 1)) {
                    newId += 1;
                }
            } else {
                if (newId >= 1) {
                    newId -= 1;
                }
            }
            return {...state, 'currId': newId };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    conversation,
    variables,
    predictions,
    inputHistory,
    routing
});

export default rootReducer;
