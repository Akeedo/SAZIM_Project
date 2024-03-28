## Running The Project with Docker Compose: A Step-by-Step Guide

To run a project using a `docker-compose.yaml` file, follow these steps. This guide assumes you have Docker and Docker Compose installed on your system. If not, you'll need to install them first.

### Step 1: Review the `docker-compose.yaml` File
Before running the project, it's good practice to review the `docker-compose.yaml` file to understand the services, networks, and volumes that will be created. This file defines the setup of your Docker containers, including the application environment, dependencies, and any other services your project requires (like databases or cache servers).

### Step 2: Open a Terminal or Command Prompt
Navigate to the directory containing the `docker-compose.yaml` file using your terminal or command prompt.

### Step 3: Build the Project (Optional)
Depending on the configuration in your `docker-compose.yaml` file, you might need to build your Docker images before running them, especially if the file specifies build contexts for your services.

Run the following command to build (or rebuild) your services:

```bash
docker-compose build
```

This command reads the `docker-compose.yaml` file and builds images for the services that have a `build` context specified. If your services use pre-built images from a registry (like Docker Hub), and you don't need to build any custom images, you can skip this step.

### Step 4: Run the Docker Containers
Start the project by running the following command:

```bash
docker-compose up
```

This command starts all the services defined in your `docker-compose.yaml` file. By default, `docker-compose up` runs in the foreground and shows logs from all the containers. To run it in the background, use:

```bash
docker-compose up -d
```

### Step 5: Verify the Containers are Running
Check that all your Docker containers are up and running by executing:

```bash
docker-compose ps
```

This command lists all the containers managed by the `docker-compose.yaml` file and shows their status.

### Step 6: Access the Application
Depending on how your application and Docker environment are configured, you might access your application through a web browser, API client, or another method. Commonly, web applications running in Docker containers can be accessed via `localhost` and the port number specified in the `docker-compose.yaml` file.

### Step 7: Shut Down the Project
When you're done working with your project, you can stop and remove the containers, networks, and volumes created by `docker-compose up` by running:

```bash
docker-compose down
```

This command stops all the running services and cleans up by removing the containers, default network, and the data volume (if `volumes` was specified in the `docker-compose.yaml` file without the `external` flag).




## Comprehensive Manual Setup Guide for "teebay-web-app" 

This structured guide provides a clear path for setting up the database, the TeebayApi backend, and the "teebay-web-app" front-end.

### Part I: Database Preparation

#### Step 1: Create the "teebay" Database

- **Using `psql`**:
  1. Connect with `psql -U postgres`.
  2. Execute `CREATE DATABASE teebay;`.
  3. Exit with `\q`.

- **Using pgAdmin**:
  1. Open pgAdmin and connect to your server.
  2. Right-click "Databases" > "Create" > "Database...", name it "teebay", and save.

- **Verification**:
  - Confirm creation with `\l` in `psql` or refresh in pgAdmin.

- **Configure Connection**:
  - Update `.env` with the connection string:
    ```env
    DATABASE_URL="postgresql://username:password@localhost:5432/teebay?schema=public"
    ```

### Part II: Backend Setup (TeebayApi)

#### Step 2: Clone the Repository
- Clone with `git clone <repository-url>`, substituting `<repository-url>` with TeebayApi's repository URL.

#### Step 3: Ensure Node.js Compatibility
- **NVM Users**: Run `nvm install 16.20.2 && nvm use 16.20.2`.
- **Non-NVM Users**: Check with `node -v` and install version 16.20.2 if necessary.

#### Step 4: Install Dependencies
- In the TeebayApi's root directory, remove `node_modules` if present.
- Run `npm install`.

### Part III: Prisma Integration

#### Step 5: Define Database Schema
- Ensure the models in `prisma/schema.prisma` accurately represent your database structure.

#### Step 6: Generate Prisma Client
- Execute `npx prisma generate`.

### Part IV: Launching the Backend

#### Step 7: Run the Backend Server
- Use `node server` to start the TeebayApi. Confirm access at `http://localhost:3030`.

### Part V: Launching the "teebay-web-app" Front-End

#### Step 8: Install Front-End Dependencies
- Navigate to the "teebay-web-app" directory within `SAZIM_Project`.
- Execute `npm install` to install all necessary dependencies.

#### Step 9: Set Up Environment Variables
- Locate and copy `.env.example` to a new file named `.env` within the "teebay-web-app" directory.
- Fill in the `.env` file with the necessary details such as API URLs and secret keys as per the project's setup guide or documentation.

#### Step 10: Start the Development Server
- In the "teebay-web-app" directory, run `npm start` to launch the front-end development server.
- The build process should open the application in your default web browser automatically. If not, manually navigate to `http://localhost:3000` to view the app.

By following these steps, you'll have a fully operational development environment for working on both the TeebayApi backend and the "teebay-web-app" front-end components.