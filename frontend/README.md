
# Pin Sharing App

## Overview

The Pin Sharing App allows users to create, share, and view pins. Users can also update their pins and share them with others. The application uses OAuth for authentication via Google, ensuring secure and easy sign-in.

## Features

- **Create Pins**: Users can create and save new pins with titles, descriptions, and images.
- **Share Pins**: Users can share their pins with others, making them visible to anyone.
- **View Pins**: Users can browse and view pins shared by others.
- **Update Pins**: Users can update the details of their pins, including title, description, and images.

## Authentication

- **OAuth with Google**: Users can sign in using their Google accounts, providing a seamless and secure authentication experience.

## Technologies Used

- **React**: The frontend of the application is built using React, providing a dynamic and responsive user interface.
- **Sanity**: The backend is powered by Sanity, a headless CMS that manages content and provides a flexible and scalable data management solution.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Google account for OAuth authentication.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhay1704/pinnix.git
   cd pin-sharing-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your Google OAuth client ID and Sanity project ID:
     ```
        REACT_APP_CLIENT_ID=your-google-client-id
        REACT_APP_CLIENT_SECRET=your-google-client-secret
        REACT_APP_SANITY_PROJECT_ID=your-sanity-project-id
        REACT_APP_SANITY_TOKEN=your-sanity-token
        REACT_APP_UNSPLASH_CLIENT=yoursplashclientid
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to use the app.

## Contributing

Feel free to submit issues and pull requests. If you have suggestions or improvements, please open an issue to discuss them.


## Contact

For questions or feedback, you can reach out to:
- **Email**: abhaypratapninth@gmail.com
- **GitHub**: [abhay1704](https://github.com/abhay1704)
