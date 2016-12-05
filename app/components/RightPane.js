import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let RightPane = ({ variables }) =>
    <div className="right_pane">
        <div className="subtitle">IrisML</div>
        <div className="snippet">A basic prototype, built with React and Reduct. More will appear here soon.</div>
        <div className="variableTable">
            <div className="title">Current Variables</div>
            <ul>
              { variables.map(v => <li><span className="half name">{ v }</span><span className="half">array</span></li>) }
            </ul>
        </div>
    </div>;

RightPane.propTypes = {
    variables: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => ({
    variables: state.variables,
});

RightPane = connect(mapStateToProps)(RightPane);

export default RightPane;
