# Back-end using MySQL, Node.js, Express 5 and TypeScript

The aim of this tutorial is to create a simple web service that uses a MySQL database to store data.

The web service will have an API which enables us to:

- retrieve a list of existing news items;
- retrieve one news item by id;
- add a new news item;
- register a new user;
- login/authenticate an existing user.

---

## 1. JavaScript and TypeScript

### JavaScript

JavaScript is the language that Node.js executes. A simple JavaScript variable looks like this:

```js
const username = "ana";
```

JavaScript does not require us to declare the type of `username`. The type is checked only while the program is running.

### TypeScript

TypeScript is JavaScript with added type annotations. A similar TypeScript variable looks like this:

```ts
const username: string = "ana";
```

The `: string` part tells TypeScript that `username` should contain text.

TypeScript helps us catch mistakes before running the server. For example:

```ts
function greet(name: string) {
  return `Hello, ${name}`;
}

greet("Ana"); // OK
greet(123);   // TypeScript error
```

TypeScript is especially useful in back-end applications because we can type:

- request parameters;
- request bodies;
- database rows;
- function return values;
- middleware functions;
- environment variables.

Important: TypeScript still becomes JavaScript before or during execution. In this tutorial we use TypeScript during development and compile it to JavaScript for production.

---

## 2. CommonJS and ES Modules

Older Node.js tutorials often use **CommonJS**:

```js
const express = require("express");

module.exports = router;
```

Modern JavaScript and TypeScript projects commonly use **ES Modules**:

```ts
import express from "express";

export default router;
```

In this tutorial we use ES Modules.

To tell Node.js that this project uses ES Modules, we add this to `package.json`:

```json
{
  "type": "module"
}
```

---

## 3. Class-based routing and function-based routing

Some older tutorials organize routes using classes.

### Older class-based style

```ts
import { Request, Response, NextFunction, Router } from "express";

class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      res.json({
        id,
        name: "Example User",
      });
    } catch (error) {
      next(error);
    }
  }
}

const controller = new UserController();
const router = Router();

router.get("/users/:id", controller.getUserById.bind(controller));

export default router;
```

This works, but students also need to understand `this` and `.bind(controller)`.

### New function-based style used in this tutorial

```ts
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    res.json({
      id,
      name: "Example User",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/users/:id", getUserById);

export default router;
```

In function-based routing, each route handler is an ordinary function. This is usually easier to read, test and reuse in small and medium Express projects.

---

## 4. MySQL

At this stage of the lab sessions, I assume that you already have some experience with MySQL and phpMyAdmin. In this section, we will create the database and the required tables for this tutorial.

You can access the database through phpMyAdmin:

```text
http://88.200.63.148/phpmyadmin
```

Login credentials:

```text
USER_NAME: see e-classroom
PASSWORD: see e-classroom
```

This tutorial uses one database and two tables:

- `frameworks_tutorial`
- `news`
- `user_login`

The `news` table stores news items. The `user_login` table stores user login data.

### Creating the database and tables

Open phpMyAdmin, go to the **SQL** tab, paste the following SQL code and click **Go**.

```sql
CREATE DATABASE IF NOT EXISTS frameworks_tutorial
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE frameworks_tutorial;

CREATE TABLE IF NOT EXISTS news (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_news_slug (slug)
);

CREATE TABLE IF NOT EXISTS user_login (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_user_name (user_name),
  UNIQUE KEY unique_user_email (user_email)
);
```

### Adding test data

You can also insert a few test records. This is useful because the first GET requests in the tutorial will already have some data to return.

```sql
INSERT INTO news (title, slug, text)
VALUES
  (
    'First news item',
    'first-news-item',
    'This is the text of the first news item.'
  ),
  (
    'Second news item',
    'second-news-item',
    'This is the text of the second news item.'
  );

INSERT INTO user_login (user_name, user_email, user_password)
VALUES
  (
    'testuser',
    'testuser@example.com',
    'test123'
  );
```

After running the SQL code, your database should contain the following tables:

```text
news
user_login
```

The `news` table should contain these columns:

```text
id
title
slug
text
created_at
updated_at
```

The `user_login` table should contain these columns:

```text
id
user_name
user_email
user_password
created_at
updated_at
```

The `.env` file later in this tutorial must use the same database name:

```text
DB_DATABASE=frameworks_tutorial
```

Important security note: in this tutorial, passwords are stored as plain text only to keep the first example simple. In a real application, passwords must never be stored as plain text. Use password hashing, for example with `bcrypt`.

---

## 5. Node.js

Node.js enables developers to write JavaScript or TypeScript-based server-side applications that run outside the web browser.

