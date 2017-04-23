import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import { Notes } from './../api/notes';

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader/>
      NoteList { props.notes.length }

      {props.notes.map((note) => {
          return <NoteListItem key={note._id} note={note}/>;
        })
      }

      {/* {() => {
        if (props.notes.length === 0){
          return (
            <div className="item">
              <p className="item__message">Add your first note to get started!</p>
            </div>
          )
        } else {
          return props.notes.map((note) => {
            return <NoteListItem key={note._id} note={note}/>;
          });
        }
      }} */}
    </div>
  )
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
}

export default createContainer (() => {
  Meteor.subscribe('notes');

  return {
    //pass ind users notes as a props
    notes: Notes.find().fetch()
  };
},NoteList);
