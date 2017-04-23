import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if(Meteor.isServer){
const noteOne = {
  _id: 'testNoteId1',
  title: 'My Title',
  body: 'My body for note',
  updateAt: 0,
  userId: 'testUserId1'
}
const noteTwo = {
  _id: 'testNoteId2',
  title: 'My second Title',
  body: 'My body for second note',
  updateAt: 0,
  userId: 'testUserId2'
}
  describe('notes', function () {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
        const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: noteOne.userId});
        expect(Notes.findOne({ _id, userId: noteOne.userId})).toExist();
    });

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    })

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
      expect(Notes.findOne({ _id: noteOne._id})).toNotExist();
    });

    it('should not remove note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();
    });

    it('should update the note', function() {
      const title = 'My new title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);
      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('should throw error if extra fields in updates', function() {
      const corruptUpdates = {
        title: 'My newest title',
        body: 'New body',
        revision: 1
      };
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { ...corruptUpdates }
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creater', function() {
      const title = 'My new title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testid'
      }, [
        noteOne._id,
        { title }
      ]);
      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({},[
          noteOne._id,
          { title }
        ]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          { title }
        ]);
      }).toThrow();
    });

    it('should only return a users own notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return no notes for user that has none', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'notValidUser' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });

  });
}
