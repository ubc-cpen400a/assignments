# Boilerplate for server application

This is a minimal [Express.js](http://expressjs.com/) application for starting your full-stack web application.


## Setting up

0. Make sure you have [Node.js](http://nodejs.org/) installed.

1. Copy this entire directory (`server-boilerplate`) into your project directory. The following files are needed:

	```
	/public/
	    /index.html
	/package.json
	/index.js
	```

    * `/public/` directory is the root of your client-side application (i.e. where the main `index.html` is served from)
    * `package.json` contains metadata about your project. `npm` needs this file to correctly handle all `npm` commands.
    * `index.js` is the main server application file.

2. Navigate to the project directory. You should be inside the directory where `package.json` is located.

	```
	~$ cd myProject
	~/myProject$ ls
	index.js  package.json  public
	```

3. Run `npm install` to install the dependencies listed in `package.json`

	```
	~/myProject$ npm install
	```

4. If the installation was successful, you should now have a `node_modules` directory in your project.

	```
	~/myProject$ ls
	index.js  node_modules  package.json  public
	```

5. Run `node index.js` to check that your server is running correctly.

	```
	~/myProject$ node index.js
	Express.js server started, listening on PORT 3000
	```

Your app should now be running on [localhost:3000](http://localhost:3000/).


## Building your application

If everything is working okay, you now have a minimal full-stack application. To continue building on this app, you should update the main `index.js` file and the client-side application inside `/public/` directory.