# Photobook

Sails.js based application where you can add, delete and view your contacts, it uses AWS S3 to upload contact images and Mysql to save the data.

### Structure

```
photobook
│   README.md
│   ...development files...    
│   Dockerfile
|   docker-compose.yml
|   package.json /*development package file*/
└───  src /*sails root application */
│   │   ... sails.js files and folders ..
└───tools
    │   start.sh
```

To find more about Sails.js app structure please visit: [Sails.js]

[sails.js]: <http://sailsjs.com/>

### For development

To start the application in developer mode this are the steps:

  - Add your local configuration to the main configuration folder, you should add the following:
      ```
      aws: {
        key: <aws key>,
        secret: <aws secret>,
        s3Region: <s3 region>,
        bucketName: <bucket name>,
      },
      ```
  - Run `docker-compose up`  or `docker-compose run --service-ports web bash` in the root folder.
  - In case of using `docker-compose run` you must call `npm start` manually and dependencies will be installed and the application will start on port `3000`
  - To run tests use `npm test` inside the root folder.

### For production

For production create a `.env` file in the `src` with the configuration described in the `.env.template` file, install dependencies using `yarn` or `npm` and the you can just simply run the application using `node app.js`.

NOTE: by default Sails.js has a safety migrate for production environment, this means that you'll have to create the tables before, to do this automatically change the `models.connection` field to `remoteMysql` and run the application in dev mode once.
***
### Contact

For any questions or concers about this application please contact me at: oscar-rreyes1@hotmail.com

# Happy Coding!