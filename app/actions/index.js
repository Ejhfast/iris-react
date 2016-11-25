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
