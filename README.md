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
    <li>Rate limiting</li>
</ul>
## forwarding traffic to :
<ul>
    <li>for auth service : <b>from http://localhost:9090/auth to http://localhost:3000 </b></li>
    <li>for user service : <b> from http://localhost:9090/user to http://localhost:30030 </b></li>
</ul>

<h3>Message broker </h3>
<h4>RabbitMQ</h4>
<p> As Event bus used to facilitates  the exchange of events among services </p>
<p>
RabbitMQ, as a message broker, provides a way for different parts of a system to communicate with each other through the exchange of messages. In the context of an event-driven architecture, RabbitMQ allows components or services to publish events and subscribe to events they are interested in.
</p>

## each service run independently in monorepo structure
### auth service
### user service
### store service
### store-categories service
### picks service
### ordder service
### headquarter service
### order-delivery service
### contact-infos service

## supported databases
<ul>
    <li>mysql </li>
    <li>mongodb </li>
    <li>redis </li>
</ul>


## example of running user service
```
npm run start:dev user
```

this will ensure running the auth service on development mode
