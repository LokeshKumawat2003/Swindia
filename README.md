# Swindia

# Lead Management Application

This project is a React-based lead management system where users can view, create, and manage leads effectively. The application communicates with a backend API to fetch and update lead data. The app provides functionality for filtering leads, updating their status, and assigning leads to specific team members

## Features

- **Profile View:** Users can view their profile information such as name, email, phone number, and address.
- **Admin Edit:** Users can update their profile information including name, email, password, phone number, and address.
- **Logout:** Users can log out and clear their session data.
- **Admin Access:** Users can navigate to the admin page if they have admin rights.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT) stored in `localStorage`
- **CSS:** Custom CSS styling

## Dependencies

### Frontend Dependencies

- `axios`: For making HTTP requests to the backend API.
- `react`: Core library for building user interfaces.
- `react-dom`: Provides DOM-related methods for React.
- `react-hot-toast`: A library for showing toast notifications for user feedback.
- `react-icons`: A collection of customizable icons for React applications.
- `react-router-dom`: For routing and navigation between pages in the React app.
- `redux`: For detais show for leads.

### Backend Dependencies

- `bcrypt`: For hashing passwords.
- `bcryptjs`: Alternative to bcrypt for password hashing (used as a fallback).
- `cors`: For enabling cross-origin resource sharing in the backend.
- `express`: The web framework for building the backend API.
- `jsonwebtoken`: For generating and verifying JSON Web Tokens (JWT) for authentication.
- `mongoose`: MongoDB ODM for interacting with the MongoDB database.

## Setup and Installation

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone <repository-url>
