# nestjs-docker
Best practice to work with docker in a nestjs app

#
## How to Run: 
1. make sure to install nodejs on your machine: 
https://nodejs.org/en/
2. open the app in **VS Code** and run in terminal : 
   1. to install dependancies, run in terminal `npm install`
   2. to run the prject, run in terminal `npm run start:dev`
3. make sure docker is installed as well: 
https://www.docker.com/products/docker-desktop/
4. Node Docker Image:
https://hub.docker.com/_/node
or
run `docker pull node` after docker is installed

5. The app contains a list of three branches, that we can walkthrough to set up a workflow to develop our application into a docker container instead of developing it into our local machine:

   1. **docker-basics**
   2. **docker-compose** 
   3. **docker-multiple**

## docker-basics
- `git checkout docker-basics`
- The app in this branch contains a simple route on `http://localhost:3000/` that return `hello world`.
- Create a simple docker file, check `Dockerfile` in the root directory.
  - the file has a set of instructions that docker needs to create our very customized image.
  - The file `Dockerfile` is created with a capital `D`
- To Create Docker Image from a Dockerfile or build the docker image: `docker build .` 
- see list of image : `docker image ls`
  - you will see 2 images, the `node` image that is pulled from `docker.hub` and the one you just created.

- to delete the docker image: `docker image rm [IMAGE ID]`
- to give the docker image a custom name :
`docker build -t nest-app-image .`
  - `-t` [NAME] : we set name using the optional flag `-t`
- to create container from the image: 
`docker run -p 4000:3000 -d --name nest-app-container nest-app-image`
  - `--name` [CONTAINER NAME] : to set name for the container
  - `--d`  : to run in detached mode, so the command line can be still free and open
  - `-p 4000:3000`: 
    - `4000`: the port on the outside machine 
    - `3000`: the port on our container that we will send traffic to it (must be the same port our application runs on, see `main.ts`)
    - it means forward 4000 to 3000, for simplicity we can make both the same port: `-p 3000:3000`

- to see list of running containers : `docker ps`
- test it in browser or postman: `http://localhost:3000/`
- to delete the active/running container:
`docker rm [container Name or ID] -f`
- to logging inside our docker container and see files in it:
`docker exec -it [Container Name or ID] bash`
- if there are some files you don't want to copy inside the container like  Dockerfile, environmental files, info.txt and node_modules, you can create a file called `.dockerignore`

#

## docker-compose
- `git checkout docker-compose`
- with docker compose, we are going to automate docker bootup steps and deploy multiple containers
- check file `docker-compose.yaml` in root directory
- run the command :  `docker-compose up -d`
  - `-d` : to run in detached mode, so the command line can be still free and open
- to delete the conatiner, run the command : `docker-compose down -v`
  - `-v` : delete anomnus volumes
- in case you made a code change and run `docker-compose up -d` again, it create container without building the image as it build it before (cached)
- to force the build or rebuild the image: `docker-compose up -d --build`
  - `--build`: force rebuild the image, must be used when we make any change in Dockerfile, code inside app or install new packages

#

## docker-multiple
- `git checkout docker-multiple`
-  we will working with multiple docker containers.
- check the new service `mongo` in `docker-compose.yaml`
- We will Set up our nest application to connect to our mongo database.
  - check code in `app.module.ts` that connect to mongo
  - check the new route in `app.controller.ts` that insert a document in mongo.
- Go inside the mongo container :
  -  `docker exec -it mongo -u [USERNAME] -p [PASSWORD]
  - you can now check current database, create new database
  - `db`: show current database, by default mongo create database called `test`
  - check the inserted record: `db.post.find({})`

