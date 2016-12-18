import React, { PropTypes, Component } from 'react';
import Message from './Message';
import VisualMessage from './VisualMessage';
import * as proptypes from '../proptypes/types';
// import SemanticView from '../components/SemanticView';


class Conversation extends Component {

    render = () =>
        <div className="innerConversation">
            <div className="title">{ this.props.title }</div>
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
    messages: proptypes.messagesType,
    title: PropTypes.any
};

export default Conversation;
