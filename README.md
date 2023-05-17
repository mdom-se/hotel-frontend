# hotel-frontend

Pre-requisites

- Java 8
- maven
- docker
- node v19.7.0
- npm 9.5.0

Instructions

The react source code of this app is in the folder:  
- hotel-frontend/frontend/  
  
We can develop without using maven with the commands:  
`npm run build` // To compile the react code  
`npm start` // To deploy the app in the http://localhost:3000/


To compile and generate the artifact of this application please execute:  
`mvn clean install`  
This command will compile the react code and copy it to the /target/classes/static folder in order to deploy our app in the Tomcat embed server

This application is dockerized, and we deploy currently with docker-compose, to see more details please check the configuration for the hotel-frontend service in the file https://github.com/mdom-se/hotel-platform/blob/main/docker-compose.yml
