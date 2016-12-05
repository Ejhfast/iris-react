import { PropTypes } from 'react';

export const messageType = {
    text: PropTypes.string,
    origin: PropTypes.string,
};

export const visualMessageType = {
    content: PropTypes.string,
    origin: PropTypes.string,
};

// const messageTypeArray = PropTypes.shape({
//     text: PropTypes.string,
//     origin: PropTypes.string,
// });

export const messagesType = PropTypes.arrayOf(PropTypes.any);
