# St. Mathew's Knanaya Catholic Church, Vakathanam

Official parish website for St. Mathew's Knanaya Catholic Church, Vakathanam, under the Archeparchy of Kottayam.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Hosting**: Cloudflare Pages (recommended) or GitHub Pages
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project (see [Firebase Setup Guide](docs/FIREBASE_SETUP.md))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd st-mathews-church

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Firebase config values to .env
# Then start development server
npm run dev
```

### Development

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared UI components
│   └── layout/          # Header, Footer, Layout
├── config/
│   └── firebase.js      # Firebase initialization
├── contexts/
│   └── AuthContext.jsx   # Authentication context
├── hooks/
│   └── useFirestore.js   # Firestore CRUD hooks
├── pages/
│   ├── admin/           # Admin dashboard pages
│   ├── auth/            # Login page
│   ├── directory/       # Parish directory (protected)
│   └── public/          # Public-facing pages
├── App.jsx              # Root component with routing
├── index.css            # Tailwind CSS + custom styles
└── main.jsx             # Entry point
```

## Features

### Public Pages
- Home (hero, announcements, events, quick links)
- About Parish (history, patron saint, diocese info)
- Priests (current and former)
- Mass Timings
- Announcements
- Events (upcoming and past)
- Photo Gallery (with lightbox and category filter)
- Ministries/Organizations
- Contact (form + map)

### Protected Pages
- Parish Directory (search by family name, house name, member, ward, phone)

### Admin Dashboard
- Manage Announcements (CRUD)
- Manage Events (CRUD)
- Upload Gallery Images
- Manage Families (CRUD)
- Manage Members (CRUD)
- Manage Priests (CRUD)
- Manage Ministries (CRUD)
- Update Mass Timings
- Manage Downloads/Documents

## User Roles

| Role | Access |
|------|--------|
| Public Visitor | Home, About, Gallery, Announcements, Events, Contact, Mass Timings, Ministries, Priests |
| Registered Member | All public pages + Parish Directory |
| Administrator | All pages + Admin Dashboard with full CRUD |

## Deployment

### Cloudflare Pages (Recommended)

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables in Cloudflare Pages settings

### GitHub Pages

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## Documentation

- [Firebase Setup Guide](docs/FIREBASE_SETUP.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## License

Private - St. Mathew's Knanaya Catholic Church, Vakathanam
