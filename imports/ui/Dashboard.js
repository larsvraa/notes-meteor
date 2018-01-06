import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';
// stateless component apprach is much faster og simpler than class based components.
export default () => {
  return (
    <div>
      <PrivateHeader title="Notes"/>
      <div className="page-content">
        <NoteList />
        <Editor />
      </div>
    </div>
  );
};
