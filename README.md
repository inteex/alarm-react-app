# Description

This repository contains an alarm prototype application developed with React, Context API, hooks, and Electron. It allows users to set alarms.

# Installation

## Prerequisites

- Node.js
- npm or Yarn
- [Alarm api](https://github.com/inteex/alarm-api) An Express app that manages CRUD operations.

## How to install?

1. Clone the repository to your local machine.

```bash
  git clone https://github.com/inteex/alarm-react-app.git
```

2. Navigate to the project directory.

```bash
cd alarm-react-app
```

3. Install the dependencies using npm or Yarn.

```bash
npm install
```

or

```bash
yarn install
```

## Launch in development mode

To start the application in development mode:

```bash
yarn run dev
```

This command will launch an Electron window displaying the alarm application.

# Tests

To run the tests for the application, use the following command:

```bash
yarn run test
```

This command will print some options for runing the tests. Press `a` to run all the tests at once.

# Improvements

Here are some possible improvements that can be made to the application:

- **Use of axios**: Consider replacing the basic `fetch` API with `axios` to take advantage of interceptors, middleware, and other advanced features.
- **Git hooks**: Utilize Git hooks, such as pre-commit hooks, to trigger code formatting, running tests, and performing other checks before committing code changes.
- **Add more tests**: Expand the test suite to cover more components and functionalities
- **Error handling**: Implement better error handling to handle network failures and API errors gracefully.
- **Utils and helpers folder**: Create a separate folder for utility and helper functions.
- **Environment variables**: Consider implementing different environment stages, such as development, staging, and production, and utilize environment variables to handle stage-specific configurations.
- **Type improvements**: Enhance the type definitions and stricter prop typing to catch potential errors during development.
- **Dockerize the app**: Containerize the application using Docker to simplify deployment and ensure consistent behavior across different environments.
