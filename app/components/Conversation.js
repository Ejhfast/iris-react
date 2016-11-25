import React, { Component } from 'react';
import Message from './Message';
import * as proptypes from '../proptypes/types';

let messageDOM;

class Conversation extends Component {

    componentDidUpdate() {
        messageDOM.scrollTop = messageDOM.scrollHeight;
    }

    render = () =>
        <div className="content_box" id="message_pane" ref={(node) => { messageDOM = node; }}>
            {this.props.messages.map(message =>
                <Message key={message.id} origin={message.origin} text={message.text}/>
            )}
        </div>;

}

Conversation.propTypes = {
    messages: proptypes.messagesType
};

export default Conversation;
