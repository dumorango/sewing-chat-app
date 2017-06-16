// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updatePublicGroupsList = functions.database.ref('/groups/{groupId}')
    .onWrite((event) => {
      const group = event.data;
      const { groupId } = event.params;
      const publicGroupsRef = admin.database().ref('/groups/public');
      if (group.child('privacy').val() === false) {
        const publicGroup = {};
        publicGroup[groupId] = group.val();
        return publicGroupsRef.update(publicGroup);
      }
      const privateGroup = publicGroupsRef.child(groupId);
      return Promise.resolve(privateGroup ? privateGroup.remove() : true);
    });
