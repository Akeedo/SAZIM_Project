

### Database Setup

#### Step 1: Create the "teebay" Database
- **Using `psql`**:
  1. Connect to PostgreSQL with `psql -U postgres`.
  2. Execute `CREATE DATABASE teebay;`.
  3. Exit with `\q`.
- **Using pgAdmin**:
  1. Open pgAdmin, navigate to your server instance.
  2. Right-click "Databases", choose "Create" > "Database...", name it "teebay", and click "Save".
- **Verification**: Confirm the database's creation with `\l` in `psql` or by refreshing pgAdmin.
- Configure Database Connection
- Update the `.env` file with the PostgreSQL connection string:
  ```env
  DATABASE_URL="postgresql://username:password@localhost:5432/teebay?schema=public"
  ```


## Manual Setup Guide for Node.js Project with Prisma and PostgreSQL

### Initial Project Setup

#### Step 2: Clone the Repository
- **Action**: Clone the project with `git clone <repository-url>`, replacing `<repository-url>` with the project's repository URL.

#### Step 3: Node.js Version
- **NVM Users**: Run `nvm install 16.20.2 && nvm use 16.20.2` to use Node.js version 16.20.2.
- **Non-NVM Users**: Check the installed Node.js version with `node -v`. Install version 16.20.2 from the [Node.js website](https://nodejs.org/en/download/releases/) or use a version manager if necessary.

#### Step 4: Install Dependencies
- **Preparation**: Delete any existing `node_modules` directory for a fresh setup.
- **Installation**: Execute `npm install` to install project dependencies.

### Prisma Integration

#### Step 6: Define Database Schema
- Review the `prisma/schema.prisma` file. Ensure the models accurately represent the desired database structure.

#### Step 7: Generate Prisma Client
- Run `npx prisma generate` to create or update Prisma Client based on your schema.

### Finalize Setup

#### Step 8: Run the Project
- Start your application with `node server`, ensuring everything is correctly set up and running.

