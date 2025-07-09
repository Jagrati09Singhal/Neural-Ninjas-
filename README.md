## Team: Neural Ninjas
## HackOrbit Hackathon

### HackOrbit Project
Started on 8th July, 11:00 AM IST (as per rulebook).

### Any UI template used: None

## 🗳 NextGen Ballot – A Secure Digital Voting Platform
### NextGen Ballot is a modern, full-stack, secure and responsive digital voting web application built for hackathons and real-world scalability. It allows users to register, verify via Aadhaar & OTP (mocked), vote securely, and enables administrators to track total and remaining votes live.


## Features:

- Aadhaar and Voter ID-based authentication
- CAPTCHA + OTP verification
- Admin Dashboard with live results
- Secure voting with one-vote-per-user logic
- MongoDB integration for persistent storage
- Responsive and intuitive UI



## 🔧 How To Setup Things

### 1. 📦 Install Dependencies
Run the following command in your terminal:
```bash
npm install
```

### 2. MongoDB connection in .env file:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster01.clagshx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01
   PORT=5000
   NODE_ENV=development
   ```
   Replace username and password with your MongoDB Atlas credentials.


### 3. Enable Network Access in MongoDB Atlas

After creating your cluster and getting your connection string, follow these steps:

1. Go to your MongoDB Atlas **Dashboard**.
2. Navigate to **Network Access** under the **Security** section in the left sidebar.
3. Click on **"Add IP Address"**.
4. Select **"Allow Access from Anywhere"** (adds `0.0.0.0/0`).

 > 🔒 For development only.

5. Click **Confirm**.

 > ⚠️ Without this step, your backend won't be able to connect to your MongoDB cluster.



### 4. Backend (Node Server):
Run the following command in your terminal:
```bash
node server.js
```

### 5. Dummy Data For Testing:

- Aadhar: 485663215457,   phone: 4523658795,   voter id: YJK7896554 
- Aadhar: 987465632445,   phone: 4654653157,   Voter id: RWT1236548
   
   Note: OTP will be logged in your terminal, not sent via SMS in this mock version.

### 6. Admin Login:

- Username: admin
- Password: admin123

## Screenshots:

   ### Home Page:
   ![image](https://github.com/user-attachments/assets/95e070e2-b3ee-4fc9-8ca3-0c824150f632)


   ### Login Page:
   ![image](https://github.com/user-attachments/assets/46dacb93-ee48-46e9-bf3e-eb6f5ef335c4)

   ### Admin Page:
   ![image](https://github.com/user-attachments/assets/2ea15bee-8964-4430-918b-e26aaa439cfc)

   
   ### Voting Page:
   ![image](https://github.com/user-attachments/assets/d377b6ff-70c6-49dd-aed5-e058cd4372d7)

   
## Project Demo:
You can view the full working demo of the project here:
### Link:
```bash
https://drive.google.com/file/d/1KfmV1Kvvvw38NoxHbC6DEowiVMQJhzgs/view?usp=drive_link
``` 





 ## CHECKPOINT 1

**📁 Files Uploaded:**

**1️.index.html**

- Serves as the main landing page of the application

- Includes a hero section, an overview of the platform, and a step-by-step explanation of how it works

- Features clean navigation and clear call-to-action buttons

- Designed to be responsive and visually appealing using custom icons and layout

**2️.login.html**

- Contains a minimal and user-friendly login interface for voters

- Inputs for email and password

- Styled to match the homepage for design consistency

- Backend integration using Node.js and Express is planned for authentication

**3️.style.css**

- Custom CSS built from scratch (no external frameworks used)

- Manages the layout, color scheme, typography, and responsiveness across all pages

- Ensures a cohesive and modern look using the 'Inter' font from Google Fonts

- Supports all HTML pages with consistent UI elements like navbars, buttons, and sections

**4️.Final_PPT.pdf**

- Final project presentation in PDF format

- Summarizes the concept,problem statement,approach, goals, tech stack, feature highlights, and project flow

- Prepared for judges and mentors to quickly review the project vision and progress

## CHECKPOINT 2

**index.html (Updated)**

- Acts as the landing page for the platform

- Includes hero section, feature highlights, and step-by-step voting guide

- Clean navigation with responsive layout and CTA buttons

- Fully styled with style.css, no external UI templates used

**login.html (Updated - Advanced Aadhaar + OTP Flow)**

- Handles voter authentication using Aadhaar number and phone

- CAPTCHA integrated via backend API (/captcha)

- OTP generation and verification via /send-otp and /verify-otp

- User info displayed after successful OTP generation

- Real-time error handling, input validations, and 15-min OTP countdown

- Uses fetch() with session support for secure API communication

- Clean, accessible, and fully responsive

**style.css (Updated)**

- Custom CSS styling for both index and login pages

- Manages layout, typography, spacing, buttons, and responsive design

- Google Fonts (Inter) used for consistent modern UI

- No frameworks like Bootstrap used — fully handwritten styling

## CHECKPOINT 3

**style.css – Styling and Layout (In Progress)**

- This file is responsible for the visual design and responsiveness of the platform

- Currently includes styles for:

- Header navigation and buttons

- Hero section layout and typography

- "About" and "How It Works" sections using modern grid-based layouts

- Footer structure and styling

- Login and verification forms (basic structure, spacing, and responsiveness)

- Fonts, colors, spacing, and transitions have been partially implemented

- Responsive behavior has been initiated for mobile viewports

- Additional styling (form animations, mobile menu, admin panel, etc.) is still under development

- No external libraries used; all styling is written in vanilla CSS

**index.html – Main Landing Page**

- Serves as the homepage of the NextGen Ballot voting platform

- Includes a responsive navigation bar with links to: Home, About, How It Works, Login, and Admin

- Features a structured hero section with platform overview, tagline, and call-to-action buttons

- Clearly explains project value through an About section with three highlighted features

- Outlines the user journey in a step-by-step format in the How It Works section

- Footer section contains quick links and contact details

- Uses semantic HTML5 structure and follows accessibility standards

- Connected to shared style.css for consistent layout and design

- Includes script.js and admin-login.js placeholders for future functionality

- Fully responsive and optimized for desktop and mobile viewports

## CHECKPOINT 4

1. **Authentication System (login.html + script.js)**

    - Added input fields for Aadhaar number, Voter ID, and mobile number
 
   - Integrated CAPTCHA validation and OTP input

    - Included error messages and timer functionality for OTP resend

3. **Complete Styling (styles/styles.css)**

    - Enhanced mobile responsiveness

    - Styled all sections: navigation, hero, features, login, admin dashboard

   - Designed CAPTCHA, OTP, buttons, modals, and candidate cards

4. **Admin Panel (admin.html + dashboard logic)**

    - Created admin login form

   - Built admin dashboard with:

     - Total votes & unique voters count

     - Candidate-wise vote stats (dynamic)

      - Reset voting data feature with confirmation modal

5. **Updated index.html (Home Page)**

    - Added hero, about, and how-it-works sections

   - Linked navigation and CTA buttons to login/admin pages

6. **Dependencies**

   - Uploaded JSON files (e.g., `package.json`) for dependency tracking (if backend/API simulated)

## CHECKPOINT 5

## Features

### Voter Module

- CAPTCHA-based secure login

- Responsive and user-friendly homepage

- Candidate information with images and descriptions

- Easy-to-use voting interface

- Confirmation and thank-you message after voting

### Admin Module

- Admin login panel with CAPTCHA and error validation

- Dashboard with real-time statistics:

  - Total votes cast

  - Unique voter count

   - Candidate-wise vote distribution

- Option to reset data with modal confirmation

### UI and UX

- Clean and modern design using CSS Flexbox and Grid

- Fully responsive for mobile, tablet, and desktop views

- Google Fonts integration for professional typography

- Well-structured sections and accessibility consideration


 ### ✅ Update – Day 2

## CHECKPOINT 1

This update introduces significant improvements to both frontend and backend components of the NextGen Ballot platform.

**dashboard.html**

– Developed an admin dashboard for real-time election insights

– Displays total votes, unique voters, and candidate-wise vote stats

– Includes reset functionality with modal confirmation

– Designed with responsive layout using Flexbox and Grid

**thankyou.html**

– Designed a post-voting confirmation page

– Ensures voters receive visual feedback after casting their vote

– Clean and accessible UI consistent with the main application

**result.html**

– Displays final voting results in an organized layout

– Candidate-wise result cards for easy interpretation

– Future-compatible for real-time API-based result fetching

**server.js**

– Node.js + Express backend to support dynamic routes and APIs

– Handles static file serving, admin login, session & CAPTCHA verification

– Integrated vote submission and admin reset endpoints

 **.env**

– Added secure configuration via .env file

– Stores variables like PORT, session secret, and other sensitive keys

– Ensures environment-specific flexibility and security

## CHECKPOINT 2

**Update: vote.html added**

– Voting interface with candidate cards

– Vote button integrated per candidate

– Fully responsive using CSS Grid

– Aligned with platform’s existing design

## CHECKPOINT 3
 
**Uploaded routes/voteRoutes.js and scripts/ folder**

Changes Made:

- Backend API routing (/api/register, /api/vote, etc.)

- Admin and Dashboard client logic scripts for UI interaction

- Captcha, OTP, and vote route handling

## CHECKPOINT 4

**uploaded images/ folder and updated README**

Changes Made:

- Added logo/static images used in UI

- Updated README with screenshots, setup, and usage instructions

