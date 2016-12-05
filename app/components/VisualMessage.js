import React from 'react';
import * as proptypes from '../proptypes/types';

const VisualMessage = ({ origin, content }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'}>
        <img width="300px" alt="Embedded Image" src={'data:image/png;base64,' + content} />
    </div>;

VisualMessage.propTypes = proptypes.visualMessageType;

export default VisualMessage;
