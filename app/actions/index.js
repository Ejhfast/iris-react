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

export function hideConversation(id) {
    return {
        type: types.HIDE_CONVERSATION,
        id
    };
}
