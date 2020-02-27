## TheWindLogger Client.

## Client side

Client side project implemented using:

- angular
- mongoDB

___


**Database**: Mongo.

**Authorizing**: token authorization with (Username/Password).


___

#Install process:

-1 Clone repository:

    git clone https://github.com/ugeHidalgo/thewindloggerclient.git TheWindLoggerClient
    (This will clone the repository to a TheWindLoggerClient folder)

-2 Install:

    - Install dependecies needed:
    ```
        cd TheWindLoggerClient
        cd server
        npm install
    ```

-3 Run:
    
    Launch client side with:
    ```
        - npm start
    ```
    Access site to http://localhost:4200

-4 Debug server side with the debugger in visual studio code

-5 Remote Data base can also be used hosted in mLab (Need to change local db config to remote. See dbConfig.js to change it)

-6 Hosted on Firebase (https://thewindlogger.web.app/) To deploy, first run ng build and then firebase deploy

