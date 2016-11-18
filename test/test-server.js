process.env.NODE_ENV = 'test';

var chai = require('../server/node_modules/chai');
var chaiHttp = require('../server/node_modules/chai-http');
var server = require('../server/app');
var should = chai.should();
var monk = require('../server/node_modules/monk');

chai.use(chaiHttp);

var db = monk('localhost:37017/testdb');
var collection = db.get('messages');

describe('messages', function(){
	var collection = db.get('messages');
	collection.drop();
    beforeEach(function(done){

    	var msg = {
    		"header" : "testing testing",
    		"message" : "All we do is test, and more test"
    	};
    	collection.insert(msg, function(err,msg){
    		if (err) throw err;
    		done();
  
    	});
    	done();
    });
    afterEach(function(done){
    	var collection = db.get('messages');
    	collection.drop();
    	done();
    });

    it('should list ALL messages on /api/messages GET', function(done){
		chai.request(server)
		.get('/api/messages')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			done();
		});
	});

	it('should list a single message on /api/messages/<id> GET', function(done){
		var mesg = {
			"header": "A single message",
			"message": "All we want to get is the id, nothing more"
		};
		var collection = db.get('messages');
		collection.insert(mesg, function(err, res){
			chai.request(server)
			.get('/api/messages/'+res_.id)
			.end(function(error,response){
				if (error) throw error;
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.have.property('message');
                done();
			});
		});
		done();
	});

	it('should add a single message on /messages POST', function(done){
		chai.request(server)
		.post('/api/messages')
		.send({"header" : "Mocha and chai", "message" : "Hello from Mocha and Chai testing suites"})
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('header');
			res.body.should.have.property('message');
			res.body.header.should.equal('Mocha and chai');
			done();
		});
	});

	it('should update a single message on /messages/<id> PUT', function(done){
		chai.request(server)
		.get('/api/messages')
		.end(function(err, res){
			chai.request(server)
			.put('/api/messages/'+res.body[0][0])
			.send({"header": "Changed by a put request",
		     "message" :"Because change is constant"})
			.end(function(error, response){
				response.should.have.status(200);
				response.should.be.json;
				done();
			});
		});
	});
	
	it('should delete a single message on /messages/<id> DELETE', function(done){
		chai.request(server)
		.get('/api/messages')
		.end(function(err, res){
			chai.request(server)
			.delete('/api/messages/'+res.body[0][0])
			.end(function(error, response){
				response.should.have.status(200);
				response.should.be.json;
				done();
			});
		});

	});

});
