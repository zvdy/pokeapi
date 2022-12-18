# Objetive
API to manage our pokemon team using Express & MongoDB database to store our data.

### **MEN Stack**

- **M**ongoDB
- **E**xpress
- **N**odeJS

# Actions to do
- Identify ourselves
- Add Pokemon to our team
- Remove Pokemon from our team
- Switch Pokemon order on our team
- See our team

# REST API Design
- Credentials System
- Add Pokemon to out team (POST /team/pokemon)
- Remove Pokemon from our team (DELETE /team/pokemon/:id)
- Switch Pokemon order on our team (PUT /team)
- See our team (GET /team)
---
- **Express** to create the server _npm install express_

- **Mocha and Chai** for testing _npm install -D mocha chai_ then modify package.json to add the following scripts:
```json
"scripts": {
    "test": "./node_modules/.bin/mocha"
  }
``` 
- **bcrypt** to encrypt the password _npm install bcrypt_

- **uuid** to generate unique ids _npm install uuid_

- **Passport** for authentication in JWT _npm install passport passport-local passport-http-bearer_ use [jwt debugger](jwt.io/#debugger-io) to debug the token and see the payload

- **Mongoose** for MongoDB _npm install mongoose_ and _npm install -D @types/mongoose_ to use typescript

- **Body-parser** to parse the body of the request _npm install body-parser_

---

Use [Postman](https://www.getpostman.com/) to test the API

To run the tests use:
```
npm run test
```



