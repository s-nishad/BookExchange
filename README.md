# BookExchange

BookExchange is a web application that allows university students to exchange books for their academic courses. It provides a platform where students can upload books they want to exchange and request books from others, fostering a cost-effective and sustainable way to access course materials.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with email and password.
- User authentication and authorization using JWT (JSON Web Tokens).
- User profile management with the ability to add, edit, and remove uploaded books.
- Book upload with details such as title, author, department, course, and condition.
- Book search and filter options based on title, author, department, course, and availability status.
- Book exchange system allowing users to request books from others and confirm exchanges.
- Messaging system for users to communicate about book exchanges.
- Real-time notifications for new book requests and confirmed exchanges.
- Responsive design for a seamless experience across devices.

## Technologies Used

- **Front-end:**
  - Vue.js: JavaScript framework for building the user interface.
  - HTML5 and CSS3: Markup and styling of the application.
  - Vue Router: For handling client-side routing.
  - Axios: HTTP client for making API requests.

- **Back-end:**
  - Node.js: Server-side JavaScript runtime.
  - Express.js: Web framework for building the back-end API.
  - MongoDB: NoSQL database for storing user and book data.
  - Mongoose: MongoDB object modeling for Node.js.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/s-nishad/BookExchange.git
   cd BookExchange
   ```

# Install front-end dependencies
```bash
cd client
npm install
```

# Install back-end dependencies
```bash
cd ../server
npm install
```
# Usage
## Start the front-end development server:
```bash
cd client
npm run serve
```
## Start the back-end server:
```bash
cd server
npm start
```

## .env files
create on the root folder of the project and add the following code

![Env image](/env.png)


### 🤝🏻 &nbsp;Connect with Me


[![Facebook][facebook-shield]][facebook-url]
[![Instagram][instagram-shield]][instagram-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


[facebook-shield]: https://img.shields.io/badge/-Facebook-black.svg?style=flat-square&logo=facebook&color=555&logoColor=white
[facebook-url]: https://facebook.com/ShohanurIslamNishad
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&color=555&logoColor=white
[instagram-url]: https://instagram.com/nishad.shohanur
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ShohanurNishad
