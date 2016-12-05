import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Conversation from '../components/Conversation';
import InputBox from './InputBox';
import { postMessages, getVariables } from '../api_calls/python';
import * as proptypes from '../proptypes/types';

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

class ConversationPane extends Component {

    componentDidMount() {
        console.log('hello');
        getVariables();
    }

    componentDidUpdate() {
        // Notify Iris when the message list is updated
        // moved this out of the reducer
        const { messages, state } = this.props;
        if (messages.length > 0 && messages[messages.length - 1].origin !== 'iris') {
            postMessages(messages, state);
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
    state: PropTypes.string,
    history: PropTypes.arrayOf(proptypes.messagesType)
};

const mapStateToProps = (state) => ({
    messages: state.conversation.messages,
    history: state.conversation.history,
    state: state.conversation.state
});

ConversationPane = connect(mapStateToProps)(ConversationPane);

export default ConversationPane;
