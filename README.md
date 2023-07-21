# ZscoreBackend

## Run project locally

1. If nvm is not installed then install it using the commands listed on the NVM Readme on GitHub `https://github.com/nvm-sh/nvm#installing-and-updating`, otherwise skip to step 2.

2. Install npm using the command `nvm install v18.14.0`

3. Clone the backend repository using the command `git clone git@github.com:sagaci/universe-backend.git`.

4. cd into the project folder and run `npm install` to install dependencies.

5. Create a file named `.env` in the root directory.

6. Add the environment variables inside the `.env` file. The file `.env.example` contains the variables that are required.

7. Run `npm start` for a dev server.

## Build and deploy

1. SSH into your server

2. Follow steps that are mentioned for local setup from step 1-6

3. Install pm2 by running the following the command
    1. `sudo npm install pm2 -g`

4. Get the latest pull from the master branch by running the command `git pull origin master`.

5. Run the following command
    1. `pm2 start ecosystem.config.js`
