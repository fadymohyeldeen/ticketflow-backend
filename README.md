# TicketFlow-Backend

A robust backend service for the TicketFlow ticket management system built with Node.js and Express.

## Project Requirements

### System Requirements

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)

### Dependencies

- Express 5.1.0
- Mongoose 8.14.2
- bcryptjs 3.0.2
- jsonwebtoken 9.0.2
- cors 2.8.5
- dotenv 16.5.0
- body-parser 2.2.0

## Database Schema

The application uses MongoDB with the following main collections:

- Users
- Tickets

## Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/fadymohyeldeen/ticketflow-backend
cd ticketflow-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   Create a `.env` file in the root directory with the necessary variables.

4. Start the development server:

```bash
npm run dev
```

## Default Admin Credentials

For testing purposes, you can use the following credentials:

- **Email:** admin@example.com
- **Password:** Admin
