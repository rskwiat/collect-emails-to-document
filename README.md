# Collect Emails to Document

Bun + Hono version 


NodeJS version of a simple script that writes a user email to a text document found on your local server.

## Available Scripts

In the project directory, you can run:

### `bun dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `bun lint`

Runs the linting on the files based on the `biome.json` config.


### `bun format`

Formats the files based on the `biome.json` config.

## Endpoints

|              |                  |                                 |
| ------------ | ---------------- | ------------------------------- |
| Request Type | Path             | Description                     |
| GET          | /healthcheck  | Check if the app is running          |
| GET          | /users       | Lists all the users saved to the mongodb database       |
| GET          | /user/{id}      | Get a single user based on their ID          |
| POST         | /user      | Save's the user and optin information to the db            |
| DELETE          | /user/{id} | Deletes a user based on their ID        |
