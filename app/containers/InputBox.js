import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/index.js';

let input;

// input goes here
let InputBox = ({ dispatch }) =>
    <div className="input_box">
        <form onSubmit={e => {
            e.preventDefault();
            dispatch(addMessage({'origin': 'user', 'text': [input.value] }));
            input.value = '';
        }}>
            <input type="text" placeholder="your message here" ref={node => {input = node;}}></input>
        </form>
    </div>;

InputBox.propTypes = {
    dispatch: PropTypes.func
};

InputBox = connect()(InputBox);

export default InputBox;
