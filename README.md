This is my React, Node.js, Tailwind, Mongodb and Stripe FYP project.

in middleware folder. pls create .env file

and copy the code below

# Authentication
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=your_admin@email.com
ADMIN_PASSWORD=your_secure_password

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/yourdb?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

and then run this code each folder terminal
middleware-  npm run server
backend-  npm run dev
frontend-  npm run dev
