import fetch from 'isomorphic-fetch';
import dispatch from '../index.js';

const postMessages = (messages, classId, state) => {
    console.log(messages, classId, state);
    fetch('http://localhost:8000/new_loop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'messages': messages, 'id': classId, 'state': state})
    })
    .then(response => response.json())
    .then(json => dispatch(json));
};

export default postMessages;
