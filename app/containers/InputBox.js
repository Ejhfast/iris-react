import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMessage, addInputHistory, moveInputHistory } from '../actions/index.js';
import { updateHint } from '../api_calls/python.js';
import * as _ from 'lodash';


let input;

const notNull = (inputHistory) => inputHistory.currId !== null;
const getCurrentHistory = (inputHistory) => _.reverse(inputHistory.history.slice())[inputHistory.currId];

const onKeyDown = (dispatch, inputHistory, e) => {
    const keyCode = e.keyCode || e.which;
    console.log(keyCode);
    if (keyCode === 38) { // up arrow
        console.log('up arrow');
        dispatch(moveInputHistory({'direction': 'up'}));
        console.log(inputHistory);
        if (notNull(inputHistory)) {
            console.log('diplay', getCurrentHistory(inputHistory));
            input.value = getCurrentHistory(inputHistory);
        }
    } else if(keyCode === 40) { // down arrow
        console.log('down arrow');
        dispatch(moveInputHistory({'direction': 'down'}));
        console.log(inputHistory);
        if (notNull(inputHistory)) {
            console.log('display', getCurrentHistory(inputHistory));
            input.value = getCurrentHistory(inputHistory);
        }
    }
};

const onChangeInput = () => {
    updateHint(input.value);
};

// input goes here
let InputBox = ({ dispatch, inputHistory }) =>
    <div className="input_box">
        <form onSubmit={e => {
            e.preventDefault();
            dispatch(addMessage({'origin': 'user', 'text': [input.value] }));
            dispatch(addInputHistory({'message': input.value}));
            input.value = '';
        }}>
            <input onChange={() => onChangeInput()} onKeyDown={(e) => onKeyDown(dispatch, inputHistory, e)} type="text" placeholder="your message here" ref={node => {input = node;}}></input>
        </form>
    </div>;

InputBox.propTypes = {
    dispatch: PropTypes.func,
    inputHistory: PropTypes.any
};

const mapStateToProps = (state) => ({
    inputHistory: state.inputHistory
});

InputBox = connect(mapStateToProps)(InputBox);

export {InputBox, input};
