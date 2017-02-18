# Node Express Angular 2 MySQL Scaffold
A simple scaffold for a node.js / Express / Angular / MySQL web application.

Once you have cloned the repository run npm install to install the dependencies and then tsc to compile the modules (if you are not using an auto-compiler). 

You will need to configure the login parameters in server/server.ts for your database, as well as tailoring the parameters in app.component.ts, form-component.ts and server.ts for the specific fields used in your datatable. 

Please note - this is not intended to be any form of "production-ready" solution, as for simplicity a number of essential security features have not been implemented (no implementation of SSL or secure storage of login details, for instance). The aim is to demonstrate how you can link a node.js/Express back end with a MySQL database and Angular 2 front-end.
