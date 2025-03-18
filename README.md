# Systems III
*Created for educational purposes




Welcome to the GitLab repository for Systems III - Frameworks. The purpose of this repository is to provide you with supporting materials to help you become familiar with various web technologies commonly used in modern web development.


The content is divided into three main tutorials: back-end, front-end, and full-stack. Each tutorial focuses on developing essential components of a web application. During the lab sessions, we will guide you through these tutorials and complete a set of deliverables, which will be announced at the beginning of each session


## Clarifications
When using SSH, please note that we are NOT using the following command:


```
$ ssh <enrolment_num>@www.studenti.famnit.upr.si
```
Instead, we will connect to the following Virtual Machine:


```
$ ssh <enrolment_num>@88.200.63.148
```
It's crucial to make this distinction as these two connections have different versions of software. For the purposes of these tutorials, it is more convenient to use 88.200.63.148.


## Troubleshooting


As your teaching assistant, I'm here to assist you with any technical difficulties you may encounter. However, before reaching out to me for help, please consider going through this checklist:


### General
#### Are you running the command with the proper arguments? For instance:


```
$ node index.js
```
This command will execute successfully only if you've invoked it in the directory where the 'index.js' file is located. I won't go into further detail on this matter since you've already covered it in Computer Practicum I.


#### Are you running your script in the correct instance?
Keep in mind that we're working with a remote virtual machine, so it's crucial to confirm that you're executing commands via the SSH connection. You can usually distinguish this terminal from any others you may have open by checking the terminal prompt, which should resemble one of the following:
```
89183001@studenti2:~$
```
or
```
89183001@88.200.63.148:~$
```


#### Have you installed the project dependencies?
In Node.js, every project includes a vital configuration file named package.json. This file serves as the central hub for managing and defining the attributes of a Node.js project. It contains essential metadata about the project, encompassing details such as its name, version, dependencies, and various other configurations. Let's delve into what you'd typically encounter within this file.


After pulling a project from a Git repository, it's usually necessary to install the local Node.js dependencies. This step is crucial because these dependencies might have been updated in another branch. Additionally, it's common practice to include the node_modules folder in the .gitignore file to avoid storing these dependencies in version control.
The command to install the dependencies is:


```
npm install
```
This command should be executed in the same directory where the package.json file is located.


#### Why I get connection refused from my database
Ensure that you have correctly configured the credentials in the .env configuration file. If you still encounter connection refusal issues even after correctly setting the credentials, double-check that the server is running exclusively on the virtual machine and nowhere else. You may want to review the previous steps to confirm the setup.


#### Server is running, database is connected but no data can be fetched in the front-end
Verify that you are making the correct calls to valid endpoints, and ensure that you have enabled CORS on the server.


Finally, If you've reached this sentence, it likely means that your issue persists, and neither Google nor Chat GPT has been able to provide a solution. Unfortunately, I don't like to write/exchange multiple messages via email, so please follow these steps to get assistance:


- Your name
- Yout issue (elaborate)
- Evidence (video-pictures, did you follow the Troubleshooting guide, right?)
- Three options for a online meeting. e.g Friday 28th, at 20:00


After receiving your email, I will promptly respond to confirm or suggest an alternative time for the meeting. Your cooperation in providing detailed information will help us resolve your technical difficulties more efficiently.


## Tutorials


[00. Back-end](./Tutorials/00_Back-end.md)


[01. Front-end](./Tutorials/01_Front-end.md)


[02. Full stack](./Tutorials/02_FullStack.md)


## Resources
External database (substitute this in your .env file)
- DB_HOST=localhost
- DB_USER=studenti
- DB_PASS=s039c8r7
- DB_DATABASE=Qcodeigniter