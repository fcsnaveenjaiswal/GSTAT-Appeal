````markdown
# GSTAT Appeal Frontend

A modern web application for managing GSTAT appeals built with React, Bootstrap, and Redux.

## Features

- **User Authentication**: Secure login and registration system
- **Appeal Management**: Submit, track, and manage appeals
- **Real-time Status Tracking**: Monitor appeal progress with live updates
- **Document Upload**: Attach supporting documents to appeals
- **User Dashboard**: View all your appeals at a glance
- **Admin Dashboard**: Review and manage all appeals (admin only)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **FAQ Section**: Comprehensive help and support information

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux with Redux Thunk
- **UI Library**: React Bootstrap
- **Styling**: Bootstrap 5 CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Navigation.js
│   └── Footer.js
├── pages/            # Page components
│   ├── Landing.js
│   ├── Login.js
│   ├── Register.js
│   ├── AppealForm.js
│   ├── AppealStatus.js
│   ├── UserDashboard.js
│   ├── FAQ.js
│   └── AdminDashboard.js
├── redux/            # Redux store and actions
│   ├── store.js
│   ├── actions/
│   │   ├── authActions.js
│   │   └── appealActions.js
│   └── reducers/
│       ├── authReducer.js
│       ├── appealReducer.js
│       └── userReducer.js
├── styles/           # Global styles
│   ├── index.css
│   └── App.css
├── App.js           # Main app component
└── index.js         # React entry point
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/fcsnaveenjaiswal/GSTAT-Appeal.git
cd GSTAT-Appeal
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API endpoint:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=30000
```

4. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

### `npm start`
Runs the app in development mode.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## Pages Overview

### Landing Page
- Hero section with call-to-action buttons
- Features showcase
- Quick navigation options

### Authentication
- **Login**: Sign in with email and password
- **Register**: Create new account with validation

### Appeal Management
- **Submit Appeal**: Multi-step form for creating appeals
  - Title and category selection
  - Priority level setting
  - Detailed description
  - Document upload capability

- **Appeal Status**: Track individual appeal progress
  - Real-time status updates
  - Progress indicators
  - Document history

- **User Dashboard**: Central hub for users
  - Statistics cards showing appeal counts
  - Table view of all appeals
  - Quick access to create new appeals

### Admin Features
- **Admin Dashboard**: Complete appeal management interface
  - Overview statistics
  - All appeals list
  - Review modal for approving/rejecting appeals
  - Notes and comments system

### Support
- **FAQ Page**: Comprehensive help documentation
- **Contact Information**: Support contact details

## Redux State Management

### Auth State
```javascript
{
  user: {},
  token: string,
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null
}
```

### Appeal State
```javascript
{
  appeals: [],
  currentAppeal: {},
  loading: boolean,
  error: string | null,
  successMessage: string | null
}
```

### User State
```javascript
{
  userProfile: {},
  loading: boolean,
  error: string | null
}
```

## API Endpoints Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Appeals
- `GET /api/appeals` - Fetch all appeals
- `POST /api/appeals` - Create new appeal
- `GET /api/appeals/:id` - Get specific appeal
- `PUT /api/appeals/:id` - Update appeal
- `DELETE /api/appeals/:id` - Delete appeal

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Token is stored in localStorage
4. All subsequent API requests include token in Authorization header
5. Redux state tracks authentication status

## Styling

The project uses Bootstrap 5 for responsive design and custom CSS for additional styling:

- Global styles in `src/styles/index.css`
- Component-specific styles in `src/styles/App.css`
- Bootstrap utility classes for quick styling

## Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## Environment Variables

Create a `.env.local` file with the following variables:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=30000
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@gstatappeal.com or call +1 (555) 123-4567

## Future Enhancements

- [ ] Email notifications
- [ ] Real-time notifications using WebSockets
- [ ] Advanced search and filtering
- [ ] Appeal templates
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Export appeals as PDF
- [ ] Payment integration
````
