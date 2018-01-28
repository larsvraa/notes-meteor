import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';
// stateless component apprach is much faster og simpler than class based components.
export default () => {
  return (
    <div>
      <PrivateHeader title="Notes" />
      <div className="page-content">
        <div className="page-content__sidebar">
          <NoteList />
        </div>
        <div className="page-conten__main">
          <Editor />
        </div>
      </div>
    </div>
  );
};
