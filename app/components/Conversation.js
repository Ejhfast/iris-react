import React, { Component } from 'react';
import Message from './Message';
import VisualMessage from './VisualMessage';
import * as proptypes from '../proptypes/types';

let messageDOM;

class Conversation extends Component {

    componentDidUpdate() {
        messageDOM.scrollTop = messageDOM.scrollHeight;
    }

    render = () =>
        <div className="content_box" id="message_pane" ref={(node) => { messageDOM = node; }}>
            {this.props.messages.map(message => {
                let content;
                console.log(message);
                if(typeof message.text === 'object') {
                    console.log('Visual Message');
                    content = <VisualMessage key={message.id} origin={message.origin} content={message.text.value}/>;
                } else {
                    content = <Message key={message.id} origin={message.origin} text={message.text}/>;
                }
                return content;
            })}
        </div>;

}

Conversation.propTypes = {
    messages: proptypes.messagesType
};

export default Conversation;
