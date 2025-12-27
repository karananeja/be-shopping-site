# Shopping Site Backend API

A Node.js/Express backend application that provides the infrastructure for a shopping platform. This RESTful API handles user authentication, profile management, and address management.

## Features

- 🔐 User authentication (Sign up & Sign in)
- 👤 User profile management (Create, Read, Update)
- 🔑 Password reset functionality
- 📍 Address management (Add, List, Update, Delete addresses)
- 🔒 JWT-based authentication
- 🛡️ Password hashing with bcrypt
- ⚠️ Centralized error handling
- 🌍 Country list utility endpoint

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt for password hashing
- **CORS**: Enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd be-shopping-site
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
NODE_DB_PASSWORD=your_mongodb_password
NODE_DB_NAME=your_database_name
NODE_APP_PORT=5000
NODE_JWT_SECRET=your_jwt_secret_key
```

4. Start the server:

```bash
npm start
```

The server will start on the port specified in `NODE_APP_PORT` (default: 5000).

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Authentication

#### Register User

- **POST** `/user/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user email and access token

#### Sign In

- **POST** `/user/get-token`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user email and access token

### User Management

#### Update User Info

- **POST** `/user/update-info`
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-01-01",
    "phoneNumber": "1234567890",
    "updatedEmail": "newemail@example.com"
  }
  ```

#### Get User Info

- **GET** `/user/get-info`
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: Returns user profile information

#### Reset Password

- **PUT** `/user/reset-password`
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**:
  ```json
  {
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword123"
  }
  ```
- **Response**: Returns success message on password reset

### Address Management

#### Add Address

- **POST** `/user/add-address`
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**:
  ```json
  {
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "type": "home",
    "name": "John Doe",
    "phone": "1234567890",
    "city": "New York",
    "state": "NY",
    "pincode": 10001,
    "isDefault": true
  }
  ```

#### List Addresses

- **GET** `/user/list-address`
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: Returns list of all user addresses

#### Update Address

- **PUT** `/user/update-address`
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**:
  ```json
  {
    "id": "address_id_here",
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "type": "home",
    "name": "John Doe",
    "phone": "1234567890",
    "city": "New York",
    "state": "NY",
    "pincode": 10001,
    "isDefault": true
  }
  ```
- **Response**: Returns updated address information

#### Delete Address

- **DELETE** `/user/delete-address`
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**:
  ```json
  {
    "id": "address_id_here"
  }
  ```

### Utilities

#### Get Country List

- **GET** `/country-list`
- **Response**: Returns list of supported countries

## Project Structure

```
be-shopping-site/
├── logs/                    # Error logs
│   └── errorLogs.json
├── middlewares/             # Custom middleware
│   ├── errorMiddleware.js   # Global error handler
│   └── userMiddleware.js    # User validation middleware
├── models/                  # MongoDB models
│   ├── addressModel.js      # Address schema
│   ├── userEmailModel.js    # User email/password schema
│   └── userInfoModel.js     # User profile schema
├── mongodb/                 # Database connection
│   └── connect.js           # MongoDB connection setup
├── routes/                  # API routes
│   ├── signup.js           # User registration
│   ├── signin.js           # User authentication
│   ├── users.js            # User profile & address management
│   └── utils.js            # Utility endpoints
├── utils/                   # Utility functions
│   ├── constants.js        # Constants and environment config
│   └── helpers.js          # Helper functions
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## Error Handling

The API uses centralized error handling middleware. All errors are logged to `logs/errorLogs.json` and returned in a consistent format:

```json
{
  "status": 400,
  "msg": "Error Message",
  "error": "Detailed error description"
}
```

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 30 days
- Email validation using regex
- Token verification middleware for protected routes
- CORS enabled for cross-origin requests

## Author

**Karan Aneja**

## License

ISC
