# study-mate

## Clone
* Clone this repository using `https://github.com/divye/study-mate.git`

## Installation & Setup
* Move to the directory and run `npm install` to install all dependencies
* Create DB schema from `study-mate/server/db/dump.sql` directory on your local database
* Add database credentials in file `study-mate/server/lib/util.js`
* Create a .env file in root directory of the project
  * Add two variables in the .env file:
     * REACT_APP_DOMAIN - This will be domain of the application
     * SENDGRID_API_KEY - This will be the API key for mailing library
* Run `npm start` to start the front end of the application
* Run `nodemon server` to start the server of the application 
