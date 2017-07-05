# MNGAPI project

This project's mission is take a tour to build REStful API based-on **Node.Js** and **express** framework with **MongoDb** for the database.

Configuration
------
1. Install **Node.Js** in your system. Select the version __v6.xx__ ( [Download here !!!](https://nodejs.org/en/) )
2. Open `__dirname\server\config.js`
3. Set values for some variables such as:
- The **server** variable is `local` if you run this API in your PC.
- The **port** variable is the MongoDb port (default is `27017`).
- The **username** variable is the username of your MongoDb Database.
- The **password** variable is the password of your MongoDb Database.
- The **dbName** variable is the name of your MongoDb Database.

Usage
------
1. Open `MNGAPI` folder with [Visual Code](https://code.visualstudio.com/) or Command Prompt
2. To run this project, first make sure you installed npm dependencies
```sh
npm install
```
3. After installed npm dependencies, run the command below
```sh
node app.js
```
