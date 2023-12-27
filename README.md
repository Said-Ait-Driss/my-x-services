# My X services

is a where I am trying to adheres to microservices design patters, specially asynchronous and single database per services patterns.
<br/>
<p>
my X application, the microservices engage in asynchronous communication to interact with each other. This means they exchange messages or events without waiting for an immediate reply, enhancing the system's flexibility and responsiveness. Additionally, the application adheres to the database per service design pattern, where each microservice operates with its own dedicated database. This approach ensures that each service is self-sufficient in managing its data, contributing to a more modular and maintainable system.
</p>

<h3>api gateway </h3>
<h4>kong</h4>
<p> As an intermediary between clients and the application's services </p>

### kong api gateway running on http://localhost:9090
### kong admin pannel running on http://localhost:8002
### kong admin listen on http://localhost:8001

<h4>Key functions of kong</h4>
<ul>
    <li>Request Routing</li>
    <li>Protocol Translation</li>
    <li>Authentication and Authorization</li>
    <li>Load Balancing</li>
    <li>Caching</li>
    <li>Logging and Auditing</li>
</ul>
## forwarding traffic to :
<ul>
    <li>for auth service : <b>from http://localhost:9090/auth to http://localhost:3000 </b></li>
    <li>for user service : <b> from http://localhost:9090/user to http://localhost:30030 </b></li>
</ul>



## each service run independently but all are packaged as monorepo apps
### auth service
### user service
### other services are on the way ...

## supported databases
<ul>
    <li>mysql </li>
    <li>mongodb </li>
    <li>redis </li>
</ul>


## example of running auth service
```
npm run start:dev auth
```

this will ensure running the auth service on development mode