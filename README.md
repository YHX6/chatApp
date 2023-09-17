# chatApp

## Intro

A real-time chat application built with Node.js, React.js, Socket.io. 

It allows users to register, login and choose avatar.

This application also enables users to chat with openAI robot by applying openAI API Key.



### Environment Variables

Some information are stored as environment variables in `frontend/.env`. This files is not included in this repository. You NEED to add your own following information in order to run this application. 

`frontend/.env`

```.env
REACT_APP_HOST = ""   #"http://localhost:3001" if running on you own computer
REACT_APP_OPENAI_API = ""  # the key is purchase on openai website
PORT=3002  # optional
```



Remember to change the listen port for backend 

`backend/utils/config.js`

```js
const LISTEN_PORT="http://localhost:3002"  // change the ip to your host
```






## Backend

on windows

```terminal
$ cd backend
$ npm start
```



## Frontend

on windows

```terminal
$ cd frontend
$ yarn start
```





## Others

**Some problems on deployment**

**1.re-pull if can not git pull directly**

```shell
git reset --hard origin/aws-new-version
```



**2.frontend: create your own environment variables** 

```shell
cd frontend
sudo vim .env
```

```.env
REACT_APP_HOST = ""   #"http://localhost:3001" if running on you own computer
REACT_APP_OPENAI_API = ""  # the key is purchase on openai website
PORT=3002  # optional
```



**3.backend: npm install version problem**

```shell
cd backend
rm -rf node_modules
rm package-lock.json
npm install
npm start
```



