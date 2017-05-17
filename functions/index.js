var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


exports.updatePublicChannels = functions.database.ref('/channels/{channelId}')
    .onWrite(event => {
        const channel = event.data;
        const { channelId }= event.params;
        if(channel.child('privacy').val() === 'public'){
            let publicChannel = {};
            publicChannel[channelId] = channel.val();
            return channel.ref.parent.child('public').update(publicChannel);
        }else{
            let privateChannel = channel.ref.parent.child('public').child(channelId);
            return Promise.resolve(privateChannel ? privateChannel.remove() :  true);
        }
    });