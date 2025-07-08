# Neural-Ninjas-
HackOrbit Hackathon
# HackOrbit Project
Started on 8th July, 11:00 AM IST (as per rulebook).

Team: Neural Ninjas   

Any UI template used: None

🗳 NextGen Ballot – A Secure Digital Voting Platform
NextGen Ballot is a modern, full-stack, secure and responsive digital voting web application built for hackathons and real-world scalability. It allows users to register, verify via Aadhaar & OTP (mocked), vote securely, and enables administrators to track total and remaining votes live.

**CHECKPOINT 1**

**📁 Files Uploaded:**

**1️ index.html**

Serves as the main landing page of the application

Includes a hero section, an overview of the platform, and a step-by-step explanation of how it works

Features clean navigation and clear call-to-action buttons

Designed to be responsive and visually appealing using custom icons and layout

**2️ login.html**

Contains a minimal and user-friendly login interface for voters

Inputs for email and password

Styled to match the homepage for design consistency

Backend integration using Node.js and Express is planned for authentication

**3️ style.css**

Custom CSS built from scratch (no external frameworks used)

Manages the layout, color scheme, typography, and responsiveness across all pages

Ensures a cohesive and modern look using the 'Inter' font from Google Fonts

Supports all HTML pages with consistent UI elements like navbars, buttons, and sections

**4️ Final_PPT.pdf**

Final project presentation in PDF format

Summarizes the concept,problem statement,approach, goals, tech stack, feature highlights, and project flow

Prepared for judges and mentors to quickly review the project vision and progress

**CHECKPOINT 2**

**index.html (Updated)**

-Acts as the landing page for the platform

-Includes hero section, feature highlights, and step-by-step voting guide

-Clean navigation with responsive layout and CTA buttons

-Fully styled with style.css, no external UI templates used

**login.html (Updated - Advanced Aadhaar + OTP Flow)**

-Handles voter authentication using Aadhaar number and phone

-CAPTCHA integrated via backend API (/captcha)

-OTP generation and verification via /send-otp and /verify-otp

-User info displayed after successful OTP generation

-Real-time error handling, input validations, and 15-min OTP countdown

-Uses fetch() with session support for secure API communication

-Clean, accessible, and fully responsive

**style.css (Updated)**

-Custom CSS styling for both index and login pages

-Manages layout, typography, spacing, buttons, and responsive design

-Google Fonts (Inter) used for consistent modern UI

-No frameworks like Bootstrap used — fully handwritten styling

**CHECKPOINT 3**

**style.css – Styling and Layout (In Progress)**

-This file is responsible for the visual design and responsiveness of the platform

-Currently includes styles for:

-Header navigation and buttons

-Hero section layout and typography

-"About" and "How It Works" sections using modern grid-based layouts

-Footer structure and styling

-Login and verification forms (basic structure, spacing, and responsiveness)

-Fonts, colors, spacing, and transitions have been partially implemented

-Responsive behavior has been initiated for mobile viewports

-Additional styling (form animations, mobile menu, admin panel, etc.) is still under development

-No external libraries used; all styling is written in vanilla CSS

**index.html – Main Landing Page**

-Serves as the homepage of the NextGen Ballot voting platform

-Includes a responsive navigation bar with links to: Home, About, How It Works, Login, and Admin

-Features a structured hero section with platform overview, tagline, and call-to-action buttons

-Clearly explains project value through an About section with three highlighted features

-Outlines the user journey in a step-by-step format in the How It Works section

-Footer section contains quick links and contact details

-Uses semantic HTML5 structure and follows accessibility standards

-Connected to shared style.css for consistent layout and design

-Includes script.js and admin-login.js placeholders for future functionality

-Fully responsive and optimized for desktop and mobile viewports

**CHECKPOINT 4**

1. **Authentication System (login.html + script.js)**
   - Added input fields for Aadhaar number, Voter ID, and mobile number
   - Integrated CAPTCHA validation and OTP input
   - Included error messages and timer functionality for OTP resend

2. **Complete Styling (styles/styles.css)**
   - Enhanced mobile responsiveness
   - Styled all sections: navigation, hero, features, login, admin dashboard
   - Designed CAPTCHA, OTP, buttons, modals, and candidate cards

3. **Admin Panel (admin.html + dashboard logic)**
   - Created admin login form
   - Built admin dashboard with:
     - Total votes & unique voters count
     - Candidate-wise vote stats (dynamic)
     - Reset voting data feature with confirmation modal

4. **Updated index.html (Home Page)**
   - Added hero, about, and how-it-works sections
   - Linked navigation and CTA buttons to login/admin pages

5. **Dependencies**
   - Uploaded JSON files (e.g., `package.json`) for dependency tracking (if backend/API simulated)

**CHECKPOINT 5**
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

