import React, { PropTypes } from 'react';
import RightPane from './RightPane';

// import { Link } from 'react-router';

const App = ({ children }) =>
    <div>
        { children }
        <RightPane />
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
