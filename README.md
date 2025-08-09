# Visitor Management App

## Backend API
The backend API consists of two main services: *Authentication* and *Visit*

To run the application follow the steps below:


### setup .env with the correct details filled in the <blanks>
```
MONGO_URI=mongodb://<user:pass>@mongo:27017/residentdb?authSource=residentdb
MONGO_DATABASE=residentdb
MONGO_HOST=mongo
MONGO_USER=<user>
MONGO_PASSWORD=<pass>
MONGO_INITDB_ROOT_USERNAME=<root>
MONGO_INITDB_ROOT_PASSWORD=<rootpass>
PORT=8080
JWT_SECRET=<base64-24-secret>
```

### to create a base64 with 24 or 32 byte length

`$: openssl rand -base64 24`


### frist run the app

`$: docker-compose up --build --force-recreate`

then run the migration script to add test data:

`$: docker exec visitor-backend node src/seed.js`

### use this command to list containers running

`$: docker ps`

### launch shell inside the container use the following command

`$: docker exec -it <container-id> sh`

### to stop and remove containers

`$: docker-compose down -v`


### good to know
```
docker-compose up --build           // to build and run all services
docker-compose up                   // to run all in shell
docker-compose up -d --build        // to run all in detached mode

// to recreate one service while all services are built and ran in detach mode
docker-compose up -d --force-recreate --no-deps [service name]
```
