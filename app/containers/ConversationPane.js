import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Conversation from '../components/Conversation';
import InputBox from './InputBox';
import postMessages from '../api_calls/python';
import * as proptypes from '../proptypes/types';

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

class ConversationPane extends Component {

    componentDidUpdate() {
        // Notify Iris when the message list is updated
        // moved this out of the reducer
        const { messages, id, state } = this.props;
        console.log(this.props.state);
        if (messages.length > 0 && messages[messages.length - 1].origin !== 'iris') {
            postMessages(messages, id, state);
        }
    }

    render = () =>
        <div className="left_pane">
            <Conversation messages={flatten([...this.props.history, this.props.messages])} />
            <InputBox />
        </div>;
}

ConversationPane.propTypes = {
    messages: proptypes.messagesType,
    id: PropTypes.number,
    state: PropTypes.string,
    history: PropTypes.arrayOf(proptypes.messagesType)
};

const mapStateToProps = (state) => ({
    messages: state.conversation.messages,
    history: state.conversation.history,
    id: state.conversation.id,
    state: state.conversation.state
});

ConversationPane = connect(mapStateToProps)(ConversationPane);

export default ConversationPane;
