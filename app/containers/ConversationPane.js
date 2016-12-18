import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Conversation from '../components/Conversation';
import InputBox from './InputBox';
import { postMessages, getVariables } from '../api_calls/python';

// const flatten = list => list.reduce(
//     (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
// );

// const flattenMessages = (history, convo) => {
//     const pastMessages = history.map(m => { return m.messages; });
//     console.log('stuff');
//     console.log(history);
//     console.log(pastMessages);
//     console.log(flatten(pastMessages).concat(convo.messages));
//     return flatten(pastMessages).concat(convo.messages);
// };

let messageDOM;

class ConversationPane extends Component {

    componentDidMount() {
        console.log('hello');
        getVariables();
    }

    componentDidUpdate() {
        // Notify Iris when the message list is updated
        // moved this out of the reducer
        messageDOM.scrollTop = messageDOM.scrollHeight;

        const { messages, state } = this.props;
        if (messages.length > 0 && messages[messages.length - 1].origin !== 'iris') {
            postMessages(messages, state);
        }
    }

    render = () =>
        <div className="left_pane">
            <div className="content_box" id="message_pane" ref={(node) => { messageDOM = node; }}>
                { this.props.history.map(convo => {
                    console.log('convo', convo);
                    return <Conversation key={convo.id} messages={convo.messages} title={convo.title} />;
                })}
                <Conversation key={this.props.convo.id} messages={this.props.messages} title={this.props.convo.title} />
            </div>
            <InputBox />
        </div>;
}

ConversationPane.propTypes = {
    convo: PropTypes.any,
    messages: PropTypes.any,
    state: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.any)
};

const mapStateToProps = (state) => ({
    convo: state.conversation.currentConvo,
    messages: state.conversation.currentConvo.messages,
    history: state.conversation.history,
    state: state.conversation.state
});

ConversationPane = connect(mapStateToProps)(ConversationPane);

export default ConversationPane;
