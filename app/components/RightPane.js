import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

let RightPane = ({ variables }) =>
    <div className="right_pane">
        <div className="subtitle">IrisML</div>
        <div className="snippet">A basic prototype, built with React and Redux. More will appear here soon.</div>
        <div className="variableTable">
            <div className="title">Current Variables</div>
            <ul>
              { _.map(_.sortBy(variables, (v) => {
                  return v.order;
              }),
                (x) => {
                    return <li><span className="half name">{ x.name }</span><span className="half">{ x.value }</span></li>;
                })}
            </ul>
        </div>
    </div>;

RightPane.propTypes = {
    variables: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (state) => ({
    variables: state.variables,
});

RightPane = connect(mapStateToProps)(RightPane);

export default RightPane;
