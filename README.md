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

5. The app contains a list of three branches, that we can walkthrough to set up a workflow to develop our application into a docker container instead of developing it into our local machine.
- <a name="branches">Branches</a>
   1. [**docker-basics**](#docker_basics)
   2. [**docker-compose**](#docker_compose) 
   3. [**docker-multiple**](#docker_multiple)

## <a name="docker_basics">docker-basics</a>
1. `git checkout docker-basics`
1. The app in this branch contains a simple route on `http://localhost:3000/` that return `hello world`.
1. Create a simple docker file, check `Dockerfile` in the root directory.
   - the file has a set of instructions that docker needs to create our very customized image.
   - The file `Dockerfile` is created with a capital `D`
1. To Create Docker Image from a Dockerfile or build the docker image: `docker build .` 
1. see list of image : `docker image ls`
    - you will see 2 images, the `node` image that is pulled from `docker.hub` and the one you just created.

1. to delete the docker image: `docker image rm [IMAGE ID]`
1. to give the docker image a custom name : `docker build -t nest-app-image .`
   - `-t` [NAME] : we set name using the optional flag `-t`
1. to create container from the image: 
`docker run -p 4000:3000 -d --name nest-app-container nest-app-image`
   - `--name` [CONTAINER NAME] : to set name for the container
   - `--d`  : to run in detached mode, so the command line can be still free and open
   - `-p 4000:3000`: 
     - `4000`: the port on the outside machine 
     - `3000`: the port on our container that we will send traffic to it (must be the same port our application runs on, see `main.ts`)
     - it means forward 4000 to 3000, for simplicity we can make both the same port: `-p 3000:3000`

1. to see list of running containers : `docker ps`
1. test it in browser or postman: `http://localhost:4000/`
1. to delete the active/running container:
`docker rm [container Name or ID] -f`
   - `-f`: force mode
1. to logging inside our docker container and see files in it:
`docker exec -it [Container Name or ID] bash`
1. if there are some files you don't want to copy inside the container like  Dockerfile, environmental files, info.txt and node_modules, you can create a file called `.dockerignore`

#

## <a name="docker_compose">docker-compose</a>
1. `git checkout docker-compose`
   - with docker compose, we are going to automate docker bootup steps and deploy multiple containers
1. check file `docker-compose.yaml` in root directory
   - `.:/app:ro`:  the container can read files from the host's current directory, but it cannot modify them, it ensures the host directory are not altered by the container.
   - `/app/node_modules` : prevent the host's node_modules directory from being overwritten by the container's node_modules directory, and vice versa.
1. run the command :  `docker-compose up -d`
   - `-d` : to run in detached mode, so the command line can be still free and open
1. to delete the conatiner, run the command : `docker-compose down -v`
   - `-v` : delete anomnus volumes
1. in case you made a code change and run `docker-compose up -d` again, it create container without building the image as it build it before (cached)
1. to force the build or rebuild the image: `docker-compose up -d --build`
    - `--build`: force rebuild the image, must be used when we make any change in Dockerfile, code inside app or install new packages


[Branches List :point_up:](#branches)

#

## <a name="docker_multiple">docker-multiple</a>
1. `git checkout docker-multiple`
   - we will working with multiple docker containers.
1. check the new service `mongo` in `docker-compose.yaml`
1. We will Set up our nest application to connect to our mongo database.
1. check code in `app.module.ts` that connect to mongo
1. check the new route in `app.controller.ts` that insert a document in mongo.
1. Go inside the mongo container :
   - `docker exec -it [MONGODB CONTAINER ID] mongosh`
     1. you can now check current database, create new database
     2. `db`: show current database, 
     3. `show dbs`: show list of databases, we have created a database called `cat`
     4. `use cat`: to switch to it.
     5. `show collections`: show list of collections inside the db
     6. check the inserted record: `db.cats.find({})`
