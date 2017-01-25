import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let PredictionStrip = ({predictions}) =>
    <div className="prediction_strip">
        {predictions.map(prediction => <span className="prediction">{ prediction }</span>)}
    </div>;

PredictionStrip.propTypes = {
    predictions: PropTypes.any
};

const mapStateToProps = (state) => ({
    predictions: state.predictions
});

PredictionStrip = connect(mapStateToProps)(PredictionStrip);

export default PredictionStrip;
