var express = require('express');
var router = express.Router();

//Set up connection to the database.
//Database name is simple_forum.
var config = require('../_config');
var monk = require('monk');
var db = monk('localhost:27017/simple_forum');

/*** Endpoint that returns the list of all messages
     in the forum as a list of <ID,HEADER> pair.
     Note: We are using middleware to make the endpoint
     available at /api/messages.--> See app.js
***/
router.get('/', function(req, res) {
	var collection = db.get('messages'); //table is messages
	collection.find({}, function(err, messages) {
		if (err) throw err;
		var msgs = [];
		for(var i = 0; i < messages.length; i++){
		    msgs.push([messages[i]._id ,messages[i].header]);
		}
		res.json(msgs);

  });
});

/*** Create a new post.
     @@params: header : the title of the message
              message: the message body.
              id: Message id...automatically assigned
              by the mongo engine.
***/
router.post('/', function(req, res) {
	var collection = db.get('messages');
	collection.insert({
		header: req.body.header,
		message: req.body.message

	}, function(err, message) {
		if (err) throw err;
		res.json(message);

	});
});

/*** Return message body given an id of the message.
     @@params id: id of the message to be returned.
     message: the body of the message that is returned.
***/
router.get('/:id', function(req, res) {
	var collection = db.get('messages');
	collection.findOne({_id: req.params.id}, function(err, message) {
		if (err) throw err;

		res.json(message.message);
	});
});


/***PUT /api/videos/{id}
    Edit message given an id.
    @@params id: id of message to be edited.
    return value: Success message, else error if
    edit could not be performed.
***/
router.put('/:id', function(req, res) {
	var collection = db.get('messages');
	collection.update({
		_id: req.params.id
	},
	{
		header: req.body.header,
		message: req.body.message

	}, function(err, message) {
		if(err) throw err;

		res.json(message);
	});
});

/****Delete a message, given an id
     @@params: id- the id of the message to be deleted.
     return: success if deleted or error if message
     could not be deleted.
****/

router.delete('/:id', function(req, res) {
	var collection = db.get('messages');
	collection.remove({_id: req.params.id}, function(err, video) {
		if (err) throw err;

		res.json('Deleted successfully');
	});
});

module.exports = router;
