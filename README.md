<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">payever users api</h3>

<div align="center">

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)

## 🧐 About <a name = "about"></a>

Technical Assessment - Backend Engineering position

Avatar files will be inside the /avatars directory.

## Prerequisites

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/), [Docker](https://docs.docker.com/get-docker/) and [Docker-Compose](https://docs.docker.com/compose/install/).

## Installing

Start the application

```
make start-app
```

> The `start-app` command runs the `users-api-josiney` service of [docker-compose](./docker-compose.yml), which downloads the _mongodb_ and _rabbitmq_ images, builds the project's dockerfile and starts the application on port defined in env file.
>
> If you want to remove the application run `make destroy`
