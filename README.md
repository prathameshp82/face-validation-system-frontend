# Face Validation Frontend

A Next.js web application for face-based user authentication. Users can sign up, log in with credentials, and upload face images for identity validation via a webcam capture interface.

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **react-webcam** for camera capture

## Features

- User registration and JWT-based login
- Webcam face capture and upload
- Protected routes with auth guards
- Face overlay guide for camera positioning
- Dashboard view for authenticated users

## Getting Started

### Prerequisites

- Node.js 18+
- A running [face-validation-system-backend](../face-validation-system-backend) instance

### Setup

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx          # Root layout
  page.tsx            # Home page
  login/              # Login page
  signup/             # Registration page
  dashboard/          # Protected dashboard
  face-capture/       # Webcam face capture page
components/
  AuthGuard.tsx       # Route protection wrapper
  FaceCamera.tsx      # Webcam capture component
  FaceOverlay.tsx     # Face positioning overlay
  InputField.tsx      # Reusable form input
  Navbar.tsx          # Navigation bar
utils/
  api.ts              # API client (login, register, upload)
  auth.ts             # Token management helpers
types/
  index.ts            # TypeScript type definitions
```
