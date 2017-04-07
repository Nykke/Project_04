# T => L COMM

## Overview
T => L COMM is a communication web application for landlord and tenants, right now it's just sent for Maintenance Requests.

## Technologies Used
 - Mongoose
 - ExpressJS
 - AngularJS
 - NodeJS
 - Trello: https://trello.com/b/nRk8n6S3/project-4-landlord-tenant-comm-app


## Everything about the app
- link to the screenshot of the main page: https://github.com/Nykke/project_04/blob/master/public/images/T%20%3D%3E%20L%20COMM%20welcom%20page.png
- link to the User Stories: https://github.com/Nykke/project_04/blob/master/planning/User%20Stories%20Project%2004.txt
- link to ERDs: https://github.com/Nykke/project_04/blob/master/planning/Project_four_ERDs_MVP.jpg
- link to the Wireframes: https://github.com/Nykke/project_04/blob/master/planning/Project_04_Welcome_view.jpg, https://github.com/Nykke/project_04/blob/master/planning/Project_04_Tenant_view.jpg, https://github.com/Nykke/project_04/blob/master/planning/Project_04_Landlord_view.jpg

-  Deployed app :

## Installation Instructions

to install out app's dependencies, run
`$ npm install`

open another tab and run mongo server
`$ mongod`

to create the database and seed it locally
`$ node db/seeds.js`

to start the server
`$ nodemon`

server is located at the address
`http://localhost:3001/#/`

## Unsolved issues
- currently my chat messages features via websockets is not working; the input given are not being received.

## Next Step
- fix websockets issue
- give users the ability to login
