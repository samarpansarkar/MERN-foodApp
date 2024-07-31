

export const NODE_ENV = '' //development

export const BASE_API = NODE_ENV === 'development' ? "http://localhost:4444" : "https://mern-foodapp-1.onrender.com"
export const STRIPE_REDIRECT_URL = NODE_ENV === 'development' ? "http://localhost:5173" : "https://mern-food-app-one.vercel.app/"

// export const BASE_API = "https://mern-foodapp-1.onrender.com"
