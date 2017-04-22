import React from 'react';
import PrivateHeader from './PrivateHeader';

// stateless component apprach is much faster og simpler than class based components.
export default () => {
  return (
    <div>
      <PrivateHeader title="Meteor Boilerplate"/>
      <div className="page-content">
        Dashboard page content.
      </div>
    </div>
  );
};
