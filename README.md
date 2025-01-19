# Finance Tracker Backend

This is the backend service for the Finance Tracker application. It provides APIs to manage financial data and user accounts.

## Features

- User Signup and Login
- Financial reports
- Expense and Income tracking

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/FinanceTracker-be.git
   ```
2. Navigate to the project directory:
   ```sh
   cd FinanceTracker-be
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the server:
   ```sh
   npm start
   ```
2. The server will be running at `http://localhost:3000`.

## API Documentation

For detailed API documentation, refer to the [API Docs](./docs/api.md).

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
