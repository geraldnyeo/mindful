# Setting up

Make sure you have npm installed

For help with installing npm please refer to this page: 
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

While in the /server directory, run on the command line 

```
npm install
```

## Setting environment variables

Create a file in /server named .env

In the file, set the following environment variables:

```
PORT=[replace with port you want the server to run on]
MONGODBSTRING=[replace with the connection string for your MongoDB instance]
CLIENTORIGIN=[replace with the domain your client will be running on]
JWTSECRET=[replace with your signing key for jwt tokens]
```

To generate your JWT secret, refer to this page: https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4

## HTTPS setup

Create an SSL certificate and private key

Rename the certificate as certificate.crt and place it in /server

Rename the private key as privatekey.key and place it in /server

For help with generating the SSL certificate and private key for local testing please refer to this post:
https://stackoverflow.com/questions/10175812/how-can-i-generate-a-self-signed-ssl-certificate-using-openssl

# Starting the server

Run 

```
npm run dev
```

in the command line while in the /server directory

# Development

!!! IMPORTANT !!!
Do not run these on your production database

To populate your development database with mock data, run

```
npm run nuke-populate-db
```

!! this will drop the existing database

To populate the database without dropping, run

```
npm run populate-db
```

To drop the database, run

```
npm run nuke-db
```