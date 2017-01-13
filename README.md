# WHOTALK.US
[WhoTalk.us](https://whotalk.us/) is a Chat based SNS system that simply allows N to 1 chatting. In this project, React.js is used on the front-end side and Node.js is used on backend-side. MongoDB is used for the database. This project is currently in beta, there are still some functions to be implemented.

If you have found any bugs, or want to enhance the system, please feel free to post new issues in Github repository. 

## Core Technology 

Following technologies are used in this project (some are omitted)
- React.js
- Redux
- React-router
- Node.js
- Express
- MongoDB
- Mongoose
- Sockjs
- Sass
- Webpack
- Babel
- Passport
- Semantic-UI
- React-intl
- axios
- lru-cache
- alertify
- react-scroll
- redux-thunk
- masonry
- create-react-app



## Getting started

These instructions will get you a copy of the project up and runing on your local machine for development and testing purposes.

### Prerequisites

- Node.js 6^
- npm 3^
- MongoDB 3^

### Installing

1. Install global dependencies

    ```
    npm install -g babel-cli
    ```
    - babel-cli lets you transpile the ES6 codes for the backend server.

2. Clone the project from the github repository

    ```
    git clone git@github.com:velopert/whotalk.us.git
    cd whotalk.us
    ```
3. Install local dependencies

    Project for the client and the server separated in two different directories. 
    ```
    cd whotalk-backend
    npm install
    cd ../whotalk-frontend
    npm install
    ```
4. Rename `.envcpy` file to `.env`

    This file is resides in **whotalk-backend** directory. Rename this file and input the values for the envioronment variables.
    ```
    PORT=4000
    DEVPORT=3000
    DB_URI="mongodb://DB_URI"
    SECRET_KEY="SECRET_KEY"
    FACEBOOK_SECRET="FACEBOOK_SECRET"
    GOOGLE_SECRET="GOOGLE_SECRET"
    ```

### Development

For the development environment, you have to run two kind of scripts.

1. `npm run dev` from **whotalk-backend**
2. `npm start` from **whotalk-frontend**

The second script will open the webpack-dev-server which refreshes everytime when the codes of the client have changed. The default port of this server is 3000. When API is requested from the webpack-dev-server, the request will be sent to the backend server through the proxy.

### Build and run

To build, run following script from both of the **whotalk-frontend** and **whotalk-backend**

```
npm run build
```

Then, run following command from the **whotalk-backend**
```
npm start
```

The built files of **whotalk-frontend** will be served as static files from the backend server.

## Questions?

If you have any questions, leave an email to public.velopert@gmail.com, OR, talk to me directly at https://whotalk.us/velopert
