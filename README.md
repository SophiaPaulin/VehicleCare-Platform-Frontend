Vehicle Care Platform
    Welcome to Vehicle care, your one stop destination for all your car repair needs in India. At Vehicle care, we are committed to bringing you the best in innovation, quality, reliability and transparency. With a presence across the country, we have established ourselves as a leading provider of car repair services, serving a diverse range of clients including workshops, manufacturers, suppliers, corporates, insurers and consumers.

Popular Brands
•	Maruti Suzuki
•	Tata
•	Honda
•	Toyota
•	Hyundai
•	Kia
•	MG
•	Audi
•	Mahindra

User Authentication
1.Account Registration: Users can create an account with a username, email, and password. Account activation via email is required.
2.Login: Registered users can log in to access their travel plans and other features.
3.Account Activation: After registering, users receive an activation email to verify their account.

Vehicle Care Platform

1.Creating a Vehicle Care Platform:

•	After logging in, navigate to the "Vehicle Care" section
•	Fill out the form with your Service, durations, and any other relevant details.
•	Save your services, and it will appear in your dashboard under "Vehicle Care"

2.Booking Services:

•	Use the search feature to find available accommodations at your destination.
•	Review the options and book directly from the platform.

API Endpoints

Authentication

POST /api/auth/login: Log in a user and receive a token.
POST /api/auth/create user: Send a password reset link to the user's email.
POST /api/auth/create brands: Reset the user's password using the token sent via email.

Brands

GET /api/brands/: Get all brands
GET /api/brand/:id: Get a specific brand by ID.

Products

POST /api/products/create: Create a new products
GET /api/products/get all products/:userId: Get products of user by userID 
DELETE /api/products/:productsId/delete: Delete a specific products by ID
PUT /api/products/update/:productId: Update products


Orders

POST /api/orders/create: Create new discovery (requires authentication).
GET /api/orders/:id: Get all orders of specific user (requires authentication).
GET /api/orders/orders: Get all orders
DELETE /api/orders/products/:id: Delete orders by Id (requires authentication).
PUT /api/orders/update/:userId: Update orders (requires authentication).

Tech Stack
Frontend:

o	React.js
o	CSS
o	React Router

Backend:

o	Node.js
o	Express.js
o	MongoDB
o	JWT (JSON Web Tokens)
o	Bcryptjs


Deployment:

Frontend: Netlify
Backend: Render

Deployment

Frontend Repository: https://github.com/SophiaPaulin/vehiclecare
Backend Repository: https://github.com/SophiaPaulin/backend
Frontend: https://sophia-vehicle-care.netlify.app
Backend:https://backend-tvh1.onrender.com

How to Run the Project

Prerequisites
  Node.js
  MongoDB

Clone the Repositories

git clone https://github.com/SophiaPaulin/vehiclecare.git
git clone https://github.com/SophiaPaulin/backend.git

Frontend

1.Navigate to the frontend directory:
  cd travel-planner-frontend

2.Install the dependencies:
  npm install

3.Run the development server:
  npm run dev

Backend

1.Navigate to the backend directory:
  cd travel-planner-backend

2.Install the dependencies:
   npm install

3.Set up environment variables for MongoDB, JWT, Cloudinary, etc.
4.Start the server:
   npm run dev

