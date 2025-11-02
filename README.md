# 🎯 Performance Evaluation System (PES)

Performance evaluation system developed for **CGC**, a modern web application that efficiently manages employee performance evaluations, goals, and activities.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🔐 **Azure AD Authentication**: Integration with Microsoft Azure AD through MSAL for secure authentication
- 📊 **Evaluation Management**: Creation and administration of annual performance evaluations
- 🎯 **Goal Management**: Definition, tracking, and evaluation of employee goals
- 📝 **Activity Management**: Registration and tracking of activities related to goals
- 💬 **Feedback System**: Comments and feedback to improve performance
- 📈 **Interactive Dashboard**: Visualization of statistics and performance metrics
- 👥 **Roles and Permissions**: Role-based system (Admin/User) with different access levels
- 🔍 **Search and Filtering**: Advanced search and filters for evaluations and goals
- 📱 **Responsive Design**: Interface adaptable to different devices
- ⚡ **Optimized Performance**: Fast loading and smooth user experience

## 🛠️ Technologies

### Core
- **React 19**: JavaScript library for building user interfaces
- **TypeScript 5.8**: JavaScript superset with static typing
- **Vite 6**: Ultra-fast build tool and development server

### State and Data
- **TanStack Query (React Query) 5**: Server state management and caching
- **Zustand 5**: Lightweight global state management
- **React Hook Form 7**: Efficient form handling
- **Zod 3**: TypeScript-first schema validation

### UI/UX
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Router DOM 7**: Client-side routing
- **Sonner**: Toast notification system

### Authentication
- **Azure MSAL Browser 4**: Microsoft Authentication Library for Azure AD authentication
- **Azure MSAL React 3**: React hooks for MSAL

### Utilities
- **Lodash 4**: JavaScript utility library
- **React Loading Skeleton**: Skeleton loading components
- **React Modal**: Accessible modal components
- **JWT Decode**: JWT token decoding

## 📦 Prerequisites

Before you begin, make sure you have installed:

- **Node.js** >= 18.12 (recommended: LTS version)
- **npm** or **yarn** as package manager
- An **Azure AD** account configured with a registered application
- Access to the evaluation system **backend API**

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/performance_evaluation_system_FE.git
cd performance_evaluation_system_FE
```

2. **Install dependencies**

```bash
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Azure AD Configuration
VITE_CLIENT_ID=your-azure-ad-client-id
VITE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
VITE_API_SCOPES=api://your-api-scope/.default
VITE_REDIRECT_URI=http://localhost:5173

# API Configuration
VITE_API_PES_URL=https://your-api-url.com/api
VITE_API_BASE_URL=https://your-api-url.com/api
```

### Obtaining Azure AD Credentials

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Select your application or create a new one
4. Copy the **Application (client) ID** → `VITE_CLIENT_ID`
5. Copy the **Directory (tenant) ID** → use it in `VITE_AUTHORITY`
6. In **Expose an API**, configure the scopes → `VITE_API_SCOPES`
7. In **Authentication**, add the redirect URI → `VITE_REDIRECT_URI`

## 💻 Usage

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Mode

Build the project for production:

```bash
npm run build
```

The build will be in the `dist/` folder. To preview:

```bash
npm run preview
```

### Linting

Run the linter to check the code:

```bash
npm run lint
```

## 📁 Project Structure

The project follows the **Feature-Sliced Design (FSD)** architecture:

```
src/
├── app/                 # Application configuration
│   ├── boundaries/      # Error boundaries
│   ├── layout/          # Main layout
│   ├── providers/       # Global providers (Query, Router)
│   └── router/          # Route configuration
│
├── entities/            # Business entities
│   ├── activity/        # Activities
│   ├── evaluation/      # Evaluations
│   ├── goal/            # Goals
│   └── user/            # Users
│
├── features/            # Specific features
│   ├── activityCard/    # Activity cards
│   ├── activityForm/    # Activity forms
│   ├── authLogin/       # Authentication
│   ├── goalCard/        # Goal cards
│   ├── goalForm/        # Goal forms
│   └── ...
│
├── pages/               # Application pages
│   ├── activities/      # Activities page
│   ├── goals/           # Goals page
│   ├── home/            # Home page
│   └── login/           # Login page
│
├── shared/              # Shared code
│   ├── api/             # API client and configuration
│   ├── auth/            # Authentication logic
│   ├── components/      # Reusable components
│   ├── constants/       # Global constants
│   ├── lib/             # Utilities and helpers
│   └── store/           # Global state (Zustand)
│
├── widgets/             # Complex widgets
│   ├── dashboard/       # Main dashboard
│   ├── evaluationsInfo/ # Evaluation information
│   ├── goalsInfo/       # Goal information
│   └── ...
│
└── main.tsx             # Entry point
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the project for production |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs the linter on the project |

## 🚢 Deployment

The project is configured to deploy to **Azure Static Web Apps** through Azure Pipelines.

### CI/CD Configuration

The `azure-pipelines.yml` file is configured to:
- Install Node.js 18.12
- Configure environment variables
- Install dependencies
- Build the project
- Deploy to Azure Static Web Apps

### Manual Deployment

1. Build the project: `npm run build`
2. The contents of the `dist/` folder should be deployed to your static hosting
3. Make sure to configure environment variables on your hosting platform

## 🤝 Contributing

Contributions are welcome. To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the Feature-Sliced Design architecture
- Keep code typed with TypeScript
- Add comments when necessary
- Follow existing naming conventions
- Run the linter before committing

## 📄 License

This project is private and owned by **CGC**. All rights reserved.

## 👥 Team

Developed by **CGC**

---

⭐ If this project has been useful to you, consider giving it a star on GitHub.
