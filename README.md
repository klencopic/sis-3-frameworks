# Systems III – Frameworks

*Created for educational purposes.*

Welcome to the GitLab repository for **Systems III – Frameworks**.

This repository contains supporting materials for the laboratory sessions. Its purpose is to help you become familiar with web technologies commonly used in modern web development.

The material is divided into three main tutorials:

- **Back-end**
- **Front-end**
- **Full-stack**

Each tutorial focuses on one part of a web application. During the lab sessions, we will work through these tutorials step by step and complete a set of deliverables. The deliverables will be announced at the beginning of each session.

---

## Clarifications

### SSH connection

When using SSH, please note that we are **not** using the following command:

```console
ssh <enrolment_num>@www.studenti.famnit.upr.si
```

Instead, we will connect to the following virtual machine:

```console
ssh <enrolment_num>@88.200.63.148
```

This distinction is important because the two environments may have different software versions installed. For the purposes of these tutorials, we will use:

```text
88.200.63.148
```

---

## Troubleshooting

As your teaching assistant, I am here to help you with technical difficulties. However, before asking for help, please go through the checklist below.

---

### General checklist

#### 1. Are you running the command from the correct directory?

For example:

```console
node index.js

or 

npm run dev
```

This command works only if you run it from the correct directory where `index.js` or `package.json` is located.

If the file is inside another folder, you must either move to that folder first or provide the correct path to the file.

---

#### 2. Are you running your command in the correct environment?

In this course, we often work on a remote virtual machine. Make sure that you are executing commands inside the SSH session, not only on your local computer.

You can usually recognize the SSH terminal by checking the terminal prompt. It should look similar to one of the following:

```console
89183001@studenti2:~$
```

or:

```console
89183001@88.200.63.148:~$
```

---

#### 3. Have you installed the project dependencies?

In Node.js projects, dependencies are defined in the `package.json` file.

After cloning or pulling a project from Git, you usually need to install the dependencies locally. This is necessary because the `node_modules` folder is normally not stored in Git. It is usually listed in `.gitignore`.

To install dependencies, run:

```console
npm install
```

Run this command in the same directory where `package.json` is located.

---

#### 4. Why do I get “connection refused” from my database?

Check that your database credentials are correctly configured in the `.env` file.

Also make sure that:

- the database server is accessible from the environment where your back-end is running;
- you are running the back-end server on the correct machine;
- your `.env` file contains the correct database host, user, password and database name;
- your code actually loads the `.env` file.

---

#### 5. The server is running and the database is connected, but the front-end cannot fetch data

Check the following:

- Are you calling the correct API endpoint?
- Is the back-end server running on the expected address and port?
- Is the route implemented in the back-end?
- Is the HTTP method correct, for example `GET`, `POST`, `PUT` or `DELETE`?
- Is CORS enabled on the server if your front-end and back-end run on different origins?

---

## Asking for help

If your issue persists after following the troubleshooting checklist, you may contact the teaching assistant.

To make the support process more efficient, include the following information in your message:

- your name;
- a clear description of the issue;
- the exact command you ran;
- the full error message;
- screenshots or a short video, if useful;
- confirmation that you followed the troubleshooting checklist;
- three possible time slots for an online meeting, for example: Friday, 28 March, at 20:00.

After receiving your message, I will confirm one of the proposed times or suggest an alternative.

---

## Tutorials

- [00. Back-end](./Tutorials/00_Back-end.md)
- [01. Front-end](./Tutorials/01_Front-end.md)
- [02. Full-stack](./Tutorials/02_FullStack.md)

---

## Resources

### External database configuration

Use the following database configuration in your `.env` file:

```text
DB_HOST=localhost
DB_USER=studenti
DB_PASS=check e-classroom for password
DB_DATABASE=frameworks_tutorial
```