When use Node.js:\
https://www.peerbits.com/blog/why-nodejs-fast-and-its-best-use-cases.html\
https://levelup.gitconnected.com/when-should-you-use-node-js-727c7d97fd09

Difference between validating and sanitizing inputs https://stackoverflow.com/a/48583489

https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/#back-to-the-anatomy-of-a-request\
PUT - Set all new attributes for an existing resource.\
PATCH - Partially update an existing resource (not all attributes required).
```
PUT /users/1
{
  "username": "skwee357",
  "email": "skwee357@gmail.com"  // new email address
}
PATCH /users/1
{
  "email": "skwee357@gmail.com"  // new email address
}
```
HTTP status ranges in a nutshell:
1xx: hold on
2xx: here you go
3xx: go away
4xx: you messed up
5xx: I messed up

Standard for JSON API response format (I chose https://google.github.io/styleguide/jsoncstyleguide.xml):
https://stackoverflow.com/a/14538774\
https://stackoverflow.com/a/23708903

https://www.moesif.com/blog/technical/api-design/Which-HTTP-Status-Code-To-Use-For-Every-CRUD-App/

Never trust user input. Assume that every route will be broken in some way.

Take a Layered Approach:
Controller layer 🎮\
This is the module of your code where the API routes are defined. Here you define only, and only your API routes. In the route handler functions, you can deconstruct the request object, pick the important data pieces and pass them to the service layer for processing.

Service layer 👩🏽‍🏭 🏭\
This is where your business logic lives, even the secret sauce of your application. It contains a bunch of classes and methods that take up singular responsibility and are reusable (and also follow other S.O.L.I.D programming principles). This layer allows you to effectively decouple the processing logic from where the routes are defined.
One more aspect to consider here is the database part. To independently deal with this, we need one more layer.

Data Access Layer 🌐\
The Data Access layer can take up the responsibility of talking to the database - fetching from, writing to, and updating it. All your SQL queries, database connections, models, ORM (object-relational mappers), etc. are supposed to be defined here.

Should the endpoint name be singular or plural? The keep-it-simple rule applies here. Although your inner-grammatician will tell you it's wrong to describe a single instance of a resource using a plural, the pragmatic answer is to keep the URL format consistent and always use a plural. Not having to deal with odd pluralization (person/people, goose/geese) makes the life of the API consumer better and is easier for the API provider to implement (as most modern frameworks will natively handle /tickets and /tickets/12 under a common controller).

Error handling practices:
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/documentingusingswagger.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/shuttingtheprocess.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/apmproducts.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/returningpromises.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/monitoring.md

Don't block the event loop:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/performance/block-loop.md

Delegate anything possible (e.g. static content, gzip) to a reverse proxy:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/delegatetoproxy.md

Guard and restart your process upon failure (PM2):\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/guardprocess.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/utilizecpu.md

Create a maintenance endpoint:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/createmaintenanceendpoint.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/measurememory.md

Make your code production-ready:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/productioncode.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/frontendout.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/bestateless.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/assigntransactionid.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/setnodeenv.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/logrouting.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/installpackageswithnpmci.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/hideerrors.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/avoid_publishing_secrets.md

Security:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/detectvulnerabilities.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/limitrequests.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/ormodmusage.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/commonsecuritybestpractices.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/secureheaders.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/userpasswords.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/expirejwt.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/login-rate-limit.md (NGINX)
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/requestpayloadsizelimit.md (NGINX)
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/regex.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/sandbox.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/sessions.md

Docker:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/non-root-user.md
