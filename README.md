# Car Rental App

This is a car rental application built using [Next.js](https://nextjs.org/) 13 for both the frontend and backend. The app utilizes Tailwind CSS for styling and Ant Design theme. MongoDB Atlas is used as the database.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm run start`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- **User Registration**: Users need to create an account to access the services.
- **Car Selection**: Users can select any type of car they need from the home page.
- **Booking**: After selecting a car, users are redirected to the booking page where they can select the starting date and time, and ending date and time for their booking. The total hours and total price are displayed.
- **Availability Check**: The app checks if the selected slot is available. If it is, users can proceed to payment.
- **Payment**: After payment is done, users are redirected to their profile page.
- **Profile Page**: Users can check their booking history and cancel bookings if needed.
- **Admin Role**: Users with an admin role can manage users and the booking system.

## Deploy on Vercel

[website](https://car-rental-app-dr-dreams-projects.vercel.app)
