GraphQL ToDo app (with Mysql backend database)
----------------

This project implements a full stack graphQl version of a ToDo app. The project has an api and a client layer. The backend is using react.js, sequelize.js, express and appollo server. We have a Mysql database server which will serve the graphQl layer.

Be warned this is full stack project and you will need to be comfortable with the above mentioned technologies to install and run this.

Folder structure of this project
--------------------------------

- toDoAppGraphQl
	- api
		- index.js   (This starts the express server, I have also combined the models and resolvers here too, in real app this will be seperated out)
		- sequelize.js  (This file contains the database settings for mysql plus some sql commands to setup tables with inital data)
		- example-queries.js (This file is for reference only. It has some sample graphql queries that you can use to test)
		- package.json
	
	- client
			- package.json
			- src (Source folder)
				- index.js (The entire client app is in this file)
				- style.css


To install api app
------------------

You need  a working mysql db server with the following setup (data base settings are found in sequelize.js):
db name : to_do
username: testuser
password : test

Once you have a myslq database setup and running with the above details you can run following from the api directory :

npm install

npm start

If the install was successful then you should get the following  screen in the terminal window. You will notice that it is running some mysql commands to create tables and entries. If you get red messages then you probably have some database setup issue. 

![alt text](http://ui-design-coder.com/wp-content/uploads/2019/05/apistart.jpg)


The api app will run on port 3000. Once the server is running you can open the link  http://localhost:3000/graphql in you browser and test the graphql queries as shown below :

![alt text](http://ui-design-coder.com/wp-content/uploads/2019/05/query1.jpg)


you can test some queries from the example-queries.js by copy and paste them into the query runner in the browser.


To install the client
---------------------

change directory to client directory and run following :

npm install

npm start

The app will run on port 3001. You can open the app in the browser using link http://localhost:3001/  (Note: the api needs to be running to use the app).


![alt text](http://ui-design-coder.com/wp-content/uploads/2019/05/client.jpg)




