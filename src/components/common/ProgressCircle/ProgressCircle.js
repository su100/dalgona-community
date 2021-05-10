import React from 'react';
import { CircularProgress } from '@material-ui/core';

import './ProgressCircle.scss';

const ProgressCircle = () => (
  <div className="progress-circle">
    <div className="progress-circle__background">
      <CircularProgress />
    </div>
  </div>
);

export default ProgressCircle;
