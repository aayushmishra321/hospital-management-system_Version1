# 🏥 Hospital Management System (HMS)

A production-grade, full-stack Hospital Management System designed to bridge the gap between patients, receptionists, doctors, and billing departments. 

## 🚀 What We Have Created
This system is a comprehensive web application that digitizes core clinical workflows. It features a strict, accessible design system (clinical teal, solid colors, zero gradients) and robust backend data relations.

### Core Modules:
1. **Design System:** Custom UI component library built from scratch using Tailwind CSS v3, featuring standardized cards, badges, and form inputs.
2. **Patient Registration (Reception):** A secure intake form that captures patient demographics and mandates Digital Personal Data Protection (DPDP) Act consent.
3. **Live Queue Board (Reception):** A real-time data table to monitor walk-in and online appointments, reducing patient wait times.
4. **Consultation Room (Doctor):** A clinical interface for doctors to view patient vitals, record symptoms, and generate digital E-Prescriptions.
5. **Billing Dashboard (Cashier):** A financial hub to track today's revenue, manage pending payments, and generate invoices.

## 🛠️ How It Was Built
This project leverages a modern, scalable MERN-stack architecture:
* **Frontend:** React.js powered by Vite for blazing-fast rendering.
* **Styling:** Tailwind CSS v3 tailored with custom design tokens (Fraunces & Inter fonts, strict clinical color palette).
* **Backend Framework:** Node.js and Express.js providing secure RESTful APIs.
* **Database Layer:** MongoDB with Mongoose ORM, featuring complex schemas (`User`, `Patient`, `Appointment`, `Prescription`, `Bill`).
* **Authentication:** JWT (JSON Web Tokens) combined with bcrypt for secure, role-based access control (RBAC).

## 💡 How It Is Useful
* **For Hospitals:** Eliminates paper trails, reduces administrative bottlenecks, and ensures compliance with modern data privacy laws (DPDP).
* **For Patients:** Streamlines their journey from the waiting room to the pharmacy, ensuring their medical records are accurate and secure.
* **As an Engineering Portfolio Piece:** This system demonstrates a deep understanding of full-stack development, database relational mapping, secure authentication, and the ability to strictly implement a professional UI/UX Design System.