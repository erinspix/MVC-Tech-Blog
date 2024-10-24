# MVC-Tech-Blog
Model View Controller Challenge for a Tech Blog
# MVC-Tech-Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Model View Controller Challenge for a Tech Blog

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Follow these steps to set up and run the project on your local machine:

1. Clone the Repository
Start by cloning the project repository to your local machine:
https://github.com/erinspix/MVC-Tech-Blog.git
Make sure Node.js is installed. You can check this by running:
node -v
3. Install Project Dependencies
Run the following command to install all required dependencies:
npm install
4. Set Up Environment Variables
Create a .env file in the root of the project with the following content:
5. Start the Application
To start the application, run:
npm startThe server will be running at http://localhost:3001.

6. Verify the Application
Open a browser and visit http://localhost:3001 to ensure everything is working correctly. This includes checking the form handler, login, and logout functionality.


## Usage

After successfully setting up the project and starting the server, you can interact with the application using the following features:

1. Home Page
The home page displays all the blog posts created by users.
You can navigate to the home page by visiting http://localhost:3001/.
2. Signing Up
New users can create an account by clicking the Sign Up link on the navigation bar.
After signing up, you will automatically be logged in and redirected to your dashboard.
3. Logging In
Existing users can log in by clicking the Login link in the navigation bar.
Once logged in, you'll be redirected to your dashboard to manage your posts.
4. Dashboard
After logging in, users will be able to:
Create a new blog post using the "New Post" button.
Edit or delete their existing blog posts directly from the dashboard.
5. Viewing a Post
On the home page, users can click on a post title to view the full post and its comments.
6. Commenting on a Post
Logged-in users can add comments to any post by submitting the comment form on the post's page.
7. Logging Out
To log out, click the Logout button in the navigation bar. This will end your session and redirect you back to the home page.


## License

This project is licensed under the MIT license.
For more details, see: [MIT](https://opensource.org/licenses/MIT)

## Contributing

Contribution Guidelines
We welcome contributions to improve the project! Please follow these guidelines to ensure a smooth contribution process:

Fork the Repository

Click the "Fork" button at the top right of this repository and create your 
Create a Branch

Clone your forked repository locally.
Create a new branch for your changes:

git checkout -b feature/your-feature-name
Make Your Changes

Implement your changes or fix any issues.
Ensure your code follows the coding standards and best practices used in the project.
Test your changes thoroughly.
Commit Your Changes

Write clear, concise commit messages describing your changes:

git commit -m "Add description of the change"
Push to Your Fork

Push your changes to your forked repository:

git push origin feature/your-feature-name
Open a Pull Request

Navigate to the original repository on GitHub.
Open a new pull request and describe your changes in detail. Reference any issues it addresses.
Code Review

Your pull request will be reviewed by maintainers.
Be open to feedback and willing to make revisions if needed.
Celebrate

Once your pull request is merged, your contribution will be part of the project!


## Tests

Test Instructions
To test the application locally, follow these steps:

Ensure all dependencies are installed by running the command:


npm install
Set up the database:

Ensure that PostgreSQL is running on your machine.
Run the following command to create and initialize the database:

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
Run the application:

You can test the application by starting the server:

npm start
Testing the routes:

Use Insomnia or Postman to test the API routes (GET, POST, PUT, DELETE) for users, posts, and comments.
Example routes:
POST /api/users/signup
POST /api/users/login
POST /api/posts
DELETE /api/posts/:id
Manual testing:

Open your browser and visit http://localhost:3001/ to interact with the application and test different user features like signing up, logging in, creating posts, editing, and deleting posts.
Check the console for any errors:

The application should print logs in the terminal for successful database interactions or display error messages.


## Questions

For any questions, please contact me with the information below:

GitHub: [erinspix](https://github.com/erinspix)  
Email: e.spix@yahoo.com

Screenshots:
![Home](./readme-images/mvc%20view%20post.png)
![Signup](./readme-images/mvc%20signup.png)
![Post View](./readme-images/mvc%20view%20post.png)
## Deployed Application
You can find the live version of the app here: [Tech Blog](https://mvc-tech-blog-hzc6.onrender.com)