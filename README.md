# Customer Website

Next.js customer-facing website for the marketing platform.

## Features

- **Gallery Page**: Browse all gallery items
- **Gallery Detail**: View individual gallery items with full details
- **About Us**: Company and team information
- **Contact**: Contact information and form
- **Static Site Generation (SSG)**: Pages built at build time
- **Incremental Static Regeneration (ISR)**: Automatic page updates every 60 seconds

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running on port 8080

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. Run Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Pages

- `/` - Home page
- `/gallery` - Gallery listing
- `/gallery/[id]` - Gallery item detail
- `/about` - About us page
- `/contact` - Contact page

## How ISR Works

This website uses Incremental Static Regeneration (ISR):
- Pages are built statically at build time
- Pages automatically revalidate every 60 seconds
- When data changes in the backend, pages will update in the background
- Users always see fast, static pages

## Project Structure

```
app/
├── components/        # Reusable components
│   ├── Navbar.tsx
│   └── Footer.tsx
├── gallery/          # Gallery pages
│   ├── page.tsx      # Gallery listing
│   └── [id]/
│       └── page.tsx  # Gallery detail
├── about/
│   └── page.tsx      # About page
├── contact/
│   └── page.tsx      # Contact page
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── globals.css       # Global styles
```

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ISR (Incremental Static Regeneration)