Node.js provides:

- access to the file system;
- access to network functionality;
- a package manager ecosystem through npm;
- built-in modules;
- the ability to run server-side applications.

### Installation and runtime environment

There are several ways to create a runtime environment for your Node.js applications. You can do this using one of the following options:

- Local development environment
- SSH remote development
- Simulated server environment using Docker

Detailed instructions are available here:

https://e.famnit.upr.si/course/section.php?id=101908

You can check the version of the Node.js runtime environment installed on your system by running:

```console
node --version
npm --version
```
---

## 6. Express 5

Express is a minimalist web framework for Node.js.

It helps us define:

- routes;
- middleware;
- API endpoints;
- request and response handling;
- error handling.

This tutorial uses **Express 5**.

Important Express 5 notes used in this tutorial:

- use `express.json()` for JSON request bodies;
- use `express.urlencoded()` for form submissions;
- use `res.status(201).json(...)` instead of older response signatures;
- async route handlers are supported, and rejected promises are passed to error handling middleware.

---

# Creating a Node.js + Express 5 + TypeScript server

This tutorial is divided into four steps:

- [The server](#the-server)
- [The routes](#the-routes)
- [The database](#the-database)
- [The CRUD](#the-crud)

Please follow these steps in order.

---

## The server

### 1. Create the back-end folder

Clone the repository provided for the course and create a folder named `back-end` at the root level.

Move into the folder:

```console
cd back-end
```

### 2. Initialize the Node.js project

Run:

```console
npm init -y
```

This creates a `package.json` file.

### 3. Install dependencies

Install runtime dependencies:

```console
npm install express mysql2 dotenv
```

Install development dependencies:

```console
npm install --save-dev typescript tsx @types/node @types/express
```

Explanation:

- `express` is the web framework;
- `mysql2` is used to connect to MySQL;
- `dotenv` loads environment variables from a `.env` file;
- `typescript` enables TypeScript;
- `tsx` lets us run TypeScript files during development;
- `@types/node` provides Node.js types;
- `@types/express` provides Express types.

### 4. Configure TypeScript

Create a file named `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### 5. Update `package.json`

Edit your `package.json` so it contains also:

```json
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
```

You do not need to replace this whole file `package.json` but only update it.

### 6. Create the source folder

Create the project structure:

```console
mkdir src
```

Inside `src`, create a file named `index.ts`.

Later in the tutorial, the project will use this structure:

```text
src/
├── db/
│   └── database.ts
├── routes/
│   ├── news.routes.ts
│   └── users.routes.ts
└── index.ts
```

### 7. Create the Express server

Add this code to `src/index.ts`:

```ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = Number(process.env.PORT) || 5000;

// Middleware for JSON request bodies
app.use(express.json());

// Middleware for HTML form submissions
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

// Central error handler
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
```

### 8. Run the development server

Run:

```console
npm run dev
```

Visit:

```text
http://ADDRESS:PORT/
```

For example, if you run the server locally on port `5000`, visit:

```text
http://88.200.63.148:5000/
```

You should see:

```text
Hello from Express 5 and TypeScript
```

If you receive an error similar to this:
```text
node:events:486
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use 88.200.63.148:5000
    at Server.setupListenHandle [as _listen2] (node:net:1948:16)
    at listenInCluster (node:net:2005:12)
    at node:net:2214:7
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:1984:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '88.200.63.148',
  port: 5000
}

Node.js v24.14.1
```

You are facing a **port already in use** problem. Only one service can run on any given port. To resolve this problem, go to the port list and reserve a port for yourself:

https://docs.google.com/spreadsheets/d/1HRiWAmrBMDFY4kNgbBRplCUtS3eWDqN0T2xJXkLS3kE/edit?usp=sharing

Use the reserved port from now on. If that port stops working, choose and reserve another available port from the list. There are plenty of available ports, and you may reserve as many as you need.

---

## The routes

We could write all logic in `index.ts`, but the file would quickly become messy. Instead, we will separate routes into different files.

### 1. Create the routes folder

Inside `src`, create a folder named `routes`:

```console
mkdir src/routes
```

### 2. Create the news route file

Inside `src/routes`, create a file named `news.routes.ts`.

Add this code:

```ts
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

const getAllNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("The /news route has been reached");
    res.send("news");
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllNews);

export default router;
```

### 3. Connect the route to the server

Update `src/index.ts`:

```ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import newsRouter from "./routes/news.routes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

// Routes
app.use("/news", newsRouter);

// Central error handler
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
```

Notice this import:

```ts
import newsRouter from "./routes/news.routes.js";
```

Even though the file is named `news.routes.ts`, we use `.js` in the import path because TypeScript will compile the file to JavaScript in the `dist` folder.

### 4. Test the route

Run:

```console
npm run dev
```

Visit:

```text
http://ADDRESS:PORT/news
```

You should see:

```text
news
```

If you get this error, it is very likely that the selected port is already being used by another service.

---

## The database

Now we will establish a connection with the MySQL database.

### 1. Create the database folder

Inside `src`, create a folder named `db`:

```console
mkdir src/db
```

### 2. Create the database connection file

Inside `src/db`, create a file named `database.ts`.

Add this code:

```ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

### 3. Create the `.env` file

In the root of the `back-end` folder, create a file named `.env`:

```text
PORT=5000
DB_HOST=localhost
DB_USER=see-eclassroom
DB_PASS=see-eclassroom
DB_DATABASE=frameworks_tutorial
```

Important: replace the values with your actual database settings.

### 4. Create `.gitignore`

In the root of the `back-end` folder, create a file named `.gitignore`:

```text
.env
dist
node_modules
```

We do not want to upload database passwords, compiled files or installed packages to the repository.

---

## The CRUD

So far, we have learned how to:

- create a server;
- create routes;
- connect route files to the main server;
- configure a MySQL connection.

Now we will add Create, Read, Update and Delete-style database operations. In this tutorial, we implement:

- read all news;
- read one news item;
- create one news item;
- login user;
- register user.

### 1. Add database helper functions

Replace the content of `src/db/database.ts` with this:

```ts
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export interface NewsItem extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  text: string;
}

export interface UserLogin extends RowDataPacket {
  id: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export const allNews = async (): Promise<NewsItem[]> => {
  const [rows] = await pool.query<NewsItem[]>("SELECT * FROM news");
  return rows;
};

export const oneNewsItem = async (id: string): Promise<NewsItem[]> => {
  const [rows] = await pool.query<NewsItem[]>(
    "SELECT * FROM news WHERE id = ?",
    [id]
  );

  return rows;
};

export const createNewsItem = async (
  title: string,
  slug: string,
  text: string
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO news (title, slug, text) VALUES (?, ?, ?)",
    [title, slug, text]
  );

  return result;
};

export const authUser = async (username: string): Promise<UserLogin[]> => {
  const [rows] = await pool.query<UserLogin[]>(
    "SELECT * FROM user_login WHERE user_name = ?",
    [username]
  );

  return rows;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO user_login (user_name, user_email, user_password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  return result;
};
```

### 2. Update the news routes

Replace the content of `src/routes/news.routes.ts` with this:

```ts
import { Request, Response, NextFunction, Router } from "express";
import { allNews, createNewsItem, oneNewsItem } from "../db/database.js";

const router = Router();

const getAllNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await allNews();

    res.json(queryResult);
  } catch (error) {
    next(error);
  }
};

const getOneNewsItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await oneNewsItem(req.params.id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "News item not found.",
      });

      return;
    }

    res.json(queryResult[0]);
  } catch (error) {
    next(error);
  }
};

const addNewsItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, slug, text } = req.body as {
      title?: string;
      slug?: string;
      text?: string;
    };

    if (!title || !slug || !text) {
      res.status(400).json({
        success: false,
        message: "Title, slug and text are required.",
      });

      return;
    }

    const queryResult = await createNewsItem(title, slug, text);

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "News item added.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "News item was not added.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllNews);
router.get("/:id", getOneNewsItem);
router.post("/", addNewsItem);

export default router;
```

### 3. Create the users route

Inside `src/routes`, create a file named `users.routes.ts`.

Add this code:

```ts
import { Request, Response, NextFunction, Router } from "express";
import { authUser, createUser } from "../db/database.js";

const router = Router();

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });

      return;
    }

    const queryResult = await authUser(username);

    if (queryResult.length === 0) {
      res.status(401).json({
        success: false,
        message: "User is not registered.",
      });

      return;
    }

    const user = queryResult[0];

    if (password !== user.user_password) {
      res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.user_name,
        email: user.user_email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body as {
      username?: string;
      email?: string;
      password?: string;
    };

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Username, email and password are required.",
      });

      return;
    }

    const queryResult = await createUser(username, email, password);

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "User registered.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "User was not registered.",
    });
  } catch (error) {
    next(error);
  }
};

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
```

Security note: this tutorial compares passwords as plain text to keep the example simple. In a real application, never store plain-text passwords. Use password hashing with a package such as `bcrypt`.

### 4. Register the users route in `index.ts`

Update `src/index.ts`:

```ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import newsRouter from "./routes/news.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

app.use("/news", newsRouter);
app.use("/users", usersRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
```

### 5. Run the server

Run:

```console
npm run dev
```

You can use https://www.postman.com/, https://hoppscotch.io/, curl or a frontend application to test your API.

---

# API endpoints

## Get all news

```text
GET http://ADDRESS:PORT/news
```
Example: 
```text
GET http://88.200.63.148:5000/news
```

## Get one news item

```text
GET http://ADDRESS:PORT/news/:id
```
Example: 
```text
GET http://88.200.63.148:5000/news/1
```

## Add news item

```text
POST http://ADDRESS:PORT/news
```

JSON body:

```json
{
  "title": "My POST news item",
  "slug": "my-post-news-item",
  "text": "This is the content of the news item."
}
```

## Login user

```text
POST http://ADDRESS:PORT/users/login
```

JSON body:

```json
{
  "username": "testuser",
  "password": "test123"
}
```

## Register user

```text
POST http://ADDRESS:PORT/users/register
```

JSON body:

```json
{
  "username": "ana",
  "email": "ana@example.com",
  "password": "test123"
}
```

---

# Exercises

## Exercise 1: Test the existing API with https://www.postman.com/ or https://hoppscotch.io/

Using Postman or hoppscotch, test the following endpoints:

```text
GET http://ADDRESS:PORT/news
GET http://ADDRESS:PORT/news/:id
POST http://ADDRESS:PORT/news
POST http://ADDRESS:PORT/users/login
POST http://ADDRESS:PORT/users/register
```

For POST requests, send the request body as JSON.

Example request body for adding a news item:

```json
{
  "title": "Example title",
  "slug": "example-title",
  "text": "Example text"
}
```

Example request body for user login:

```json
{
  "username": "testuser",
  "password": "test123"
}
```

Example request body for user registration:

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "secret123"
}
```

---

## Exercise 2: Validate empty strings

The current implementation checks whether fields exist, but it should also reject empty strings.

For example, this request should fail:

```json
{
  "title": "",
  "slug": "",
  "text": ""
}
```

A request containing only spaces should also fail:

```json
{
  "title": "   ",
  "slug": "   ",
  "text": "   "
}
```

Expected response:

```json
{
  "success": false,
  "message": "Title, slug and text are required."
}
```

Hint: use `.trim()` before validation.

Example:

```ts
const title = req.body.title?.trim();
```

Apply the same idea to the required fields in:

```text
POST /news
POST /users/login
POST /users/register
```

---

## Exercise 3: Add a DELETE endpoint for news

Create a new endpoint:

```text
DELETE http://ADDRESS:PORT/news/:id
```

The endpoint should delete one news item from the `news` table based on its `id`.

Add a new database function in `src/db/database.ts`.

Example SQL:

```sql
DELETE FROM news WHERE id = ?
```

Then add a new route handler in `news.routes.ts`.

Expected successful response:

```json
{
  "success": true,
  "message": "News item deleted."
}
```

If the news item does not exist, return:

```json
{
  "success": false,
  "message": "News item not found."
}
```

Recommended status codes:

```text
200 OK              when the news item is deleted
404 Not Found       when the news item does not exist
500 Internal Error  when a server or database error occurs
```

---

## Exercise 4: Add an UPDATE endpoint for news

Create a new endpoint:

```text
PUT http://ADDRESS:PORT/news/:id
```

The endpoint should update the `title`, `slug` and `text` of an existing news item.

Add a new database function in `src/db/database.ts`.

Example SQL:

```sql
UPDATE news
SET title = ?, slug = ?, text = ?
WHERE id = ?
```

Example request body:

```json
{
  "title": "Updated title",
  "slug": "updated-title",
  "text": "Updated text"
}
```

Expected successful response:

```json
{
  "success": true,
  "message": "News item updated."
}
```

If the news item does not exist, return:

```json
{
  "success": false,
  "message": "News item not found."
}
```

Recommended status codes:

```text
200 OK              when the news item is updated
400 Bad Request     when title, slug or text is missing
404 Not Found       when the news item does not exist
500 Internal Error  when a server or database error occurs
```

---

## Exercise 5: Do not return the user password after login

Check the response from:

```text
POST http://ADDRESS:PORT/users/login
```

Make sure the response does **not** include `user_password`.

A good response should look like this:

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "testuser@example.com"
  }
}
```

The password should never be returned in an API response.

Check your code in `users.routes.ts` and make sure that only safe user data is returned.

Do not return this:

```json
{
  "id": 1,
  "user_name": "testuser",
  "user_email": "testuser@example.com",
  "user_password": "test123"
}
```