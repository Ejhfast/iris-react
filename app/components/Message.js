import React from 'react';
import * as proptypes from '../proptypes/types';

const Message = ({ origin, text }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'}>
        <div className = "bubble"> {text} </div>
    </div>;

Message.propTypes = proptypes.messageType;

export default Message;
