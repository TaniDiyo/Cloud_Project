# Student Budget Planner & Limit Monitor

>1. Introduction

This project is developed as part of the Version Control Systems course to demonstrate practical usage of Git Bash and GitHub.

The application chosen is Student Budget Planner & Limit Monitor, a MERN stack–based project. The primary focus of this assignment is Git repository management, including branching, merging, conflict resolution, and documentation — not application complexity.

2. Project Description

Student Budget Planner & Limit Monitor helps users plan their monthly budget and monitor category-wise spending limits.
Unlike traditional expense trackers, this system focuses on:
Budget planning before spending
Monitoring limit usage
Preventing overspending using alerts

This project was selected to practically demonstrate version control workflows using Git.

3. Technology Stack & Project Working
Technology Stack

The Student Budget Planner & Limit Monitor is developed using the MERN stack along with modern frontend tools. The technology stack is chosen to ensure modular development, scalability, and efficient version control demonstration.

Frontend Technologies

React.js (Vite) – Component-based UI development

Tailwind CSS – Responsive and utility-first styling

Recharts – Data visualization for budget usage and analytics

Framer Motion – Smooth UI animations and transitions

Backend Technologies

Node.js – JavaScript runtime environment

Express.js – RESTful API development

Database

MongoDB – NoSQL database for storing users, budgets, and expenses

Mongoose – Schema-based data modeling

Authentication & Security

JWT (JSON Web Tokens) – Secure user authentication

bcryptjs – Password hashing

CORS – Secure cross-origin requests

Version Control

Git (Git Bash) – Local version control

GitHub – Remote repository hosting and collaboration

Project Working

The project follows a client–server architecture and a feature-based Git workflow.

User Authentication

Users register and log in using secure JWT-based authentication.

Authenticated users can access protected routes such as Dashboard and Budget Planning.

Budget Planning

Users set a monthly budget and allocate category-wise limits.

Budget data is stored in MongoDB and retrieved based on the current month and year.

Expense Logging

Expenses are added with amount, category, and date.

Each expense is validated against the remaining category limit.

Budget Monitoring

The system calculates:

Total spent amount

Remaining balance

Category-wise usage percentage

Visual indicators (progress bars and colors) show budget health:

Green/Teal – Safe

Yellow – Warning

Red – Limit exceeded

Dashboard Visualization

Displays budget summaries and category usage.

Helps users understand spending patterns and control overspending.

Version Control Workflow

Development is carried out using multiple Git branches:

feature for new features

test for validation

bugfix for corrections

experiment for experimental changes

All branches are merged into main, including demonstration of a merge conflict and its resolution.
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/fb9f7884-ad38-4472-aa64-f636bd3356b0" />



4. Project Directory Structure
   MySpendManager/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
│── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   └── App.jsx
│
│── public/
│── screenshots/
│── README.md
│── package.json
│── vite.config.js
│── tailwind.config.js

5. Git Repository Initialization

The repository was initialized locally using Git Bash.

Commands Used
git init
git branch -M main
git remote add origin https://github.com/Srinivas8985/SmartBudgetPlanner.git
<img width="1519" height="803" alt="Screenshot 2025-12-27 104039" src="https://github.com/user-attachments/assets/ac9da59f-897d-4c4d-a700-0b137ff24417" />
<img width="1046" height="189" alt="Screenshot 2025-12-27 104136" src="https://github.com/user-attachments/assets/4bf577fb-5fce-4c4b-9d8c-bf9c00ae54ea" />
<img width="1198" height="869" alt="Screenshot 2025-12-27 104259" src="https://github.com/user-attachments/assets/ef910669-6b5a-42a1-94e7-80c23e1f978c" />
<img width="889" height="222" alt="Screenshot 2025-12-27 104449" src="https://github.com/user-attachments/assets/78e71228-ceba-49e2-b5ad-c2a54df678e6" />

6. Branching Strategy

The following branches were created to demonstrate feature-based development:

Branch Name	Purpose
main	Stable production-ready code
feature	Feature development
test	Testing & validation
bugfix	Bug fixing
experiment	Experimental changes
Commands Used
git checkout -b feature
git checkout -b test
git checkout -b bugfix
git checkout -b experiment
<img width="736" height="558" alt="Screenshot 2025-12-27 104750" src="https://github.com/user-attachments/assets/91c23759-4789-4020-88d8-3876a37a8505" />
<img width="1085" height="699" alt="image" src="https://github.com/user-attachments/assets/87be9224-500c-4266-b502-1a44c14a71a1" />

7. Commit History

The project contains 14+ meaningful commits created incrementally

Sample Commands
git status
git add .
git commit -m "Meaningful commit message"
git log --oneline
<img width="878" height="179" alt="image" src="https://github.com/user-attachments/assets/36d056d1-f1df-4217-8cbc-a637904818ed" />
<img width="866" height="194" alt="image" src="https://github.com/user-attachments/assets/5b8f8f65-eb31-44a0-9d88-1456e4f8d826" />
<img width="910" height="213" alt="image" src="https://github.com/user-attachments/assets/c135dfb4-c23c-44a0-8f07-4d4f2339aaa4" />
<img width="760" height="115" alt="image" src="https://github.com/user-attachments/assets/07adf897-6836-4ac7-8e97-6c434b92f81b" />
<img width="729" height="115" alt="image" src="https://github.com/user-attachments/assets/b1d516d0-98bb-40bf-9e08-ed1bb6d41718" />


8. Merging Branches

All branches were merged into main one by one.

Commands Used
git merge feature
git merge test
git merge bugfix

<img width="869" height="730" alt="image" src="https://github.com/user-attachments/assets/fd114c53-50fc-470e-a2b8-ec4541c797ff" />

9. Merge Conflict Demonstration & Resolution
   
A merge conflict was intentionally created while merging the experiment branch.
Cause of Conflict
The same file (Dashboard.jsx) was modified independently in both:
main branch
experiment branch
Conflict Output
git merge experiment

<img width="822" height="274" alt="image" src="https://github.com/user-attachments/assets/a07146c7-d872-4ca3-8aa6-6b98c6eb55cf" />

Conflict Resolution

The conflict was manually resolved by editing the file and committing the final version.

git add src/pages/Dashboard.jsx
git commit -m "Resolved merge conflict between main and experiment branch"
<img width="728" height="66" alt="image" src="https://github.com/user-attachments/assets/3d2bb8b6-6af6-42b7-93d0-2a9886e81a09" />

10. GitHub Remote Operations

The repository was pushed and synchronized with GitHub.

Commands Used
git push
git push origin feature test bugfix experiment
<img width="1909" height="964" alt="image" src="https://github.com/user-attachments/assets/3dea8a69-013e-4cea-8d80-1b63fd9add15" />
<img width="1919" height="974" alt="image" src="https://github.com/user-attachments/assets/16f6f0e8-4b9c-4a8a-b333-4db5193a3332" />
<img width="1903" height="765" alt="image" src="https://github.com/user-attachments/assets/8465b9c6-0bde-43b2-9eee-8d55ea9369a3" />

11. Challenges Faced

Understanding branch-based workflows

Handling merge conflicts correctly

Resolving conflicts without losing changes

Maintaining clean commit history

These challenges improved practical understanding of Git.

12. Conclusion

This project successfully demonstrates:

Git repository initialization

Branch creation and management

Feature-based development

Merge operations

Merge conflict handling and resolution

GitHub remote repository usage
