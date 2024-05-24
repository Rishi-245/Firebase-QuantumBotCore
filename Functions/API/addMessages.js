const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.receiveMessage = functions.https.onRequest((request, response) => {
 // Extract the message data from the request
 const messageData = request.body;


 // Validate the message data
 if (!messageData || !messageData.text) {
   response.status(400).send("Bad Request: Message data is missing or invalid");
   return;
 }


 // Store the message in the Firestore database
 admin.firestore().collection('messages').add({
   text: messageData.text,
   timestamp: admin.firestore.FieldValue.serverTimestamp()
 })
 .then(() => {
   response.status(200).send("Message received and stored");
 })
 .catch(error => {
   response.status(500).send("Internal Server Error: Unable to store message");
 });
});
