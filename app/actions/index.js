import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function addMessage(message) {
    return {
        type: types.ADD_MESSAGE,
        ...message
    };
}

export function addInputHistory(message) {
    return {
        type: types.ADD_INPUT_HISTORY,
        ...message
    };
}

export function moveInputHistory(message) {
    return {
        type: types.MOVE_INPUT_HISTORY,
        ...message
    };
}

export function hint(message) {
    return {
        type: types.HINT,
        ...message
    };
}

export function hideConversation(id) {
    return {
        type: types.HIDE_CONVERSATION,
        id
    };
}
