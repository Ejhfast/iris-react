import React, { PropTypes } from 'react';
import { input } from '../containers/InputBox';
import { updateHint } from '../api_calls/python.js';

import { connect } from 'react-redux';

const setInput = (text) => {
    return () => {
        let stripText = text.replace(/{/g, '').replace(/}/g, '');
        input.value = stripText;
        updateHint(stripText);
    };
};

let PredictionStrip = ({predictions}) =>
    <div className="prediction_strip">
        {predictions.map(prediction => <span onClick={setInput(prediction)} className="prediction">{ prediction }</span>)}
    </div>;

PredictionStrip.propTypes = {
    predictions: PropTypes.any
};

const mapStateToProps = (state) => ({
    predictions: state.predictions
});

PredictionStrip = connect(mapStateToProps)(PredictionStrip);

export default PredictionStrip;
