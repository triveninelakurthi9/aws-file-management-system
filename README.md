# AWS File Management System

A web-based file management system that allows users to securely upload, store, organize, and manage their files using Amazon Web Services (AWS) S3 as the cloud storage backend. Built with a React.js frontend and a Node.js/Express backend.

> ✅ **Status: Core features complete** — file upload, download, delete, authentication, and browsing are implemented. Production deployment pending.

## Overview

Traditional file storage solutions can be expensive and hard to scale. This project explores building a lightweight, scalable file management system using AWS S3's cloud infrastructure, giving users a simple interface to manage their files without worrying about local storage limitations.

## Features

- Upload files directly to AWS S3 from the browser
- Download files securely from cloud storage
- Delete and manage stored files
- Browse and organize uploaded files in a clean UI
- User authentication and authorization
- Secure, access-controlled file storage
- File metadata tracking (name, size, upload date)

## Tech Stack

**Frontend**
- React.js
- HTML5, CSS3
- Axios (for API requests)

**Backend**
- Node.js
- Express.js
- REST API architecture

**Cloud & Storage**
- AWS S3 (Simple Storage Service)
- AWS SDK for JavaScript

## Project Structure

aws-file-management-system/
├── client/          # React frontend application
│   ├── src/
│   └── public/
├── server/          # Node.js/Express backend
│   ├── routes/
│   └── controllers/
├── .gitignore
├── package.json
└── package-lock.json

## How It Works

1. User uploads a file through the React frontend.
2. The file is sent to the Express backend via a REST API call.
3. The backend uses the AWS SDK to upload the file to an S3 bucket.
4. File metadata is stored and returned to the frontend for display.
5. Users can view, download, or delete files through the interface.

## Getting Started

### Prerequisites
- Node.js and npm installed
- An AWS account with an S3 bucket configured
- AWS access key and secret key

### Installation

Clone the repository:

git clone https://github.com/triveninelakurthi9/aws-file-management-system.git

Install frontend dependencies:

cd client
npm install

Install backend dependencies:

cd ../server
npm install

### Environment Variables

Create a `.env` file in the `server` directory with your AWS credentials:

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_bucket_region
AWS_BUCKET_NAME=your_bucket_name

### Running the Project

Start the backend server:

cd server
npm start

Start the frontend:

cd client
npm start

## Roadmap

- [x] Complete file upload functionality
- [x] Implement file download and delete
- [x] Add user authentication
- [x] Build file browsing/organization UI
- [x] Add file preview support
- [ ] Deploy to production

## Contributing

This is a personal learning project, but suggestions, feedback, and contributions are always welcome. Feel free to open an issue or submit a pull request.

## License

This project is open source and available for learning purposes.

## Contact

**Nelakurthi Triveni**
Email: triveninelakurthi5@gmail.com
GitHub: https://github.com/triveninelakurthi9
LinkedIn: https://linkedin.com/in/triveninelakurthi


