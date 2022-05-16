## Before the beginning
The following software must be installed:
[Node.js](https://nodejs.org/en/)
[GIT](https://git-scm.com/)
[yarn](https://yarnpkg.com/)

## Cloning

 - Clone the project using command `git clone 
   https://github.com/ForomePlatform/Anfisa-React-Client.git` (via HTTPS) or `git clone
   git@github.com:ForomePlatform/Anfisa-React-Client.git` (via SSH) in terminal.
   
 - The default branch should be `develop`. If not, switch to `develop`  
   branch using command `git checkout develop`

## Installing dependencies
Run command `yarn install` in terminal.

## Configuration variables (optional)

For fast automatic authorization you can do the following:
In the project root create a file named `.env.development.local`
This file should contain following content:

    REACT_APP_URL_BACKEND=https://demo.forome.org/app
    REACT_APP_PROXY_AUTH=login:password

Where `login` and `password` correspond your login and password.

## Running the project
Run command `yarn run start` in terminal. Project should start on `localhost:3000`.