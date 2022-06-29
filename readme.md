# FYP BACKEND

## How to set up the project?

-   download mongodb and compass
-   start the mongodb service locally
-   paste the connection string in compass and connect 
        mongodb://localhost:27017/fyp-portal
-   git clone git@github.com:loralridz/FYP-BE.git
-   npm i
-   create .env file in project folder
-   paste the following in .env file
        PORT=8000
        DATABASE_URI=mongodb://localhost:27017/fyp-portal
        JWT_SECRET = "f1b9547a67f32e3a0116bb42c300040d"

-   start the server by running
    -   npm run dev


## Some Conventions to follow
-   Always checkout/create a new branch from dev
-   pull dev branch before pushing code
-   remove unused code
-   test the code before push
-   create a pull request(pr) with dev branch and add reviewers to check the code or to merge
