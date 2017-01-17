import fetch from 'isomorphic-fetch';
import dispatch from '../index.js';

export const postMessages = (messages, state, conversation) => {
    fetch('http://localhost:8000/new_loop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages, state, conversation})
    })
    .then(response => response.json())
    .then(json => {
        dispatch(json);
        dispatch({'type': 'UPDATE_VARIABLES', 'variables': json.variables});
    });
};

export const setHistory = (messages, state, conversation) => {
    fetch('http://localhost:8000/set_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages, state, conversation})
    });
};

export const getVariables = () => {
    fetch('http://localhost:8000/variables', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(json));
};

export const getHistory = () => {
    fetch('http://localhost:8000/history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(json));
};

// export default { postMessages, getVariables };
