# Chart-Analytics

This application converts excel data to chart for analysis.Users can register an account,upload the excel data and analyse each column in form of charts.


# Tech-Stack
* NodeJS
* MongoDB
* React
* Redux
* Recharts
* HTML,CSS
* Material UI

# Project Setup

## Install Dependencies
* In command prompt run command npm i --save in the parent directory to install all server dependencies.
* In command prompt navigate to client folder run the above command to install all client dependencies.

## MLab Setup
* Create an [Mlab](https://mlab.com/) sandbox database.
* Create a user for that database
* Copy the deployment link on the database homepage,editing the username and password.
* Create a new file named dev.js inside the keys folder
* Paste the below code

```
var dev={
    MongoURI:<copied url from mlab>,
    session:<any session key string value>
}
module.exports=dev

```

# Run
* run command npm run dev to run the application on localhost:3000

