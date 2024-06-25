# iNoteBook

iNoteBook is a MERN stack application for managing personal notes. Users can create an account, receive an authentication token, and manage their notes through a web interface. The application handles user authentication and note management using APIs.

## Features

- **User Authentication**: Register and login with email and password.
- **Token-Based Authentication**: Authentication tokens are stored in local storage.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Responsive Design**: Compatible with various devices and screen sizes.

## Installation

1. Clone this repository
2. Install dependencies: npm install
3. Set up environment variables.
4. npm run both - To start frontend and backend

## API Endpoints
- The backend provides the following API endpoints:

- **Auth Routes**

1. POST /api/auth/createuser: Register a new user.
2. POST /api/auth/login: Login a user and receive an auth token.

- **Note Routes**

1. GET /api/notes/fetchallnotes: Get all notes for the authenticated user.
2. POST /api/notes/addnote: Add a new note.
3. PUT /api/notes/updatenote/:id: Update an existing note.
4. DELETE /api/notes/deletenote/:id: Delete a note.

## Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.


