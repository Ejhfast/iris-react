import fetch from 'isomorphic-fetch';
import dispatch from '../index.js';

const postMessages = (messages, state) => {
    fetch('http://localhost:8000/new_loop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages, state})
    })
    .then(response => response.json())
    .then(json => dispatch(json));
};

export default postMessages;
