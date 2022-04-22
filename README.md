When use Node.js:\
https://www.peerbits.com/blog/why-nodejs-fast-and-its-best-use-cases.html\
https://levelup.gitconnected.com/when-should-you-use-node-js-727c7d97fd09

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

Standard for JSON API response format (I chose https://google.github.io/styleguide/jsoncstyleguide.xml):
https://stackoverflow.com/a/14538774\
https://stackoverflow.com/a/23708903

https://www.moesif.com/blog/technical/api-design/Which-HTTP-Status-Code-To-Use-For-Every-CRUD-App/
