# Back-end using MySQL, Node.js, Express 5 and TypeScript

The aim of this tutorial is to create a simple web service that uses a MySQL database to store data.

The web service will have an API which enables us to:

- retrieve a list of existing news items;
- retrieve one news item by id;
- add a new news item;
- register a new user;
- login/authenticate an existing user.

This updated version of the tutorial uses:

- **TypeScript** instead of plain JavaScript;
- **ES Modules** using `import` / `export` instead of CommonJS `require()` / `module.exports`;
- **function-based routing** instead of class-based controllers;
- **Express 5**.

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

### Installation

Install Node.js from the official Node.js website.

After installation, check your version:

```console
node --version
npm --version
```

For this tutorial, use a recent Node.js version that supports modern TypeScript and ESM workflows.

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
- [The DB](#the-db)
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

Edit your `package.json` so it contains:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

You do not need to copy this whole file if your `package.json` already contains other fields. Add or update only these parts:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### 6. Create the source folder

Create the project structure:

```console
mkdir src
```

Inside `src`, create a file named `index.ts`.

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
http://localhost:5000/
```

You should see:

```text
Hello from Express 5 and TypeScript
```

---

## The routes

We could write all logic in `index.ts`, but the file would quickly become messy. Instead, we will separate routes into different files.

### 1. Create the routes folder

Inside `src`, create a folder named `routes`:

```console
mkdir src/routes
```

### 2. Create the news route file

Inside `src/routes`, create a file named `novice.routes.ts`.

Add this code:

```ts
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

const getAllNovice = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("The /novice route has been reached");
    res.send("novice");
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllNovice);

export default router;
```

### 3. Connect the route to the server

Update `src/index.ts`:

```ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import noviceRouter from "./routes/novice.routes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

// Routes
app.use("/novice", noviceRouter);

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
import noviceRouter from "./routes/novice.routes.js";
```

Even though the file is named `novice.routes.ts`, we use `.js` in the import path because TypeScript will compile the file to JavaScript in the `dist` folder.

### 4. Test the route

Run:

```console
npm run dev
```

Visit:

```text
http://ADDRESS:PORT/novice
```

You should see:

```text
novice
```

---

## The DB

Now we will establish a connection with the MySQL database.

### 1. Create the DB folder

Inside `src`, create a folder named `DB`:

```console
mkdir src/DB
```

### 2. Create the database connection file

Inside `src/DB`, create a file named `dbConn.ts`.

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

In this updated version, we use `mysql2/promise`. This lets us use `async` and `await` without manually wrapping every query in a `new Promise`.

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

Replace the content of `src/DB/dbConn.ts` with this:

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

export const allNovice = async (): Promise<NewsItem[]> => {
  const [rows] = await pool.query<NewsItem[]>("SELECT * FROM news");
  return rows;
};

export const oneNovica = async (id: string): Promise<NewsItem[]> => {
  const [rows] = await pool.query<NewsItem[]>(
    "SELECT * FROM news WHERE id = ?",
    [id]
  );

  return rows;
};

export const createNovica = async (
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

Replace the content of `src/routes/novice.routes.ts` with this:

```ts
import { Request, Response, NextFunction, Router } from "express";
import { allNovice, createNovica, oneNovica } from "../DB/dbConn.js";

const router = Router();

const getAllNovice = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await allNovice();

    res.json(queryResult);
  } catch (error) {
    next(error);
  }
};

const getOneNovica = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await oneNovica(req.params.id);

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

const addNovica = async (
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

    const queryResult = await createNovica(title, slug, text);

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

router.get("/", getAllNovice);
router.get("/:id", getOneNovica);
router.post("/", addNovica);

export default router;
```

Important updates compared with the old version:

- `require()` was replaced with `import`;
- `module.exports` was replaced with `export default`;
- `body-parser` was removed because Express can handle JSON and URL-encoded form bodies directly with `express.json()` and `express.urlencoded()`;
- handlers are function-based;
- response status and JSON are written in Express 5-compatible style, for example `res.status(201).json(...)`.

### 3. Create the users route

Inside `src/routes`, create a file named `users.routes.ts`.

Add this code:

```ts
import { Request, Response, NextFunction, Router } from "express";
import { authUser, createUser } from "../DB/dbConn.js";

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
import noviceRouter from "./routes/novice.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

app.use("/novice", noviceRouter);
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

You can use Postman, Insomnia, curl or a frontend application to test your API.

---

# API endpoints

## Get all news

```text
GET http://ADDRESS:PORT/novice
```

Example local URL:

```text
GET http://localhost:5000/novice
```

## Get one news item

```text
GET http://ADDRESS:PORT/novice/:id
```

Example:

```text
GET http://localhost:5000/novice/1
```

## Add news item

```text
POST http://ADDRESS:PORT/novice
```

JSON body:

```json
{
  "title": "My first news item",
  "slug": "my-first-news-item",
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
  "username": "ana",
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

## Exercise 1: POST requests

Using Postman, create a POST request to:

```text
http://ADDRESS:PORT/novice
```

Add the following JSON body:

```json
{
  "title": "Example title",
  "slug": "example-title",
  "text": "Example text"
}
```

Then create a POST request to:

```text
http://ADDRESS:PORT/users/login
```

Add the following JSON body:

```json
{
  "username": "your-username",
  "password": "your-password"
}
```

---

## Exercise 2: JSON responses

Update the application so every POST request returns a JSON response.

Example response:

```json
{
  "success": true,
  "message": "News item added."
}
```

Hint:

```ts
res.status(201).json({
  success: true,
  message: "News item added.",
});
```

---

## Exercise 3: Register new users

Create and test this endpoint:

```text
POST http://ADDRESS:PORT/users/register
```

It should insert a new user into the `user_login` table.

SQL query:

```sql
INSERT INTO user_login (user_name, user_email, user_password) VALUES (?, ?, ?)
```

Example JSON body:

```json
{
  "username": "new-user",
  "email": "new-user@example.com",
  "password": "secret"
}
```

---

## Exercise 4: Convert CommonJS to ES Modules

Convert this old CommonJS code:

```js
const express = require("express");
const router = express.Router();

module.exports = router;
```

to ES Modules:

```ts
import { Router } from "express";

const router = Router();

export default router;
```

---

## Exercise 5: Convert class-based routing to function-based routing

Convert this older class-based handler:

```ts
class NewsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json([]);
    } catch (error) {
      next(error);
    }
  }
}

const controller = new NewsController();

router.get("/", controller.getAll.bind(controller));
```

to function-based routing:

```ts
const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json([]);
  } catch (error) {
    next(error);
  }
};

router.get("/", getAll);
```

---

# Summary

In this tutorial, we updated the original Node.js and Express tutorial to use a modern back-end setup:

- TypeScript instead of plain JavaScript;
- ES Modules instead of CommonJS;
- function-based routing instead of class-based routing;
- Express 5-compatible request and response handling;
- `mysql2/promise` for cleaner async database code;
- centralized error handling;
- JSON responses for API endpoints.