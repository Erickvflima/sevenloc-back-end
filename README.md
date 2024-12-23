# sevenloc-back-end

This project aims to demonstrate some of the technologies I work with, using Node.js with NestJS and PostgreSQL. The focus of this project is to provide a robust backend API for a supplier portal for workshops.

# Getting Started
* Prerequisites
To start the project, you need to spin up the databases that are already configured in the docker-compose file. You can do this by running the following command:
yarn start:docker

* Building the Project
The project uses TypeORM, and its migration configurations are already set up. To create the necessary database structures, you can use the migration commands specified in the package.json under the scripts section.

To start the project, follow these steps:

1- Build the project: yarn build

2- Run the development server: yarn dev

# Environment Variables
Make sure you have the necessary environment variables configured in a .env file in the root directory of the project. Here are the required variables:

HOST
PORTHTTP

POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_PORT

SYNCHRONIZE

REDIS_HOST
REDIS_PORT
REDIS_PASSWORD 

JWT_SECRET 
EXPIRE_ACCESS
EXPIRE_REFRESH_ACCESS

* request the values ​​by email erickvflima@gmail.com


# API Documentation
Once the project is running, you can access the full API documentation by navigating to: /api-docs
This provides a Swagger-generated interface to explore and test the API.

This README gives an overview of the project, how to set it up, and important information about the environment configuration and API documentation.
