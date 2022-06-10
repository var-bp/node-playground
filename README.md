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
https://metamug.com/article/status-codes-for-rest-api.html

https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/
https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

Never trust user input. Assume that every route will be broken in some way.

Most common log levels (INFO, WARN, ERROR, FATAL - production; DEBUG, TRACE - development):
- FATAL: Used to represent a catastrophic situation — your application cannot recover. Logging at this level usually signifies the end of the program.
- ERROR: Represents an error condition in the system that happens to halt a specific operation, but not the overall system. You can log at this level when a third-party API is returning errors.
- WARN: Indicates runtime conditions that are undesirable or unusual, but not necessarily errors. An example could be using a backup data source when the primary source is unavailable.
- INFO: Info messages are purely informative. Events that are user-driven or application-specific may be logged at this level. A common use of this level is to log interesting runtime events, such as the startup or shutdown of a service.
- DEBUG: Used to represent diagnostic information that may be needed for troubleshooting.
- TRACE: Captures every possible detail about an application's behavior during development.

Should the endpoint name be singular or plural? The keep-it-simple rule applies here. Although your inner-grammatician will tell you it's wrong to describe a single instance of a resource using a plural, the pragmatic answer is to keep the URL format consistent and always use a plural. Not having to deal with odd pluralization (person/people, goose/geese) makes the life of the API consumer better and is easier for the API provider to implement (as most modern frameworks will natively handle /tickets and /tickets/12 under a common controller).

Make your code production-ready:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/documentingusingswagger.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/monitoring.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/performance/block-loop.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/guardprocess.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/utilizecpu.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/measurememory.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/productioncode.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/frontendout.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/bestateless.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/assigntransactionid.md
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/logrouting.md

Delegate anything possible (e.g. static content, gzip) to a reverse proxy:\
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/delegatetoproxy.md

Security:\
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
