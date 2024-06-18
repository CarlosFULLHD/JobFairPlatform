# Feria del Empleo UCB

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
  - [For Students](#for-students)
  - [For Administrators](#for-administrators)
- [Screenshots](#screenshots)
  - [View All Institutions](#view-all-institutions)
  - [View Institution Details](#view-institution-details)
  - [Zoom Meeting Registration](#zoom-meeting-registration)
  - [Event Calendar](#event-calendar)
- [Installation and Setup](#installation-and-setup)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [License](#license)

## Introduction

The Feria del Empleo UCB project is designed to support students at Universidad Católica Boliviana (UCB) in their transition from university to the workforce by connecting them with potential employers through a virtual job fair platform. The platform allows institutions to present themselves and interact with students via video content, social media links, and Zoom meetings.

## Technologies Used

- **Frontend:** Vue.js with Vuetify for styling
- **Backend:** Express.js
- **Database:** MySQL

## Features

### For Students

- **View Institutions:** Students can browse all participating institutions organized by sectors.
- **Institution Details:** Students can view detailed information about each institution, including videos, social media links, and other relevant information.
- **Zoom Meeting Registration:** Students can register for Zoom meetings hosted by institutions, subject to availability and capacity limits.
- **Event Calendar:** Students can view a calendar of scheduled events and Zoom meeting links.

### For Administrators

- **Manage Institutions:** Administrators can create and manage institution profiles, including descriptions, videos, images (with drag and drop), and social media links.
- **Manage Events:** Administrators can create and schedule Zoom meetings, set capacity limits, and manage event details.

## Screenshots

_Note: Screenshots will be included to showcase the following features._

### View All Institutions

_Screenshot showing the list of all institutions organized by sectors._

### View Institution Details

_Screenshot showing the detailed view of an institution, including videos, social media links, and additional information._

### Zoom Meeting Registration

_Screenshot showing the registration page for Zoom meetings._

### Event Calendar

_Screenshot showing the calendar view with scheduled events and Zoom meeting links._

## Installation and Setup

### Database Setup

1. **Docker Compose Configuration:**

   ```yaml
   version: "3.8"

   services:
     mysql:
       image: mysql:8.0
       container_name: mysql_container
       environment:
         MYSQL_ROOT_PASSWORD: ninofullhd4k1080
         MYSQL_DATABASE: feria
       ports:
         - "3333:3306"
       volumes:
         - db_data:/var/lib/mysql
         - ./db:/docker-entrypoint-initdb.d
       command: --default-authentication-plugin=mysql_native_password
       healthcheck:
         test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
         interval: 10s
         retries: 3
         start_period: 30s
         timeout: 5s

   volumes:
     db_data:
   ```

2. **Build and Run:**
   ```bash
   docker-compose up -d
   ```

### Backend Setup

1. **Install Dependencies:**

   ```bash
   cd back_end
   npm install
   ```

2. **Start Server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install Dependencies:**

   ```bash
   cd front_end
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run serve
   ```
