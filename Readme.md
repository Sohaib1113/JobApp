# Job Application Full-Stack Project

This project is a full-stack job application management system where users can view and apply for jobs, while admins can post, edit, and delete job listings. The project is built using React.js for the frontend, Node.js, and Express.js for the backend, and MySQL as the database.

## Project Structure

The project is structured into two main directories:

- `frontend`: Contains the React.js code for the user interface.
- `backend`: Contains the Node.js/Express.js adn we used Redux code for the backend API and database interactions.

## Features


### Admin Panel
- **Jobs Form Page**: Admins can post new job listings by filling in the company name, position, contract type, location, and job description.
- **Jobs Listing Page**: Admins can view, edit, and delete job listings. The job data is displayed in a table format.

### User Panel
- **Jobs Page**: Users can view all job listings posted by the admin. They can search by company name, filter by location and contract type, and apply for jobs.
- **Applied Jobs Page**: Users can view the jobs they have applied for.
![image](https://github.com/user-attachments/assets/5f72d9b8-f26e-4e88-bb57-ca0eafc3baeb)
![image](https://github.com/user-attachments/assets/b72d2f64-aa89-432a-8438-e721d58981e8)
![image](https://github.com/user-attachments/assets/acef47cd-d2a3-4b6f-80f4-ae7c504a7aaa)
![image](https://github.com/user-attachments/assets/4ce48abe-c536-4d54-a340-94d3c6b9949a)
![image](https://github.com/user-attachments/assets/e81dace3-67ce-498a-b56e-5ed7a34b2f36)



## Installation and Setup

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12 or later)
- [MySQL](https://www.mysql.com/) (for the database)

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend

Install dependencies:
npm install
Configure the database:

Create a .env file in the backend directory and add your database credentials:

bash
Copy code
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jobapp
JWT_SECRET=your_jwt_secret
Run the backend server:

bash
Copy code
npm start
The backend server will start on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:



cd frontend
Install dependencies:
npm install

Build the frontend:
npm run build
This will create an optimized production build in the build directory.

Run the frontend in development mode (optional):



npm start
The frontend will start on http://localhost:3000.

Running the Project
After setting up both the backend and frontend:

Start the backend server by navigating to the backend directory and running npm start.

Serve the frontend build by deploying it on a service like Netlify or running it locally using:


npm install -g serve
serve -s build
Then open your browser to http://localhost:5000 (or wherever your backend is running).
