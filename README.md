# ⚖️ JurisDesk

## Legal Consultation & Lawyer-Client Management Platform

JurisDesk is a full-stack web application designed to connect clients with legal professionals through a structured online consultation platform.

The platform provides separate workflows for **Clients, Lawyers, and Administrators**. Clients can discover verified lawyers and request consultations, lawyers can manage their consultation requests and profiles, and administrators can verify lawyers, manage users, monitor platform activity, and view system-level analytics.

The project is built using a modern JavaScript stack with **React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, ImageKit, and REST APIs**.

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Main Objectives](#-main-objectives)
- [User Roles](#-user-roles)
- [Features](#-features)
- [Application Workflow](#-application-workflow)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Backend Architecture](#-backend-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Database Design](#-database-design)
- [Authentication & Security](#-authentication--security)
- [Lawyer Registration Workflow](#-lawyer-registration-workflow)
- [Client Consultation Workflow](#-client-consultation-workflow)
- [Lawyer Verification Workflow](#-lawyer-verification-workflow)
- [Admin Dashboard](#-admin-dashboard)
- [Activity Logging](#-activity-logging)
- [Document Management](#-document-management)
- [Notifications](#-notifications)
- [OTP Verification](#-otp-verification)
- [API Overview](#-api-overview)
- [Environment Variables](#-environment-variables)
- [Prerequisites](#-prerequisites)
- [Local Installation](#-local-installation)
- [Running the Application](#-running-the-application)
- [Testing APIs](#-testing-apis)
- [Development Workflow](#-development-workflow)
- [Validation](#-validation)
- [Error Handling](#-error-handling)
- [Scalability & System Design](#-scalability--system-design)
- [Planned Improvements](#-planned-improvements)
- [Common Issues](#-common-issues)
- [Security Notes](#-security-notes)
- [Contribution](#-contribution)
- [Author](#-author)

---

# 📖 Project Overview

Legal consultation often involves multiple disconnected processes:

- Finding a suitable lawyer
- Checking lawyer credentials
- Requesting a consultation
- Sharing legal information
- Uploading supporting documents
- Managing appointments
- Communicating consultation status
- Maintaining verified professional profiles

JurisDesk brings these workflows into a single platform.

The system contains three major applications/workflows:

```text
                    JurisDesk
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       CLIENT       LAWYER        ADMIN
          │            │            │
          ▼            ▼            ▼
     Find Lawyer   Manage Cases   Verify Lawyers
     Book Consult Manage Requests Manage Users
     Upload Docs  Update Profile  Monitor Activity
     Track Status View Clients    Reports
     Main Objectives

The primary objectives of JurisDesk are:

1->Provide clients with an easy way to find legal professionals.
2->Allow lawyers to create professional profiles.
3->Provide administrator-controlled lawyer verification.
4->Allow clients to request legal consultations.
5->Allow lawyers to approve or reject consultation requests.
6->Provide notifications for important actions.
7->Provide dashboards for clients, lawyers, and administrators.
8->Maintain administrative activity logs.
9->Store uploaded lawyer verification documents securely.
10->Provide a scalable foundation for future features such as Redis, Kafka, payments, Docker deployment, and load balancing.

Client Features

->Client registration
->Client authentication
->Lawyer discovery
->Lawyer profile viewing
->Verified lawyer filtering
->Consultation requests
->Appointment status tracking
->Document upload
->Notifications
->Client dashboard
complete work flow
                     USER
                      │
          ┌───────────┴───────────┐
          │                       │
       CLIENT                   LAWYER
          │                       │
          ▼                       ▼
      Register                Register
          │                       │
          ▼                       ▼
       Login                Verification Pending
          │                       │
          ▼                       ▼
  Browse Lawyers             ADMIN REVIEW
          │                  ┌────┴────┐
          ▼                  ▼         ▼
 Select Lawyer            APPROVE    REJECT
          │                  │
          ▼                  ▼
 Book Consultation       Verified
          │                  │
          └─────────┬────────┘
                    ▼
             Consultation
                    │
             ┌──────┴──────┐
             ▼             ▼
          APPROVED       REJECTED
             │
             ▼
       Client Notified