# Deploying the full stack application

The aim of this tutorial is to deploy both parts of the application:

* the React front-end application;
* the Node.js, Express and TypeScript back-end API.

In the previous tutorials, we created:

* a back-end API with endpoints for news and users;
* a React front-end that calls those API endpoints.

In development, we run the projects with:

```console
npm run dev
```

For deployment, we usually build the projects first and then run or serve the production files.

---

# Part 1: Deploying the React front end

## 1. Development mode and production build

During development, the React app runs with:

```console
npm run dev
```

This starts the Vite development server.

For deployment, create a production build:

```console
npm run build
```

This creates a folder named:

```text
dist
```

After building, the project looks like this:

```text
front-end/
├── dist/
│   ├── index.html
│   └── assets/
├── src/
├── package.json
└── vite.config.js
```

Only the contents of the `dist` folder need to be served to users.

---

## 2. Check the API URL

Before building the front end, check that it points to the correct back-end API.

If you created this file:

```text
src/config/api.js
```

it may look like this:

```js
export const API_URL = "http://88.200.63.148:5000";
```

Update the address and port to match your deployed back end.

Example:

```js
export const API_URL = "http://88.200.63.148:30001";
```

If the API URL is wrong, the page may open, but news, login and other API requests will not work.

---

## 3. Build the front end

Move into the front-end folder:

```console
cd front-end
```

Install dependencies if needed:

```console
npm install
```

Build the app:

```console
npm run build
```

If the build succeeds, Vite creates:

```text
dist
```

---

## 4. Test the production build

Before deployment, test the built app:

```console
npm run preview
```

If you need a specific host and port:

```console
npm run preview -- --host 0.0.0.0 --port 4173
```

Open the preview address and test:

```text
/news
/news/1
/about
/login
```

---

## 5. Deploy the `dist` folder

After building, copy the contents of `dist` to the web server.

Example:

```console
cp -r dist/* /var/www/my-react-app/
```

The deployment folder should then look like this:

```text
/var/www/my-react-app/
├── index.html
└── assets/
```

Important: usually you copy the contents of `dist`, not the `dist` folder itself.

---

## 6. React Router refresh problem

React Router routes such as:

```text
/news
/news/1
/about
/login
```

are not real folders on the server. They are handled by React.

This means that clicking links may work, but refreshing `/news/1` may show a server 404 error.

If you use Nginx, configure it like this:

```nginx
server {
    listen 80;
    server_name 88.200.63.148;

    root /var/www/my-react-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The important line is:

```nginx
try_files $uri $uri/ /index.html;
```

It tells the server to return `index.html` for React Router routes.

---

# Part 2: Deploying the Node.js back end

The back end was created with Node.js, Express, TypeScript and MySQL.

During development, it usually runs with:

```console
npm run dev
```

In the tutorial, this script used `tsx` to run TypeScript directly during development.

For deployment, we usually compile TypeScript to JavaScript and then run the compiled JavaScript files.

---

## 1. Check the back-end scripts

Open the back-end `package.json`.

It should contain scripts similar to:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

Explanation:

```console
npm run dev
```

runs the server during development.

```console
npm run build
```

compiles TypeScript from `src` into JavaScript in `dist`.

```console
npm start
```

runs the compiled server from `dist/index.js`.

---

## 2. Check the `.env` file

The back end needs environment variables for the port and database connection.

In the back-end folder, create or check:

```text
.env
```

Example:

```text
PORT=5000
DB_HOST=localhost
DB_USER=see-eclassroom
DB_PASS=see-eclassroom
DB_DATABASE=frameworks_tutorial
```

Use your own values.

Important: do not commit `.env` to Git.

Your `.gitignore` should include:

```text
.env
node_modules
dist
```

---

## 3. Build the back end

Move into the back-end folder:

```console
cd back-end
```

Install dependencies if needed:

```console
npm install
```

Build the TypeScript project:

```console
npm run build
```

If the build succeeds, a `dist` folder is created:

```text
back-end/
├── dist/
│   ├── index.js
│   ├── db/
│   └── routes/
├── src/
├── package.json
└── tsconfig.json
```

---

## 4. Start the back-end server

Run:

```console
npm start
```

If the server starts correctly, you should see something like:

```text
Server is running on port: 5000
```

Test the API in the browser or with Postman:

```text
http://88.200.63.148:5000/news
```

or with curl:

```console
curl http://88.200.63.148:5000/news
```

---

## 5. Keeping the back end running

If you start the server with:

```console
npm start
```

it runs only while the terminal session is active.

For deployment, you usually want the server to keep running after you close the terminal.

One common tool for this is `pm2`.

Install pm2 globally:

```console
npm install -g pm2
```

Start the compiled back end:

```console
pm2 start dist/index.js --name frameworks-api
```

Check running processes:

```console
pm2 list
```

View logs:

```console
pm2 logs frameworks-api
```

Restart the server:

```console
pm2 restart frameworks-api
```

Stop the server:

```console
pm2 stop frameworks-api
```

After changing back-end code, rebuild and restart:

```console
npm run build
pm2 restart frameworks-api
```

---

## 6. Port already in use

If you see an error like:

```text
EADDRINUSE: address already in use
```

then another service is already using that port.

Fix it by choosing another port in `.env`:

```text
PORT=30001
```

Then restart the server:

```console
npm run build
npm start
```

or, if using pm2:

```console
npm run build
pm2 restart frameworks-api
```

Also remember to update the React front-end API URL so it points to the new port.

---

## 7. CORS after deployment

If the front end and back end use different ports, the browser may block API requests.

Example:

```text
Front-end: http://88.200.63.148
Back-end:  http://88.200.63.148:5000
```

If you see this error:

```text
Cross-Origin Request Blocked
```

then enable CORS in the back end.

Install CORS in the back-end project:

```console
npm install cors
npm install --save-dev @types/cors
```

Then update the Express server:

```ts
import cors from "cors";

app.use(cors());
```

Usually this should be placed before the routes:

```ts
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/news", newsRouter);
app.use("/users", usersRouter);
```

Note: `@types/cors` is needed only because the back-end project uses TypeScript.

---

# Part 3: Connecting front end and back end

After deploying both parts, check the full flow.

The back end should be available at something like:

```text
http://88.200.63.148:5000
```

The front end should be available at something like:

```text
http://88.200.63.148
```

The front-end API config should point to the back end:

```js
export const API_URL = "http://88.200.63.148:5000";
```

Then rebuild and redeploy the front end:

```console
cd front-end
npm run build
cp -r dist/* /var/www/my-react-app/
```

Test:

```text
/news
/news/1
/login
/register
/create-news
```

---

## Deployment checklist

Before finishing, check:

```text
[ ] The database exists and contains the required tables.
[ ] The back-end .env file contains the correct database credentials.
[ ] The back end builds successfully with npm run build.
[ ] The back end starts successfully with npm start or pm2.
[ ] The API works in the browser, Postman or curl.
[ ] CORS is enabled if the front end uses a different origin.
[ ] The front-end API URL points to the deployed back end.
[ ] The front end builds successfully with npm run build.
[ ] npm run preview works for the front end.
[ ] The contents of front-end/dist are copied to the web server.
[ ] Refreshing /news and /news/1 works.
```

---

# Complete deployment flow

## Back end

```console
cd back-end
npm install
npm run build
npm start
```

Or with pm2:

```console
cd back-end
npm install
npm run build
pm2 start dist/index.js --name frameworks-api
```

## Front end

```console
cd front-end
npm install
npm run build
npm run preview
cp -r dist/* /var/www/my-react-app/
```

---