# My X services
is a where I am trying to adheres to microservices design patters, specially asynchronous and single database per services patterns.
<br/>
my X application, the microservices engage in asynchronous communication to interact with each other. This means they exchange messages or events without waiting for an immediate reply, enhancing the system's flexibility and responsiveness. Additionally, the application adheres to the database per service design pattern, where each microservice operates with its own dedicated database. This approach ensures that each service is self-sufficient in managing its data, contributing to a more modular and maintainable system.

## supported databases
### mysql 
### redis
### mongodb


## each service run independently but all are packaged as monorepo apps
### auth service
### user service
### other services are on the way ...


## example of running auth service
```
npm run start:dev auth
```

this will ensure running the auth service on development mode