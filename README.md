# ZAAX-PRODUCT-MANAGEMENT | Express TypeScript Application

This is a simple Express server application written in TypeScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm. You can download them from [nodejs.org](https://nodejs.org/).
- You have installed TypeScript globally. You can do this by running the following command:

```bash
npm install -g typescript

```
# Installation
1. Clone the repository
```
git clone https://github.com/MehediHaassan1/zaax-product-management-server.git
```

2. Navigate to the project directory:
```
cd zaax-product-management-server
```

3. Install the dependencies:
```
npm install
```

# Configuration
create a .env file in the root of your project and add your configurations.
```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/mydatabase
``` 

# Running application

### To run the application locally, follow these steps:

1. Compile the TypeScript code to JavaScript:
```
npm run build
```

2. Start the server:
```
npm run start
```

Alternatively, if you want to run the server with automatic recompilation on file changes (useful for development), you can use `ts-node-dev`:
```
npm run start:dev
```