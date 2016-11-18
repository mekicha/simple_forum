About the project
-----------------
This is an implementation of a simple web forum written
in Node.js. The project uses the Express framework for
routing and other request functionality, and Mongodb
for data persistence.
The app provides REST APIs for creating new messages,
editing and deleting a message by an id, and also
returning all the messages in the database as a list
of <id, header> pair.

How to run
----------
1. You will need:
Node - (https://nodejs.org/en/)

npm - Comes installed with Node. Use 'npm install   
      npm@latest -g' to upgrade to the latest version.

Mongodb - (https://www.mongodb.com/        
           download-center?jmp=nav#community)

2. Clone the project using the command
   git clone https://github.com/mekicha/simple_forum.git

3. Cd to the directory simple_forum

4. Use npm to install other dependencies
   npm install -d

5.Run the application using Node:
   node app.js

6. Visit localhost:3000 in a browser. To see raw json response, append /api/messages to the address.

To run test
-----------
The test script is in test/test-server.js.
You will need to install mocha and chai to run the test.
If you followed step 4 above, you should have that already.
npm install -g mocha to install mocha system wide.
Type mocha and watch the tests pass elegantly.
Mocha automatically tries the find the test scripts, so you need not 
type mocha server-test.js for example.


