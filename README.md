# TicketFlow Backend

A robust backend service for the TicketFlow ticket management system built with Node.js and Express.

## Project Requirements

### System Requirements

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)

### Dependencies

#### Production Dependencies

- React ^18.2.0
- React DOM ^18.2.0
- React Router DOM ^6.30.0
- React Hot Toast ^2.5.2
- React Toastify ^11.0.5
- React Icons ^4.12.0
- Recharts ^2.15.3

#### Development Dependencies

- Vite ^5.1.4
- TailwindCSS ^3.4.1
- ESLint ^8.56.0
- PostCSS ^8.4.35
- Autoprefixer ^10.4.17

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

3. Start the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:5000` by default.

## Default Admin Credentials

For testing purposes, you can use the following credentials:

- **Email:** admin@example.com
- **Password:** Admin
