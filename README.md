# User Matters UI

A modern React TypeScript application for managing customer matters with role-based access control. Built with Vite, Redux Toolkit, and Tailwind CSS.

## Features

- 🔐 **Authentication & Authorization** - Login/signup with JWT tokens and role-based access
- 👥 **User Management** - Admin can manage customers, customers can manage their own matters
- 📋 **Matter Management** - Create, update, delete, and track matters with different states
- 🎨 **Modern UI** - Clean, responsive interface built with Tailwind CSS
- 🚀 **Fast Development** - Powered by Vite for lightning-fast builds and HMR
- 🧪 **Testing Ready** - Configured with Jest and React Testing Library

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Code Quality**: Trunk (linting and formatting)

## Prerequisites

- Node.js 22.16.0 or higher
- npm or yarn package manager
- Backend API running (see API_URL configuration below)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-matters-ui
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Replace the URL with your backend API endpoint.

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

Built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication-related components
│   ├── common/         # Shared components (Layout, Header, etc.)
│   └── dashboard/      # Dashboard-specific components
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useCustomers.ts # Customer management hook
│   └── useMatters.ts   # Matter management hook
├── pages/              # Page components
├── store/              # Redux store configuration
│   ├── api/           # API client and endpoints
│   └── slices/        # Redux slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## User Roles & Permissions

### Admin Users
- View and manage all customers
- Create, edit, and delete customers
- View and manage all matters
- Create matters for customers

### Customer Users
- View and manage their own profile
- View and manage their own matters
- Cannot access customer management features

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Code Quality

This project uses [Trunk](https://trunk.io/) for code quality and consistency:

- **Prettier** for code formatting
- **ESLint** for code linting
- **TypeScript** for type checking
- **Various security scanners** (checkov, osv-scanner, trufflehog)

To run checks manually:
```bash
trunk check
```

To format code:
```bash
trunk fmt
```

## API Integration

The frontend expects a REST API with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user profile
- `PUT /auth/profile` - Update user profile

### Customers (Admin only)
- `GET /customers` - List all customers
- `POST /customers` - Create customer
- `GET /customers/:id` - Get customer details
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Matters
- `GET /matters` - List matters (all for admin, own for customers)
- `POST /matters` - Create matter
- `PUT /matters/:id` - Update matter
- `DELETE /matters/:id` - Delete matter
- `GET /customers/:id/matters` - Get customer matters
- `POST /customers/:id/matters` - Create matter for customer

## Deployment

### Using Vite Preview

```bash
npm run build
npm run preview
```

### Using Static Hosting

After running `npm run build`, deploy the `dist/` folder to any static hosting service:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your repository and set build command to `npm run build`
- **AWS S3**: Upload `dist/` contents to an S3 bucket with static hosting enabled
- **GitHub Pages**: Use GitHub Actions to build and deploy

### Environment Variables for Production

For production deployment, ensure these environment variables are set:

```env
VITE_API_URL=https://your-api-domain.com/api
```

## Development Guidelines

### Component Structure
- Use functional components with TypeScript
- Implement proper error boundaries
- Follow the established folder structure
- Use custom hooks for business logic

### State Management
- Use Redux Toolkit for global state
- Keep component state local when possible
- Use proper TypeScript types for all state

### Styling
- Use Tailwind CSS classes
- Follow the established design patterns
- Ensure responsive design on all components

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check if `VITE_API_URL` is correctly set
   - Ensure the backend API is running
   - Verify CORS settings on the backend

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run build`

3. **Authentication Issues**
   - Check browser's localStorage for auth tokens
   - Verify JWT token format and expiration
   - Ensure API returns correct user data

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Verify API responses in Network tab
3. Ensure all environment variables are set correctly
4. Check that the backend API is compatible with expected endpoints


## License

This project is licensed under the MIT License - see the LICENSE file for details.