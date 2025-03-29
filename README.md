# Collect Emails to Document

Simple Bun + Hono application that writes a users information to a mongodb collection for data collection. We are collecting the users `name`, `email address` and `optIn` information which is currently set to false on default. This application can be scaled up for marketing information or an email collection service.

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
| POST          | /search      | Gets a single user based on their email address          |
| POST         | /user      | Save's the user and optin information to the db            |
| DELETE          | /user | Deletes a user based on their email        |
