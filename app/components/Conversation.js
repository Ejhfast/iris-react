import React, { PropTypes, Component } from 'react';
import Message from './Message';
import VisualMessage from './VisualMessage';
import DataMessage from './DataMessage';
import ExplainMessage from './ExplainMessage';
import Title from './Title';
import * as proptypes from '../proptypes/types';
// import SemanticView from '../components/SemanticView';

class Conversation extends Component {

    render = () =>
        <div className="innerConversation">
            <Title text={this.props.title} args={this.props.args} id={this.props.id}/>
            {this.props.messages.map(message => {
                let content;
                console.log(message.text);
                if(typeof message.text === 'object' && message.text.type === 'image') {
                    content = <VisualMessage key={message.id} origin={message.origin} content={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'data') {
                    content = <DataMessage key={message.id} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'explain') {
                    content = <ExplainMessage key={message.id} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else {
                    content = <Message key={message.id} origin={message.origin} text={message.text} hidden={this.props.hidden}/>;
                }
                return content;
            })}
        </div>;
}

Conversation.propTypes = {
    messages: proptypes.messagesType,
    title: PropTypes.any,
    args: PropTypes.any,
    id: PropTypes.int,
    hidden: PropTypes.bool
};

export default Conversation;
