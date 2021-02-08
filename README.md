# How to run the app in development mode

This app uses express server, react front-end and MongoDb Atlas database.

## Step 1:

In project folder run:

### `npm install`

To install all server dependencies for the app.

## Step 2:

Change directory in to client run:

```
cd client
```

### `npm install`

To install front-end dependencies for the app.

## Step 3:

Change directory to project folder:

```
cd ..
```

### `npm run dev`

Runs the express server and react front-end together in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API endpoints

```
GET  /schedule
```

gives saved schedule record if exists.

```
POST /
```

To save the schedule progress on database.
