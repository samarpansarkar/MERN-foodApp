# 🍔 SpaNFood - Professional MERN Stack Food Delivery App

> A modern, full-stack food delivery platform built with MongoDB, Express, React, and Node.js

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-38bdf8.svg)](https://tailwindcss.com/)

## ✨ Features

### User Features

- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 🛒 **Shopping Cart** - Real-time cart management with persistent storage
- 💳 **Stripe Integration** - Secure payment processing
- 📦 **Order Tracking** - Real-time order status updates
- 🔔 **Toast Notifications** - Instant feedback for all actions
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Professional interface with Tailwind CSS

### Admin Features

- 📊 **Dashboard** - View all orders and manage inventory
- 🍕 **Product Management** - Add, edit, and remove menu items
- 📦 **Order Management** - Update order statuses
- 📈 **Analytics** - Track sales and performance

### Technical Highlights

- ⚡ **Optimized Performance** - Compression, lazy loading, code splitting
- 🔒 **Enterprise Security** - Helmet, rate limiting, input validation
- 📝 **Professional Logging** - Winston logger with file rotation
- 🛡️ **Error Handling** - Centralized error management
- ✅ **Input Validation** - Express-validator on all endpoints
- 🚀 **Production Ready** - Environment-based configurations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe Account (for payments)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/spanfood-mern.git
cd spanfood-mern
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

4. **Install admin panel dependencies**

```bash
cd ../admin
npm install
```

### Environment Variables

#### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
NODE_ENV=development
```

#### Frontend (constant.js)

```javascript
export const BASE_API = "http://localhost:5000";
export const STRIPE_REDIRECT_URL = "http://localhost:5173";
```

### Running the Application

**Start Backend Server:**

```bash
cd backend
npm run dev
```

**Start Frontend:**

```bash
cd frontend
npm run dev
```

**Start Admin Panel:**

```bash
cd admin
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5174

## 📁 Project Structure

```
MERN-foodApp/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, validation, rate limiting)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions (logger)
│   ├── uploads/         # Image uploads
│   └── server.js        # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components (UI, Navbar, etc.)
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context for state management
│   │   ├── assets/      # Images and static files
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Helper functions
│   │   └── styles/      # Tailwind config
│   └── public/          # Public assets
│
└── admin/
    └── src/             # Admin panel components
```

## 🔧 Tech Stack

### Frontend

- **React 18.3** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Framer Motion** - Animations (ready to use)
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Winston** - Logging
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Express Validator** - Input validation
- **Morgan** - HTTP request logging
- **Compression** - Response compression

## 🔒 Security Features

- ✅ JWT tokens with secure expiration
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Helmet security headers
- ✅ CORS origin validation
- ✅ Rate limiting (auth: 5 per 15min, orders: 10 per hour)
- ✅ Input validation on all endpoints
- ✅ XSS protection
- ✅ Environment-based error messages
- ✅ Centralized error logging

## 📝 API Endpoints

### Authentication

```
POST /api/user/register  - Register new user
POST /api/user/login     - Login user
```

### Food Items

```
GET    /api/food/list         - Get all food items
POST   /api/food/add          - Add food item (admin)
DELETE /api/food/remove/:id   - Remove food item (admin)
```

### Cart

```
POST /api/user/cart/add       - Add item to cart
POST /api/user/cart/remove    - Remove item from cart
POST /api/user/cart/cartData  - Get cart data
```

### Orders

```
POST /api/order/place          - Place new order
POST /api/order/verify         - Verify payment
POST /api/order/myorder        - Get user orders
GET  /api/order/list           - Get all orders (admin)
POST /api/order/status         - Update order status (admin)
```

## 🎨 UI Components

All components are built with **pure Tailwind CSS** (no external CSS files):

- **Button** - 4 variants (primary, secondary, outline, ghost) with loading states
- **LoadingSpinner** - Customizable sizes and colors
- **ToastProvider** - Global toast notifications
- **Navbar** - Sticky header with cart badge and dropdown menu
- **LoginPopup** - Modal with form validation
- **MyOrders** - Order history with status badges and empty states

## 🚀 Deployment

### Backend

1. Set `NODE_ENV=production`
2. Update CORS origins for production domains
3. Deploy to services like Heroku, Railway, or AWS
4. Set up MongoDB Atlas for database

### Frontend

1. Run `npm run build`
2. Deploy to Vercel, Netlify, or any static host
3. Update API URLs in production

## 📊 Features Comparison

| Feature        | Before (College Project) | After (Professional)              |
| -------------- | ------------------------ | --------------------------------- |
| Styling        | External CSS files       | Tailwind CSS                      |
| Security       | Basic/none               | Helmet, rate limiting, validation |
| Logging        | console.log              | Winston with file rotation        |
| Error Handling | Scattered                | Centralized middleware            |
| User Feedback  | Alerts                   | Toast notifications               |
| Loading States | None                     | Professional spinners             |
| Validation     | Client-side only         | Both client & server              |
| Payment        | Buggy ($18 → $1440)      | Fixed and validated               |
| Cart UX        | Inconsistent totals      | Consistent across app             |
| UI/UX          | Basic tutorial look      | Modern, professional              |

## 🐛 Bug Fixes Applied

1. **Stripe Payment Bug** - Fixed 80x multiplication error
2. **Cart Calculations** - Made delivery fees consistent ($2)
3. **Payment Failures** - Improved redirect and error handling
4. **Console Logs** - Removed all debug statements
5. **File Naming** - Fixed "oder" → "order" typo

## 🧪 Testing

The application includes comprehensive unit tests for both backend and frontend.

### Running Tests

**Backend Tests:**

```bash
cd backend
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Generate coverage report
```

**Frontend Tests:**

```bash
cd frontend
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Generate coverage report
```

### Test Coverage

**Backend:**

- Error handling middleware
- Input validation middleware
- Rate limiting configuration
- Authentication logic

**Frontend:**

- UI Components (Button, LoadingSpinner)
- Component variants and states
- User interactions
- Accessibility features

### Testing Stack

- **Backend**: Jest, Supertest
- **Frontend**: Jest, React Testing Library, @testing-library/user-event

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For support, email support@spanfood.com or open an issue in the repository.

---

**Built with ❤️ using the MERN stack**
