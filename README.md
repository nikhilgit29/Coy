# Coy Discover 💕

A full-stack, mobile-first dating discovery application built with **React, Framer Motion, Tailwind CSS, Express, SQLite, and Prisma ORM**, meticulously adhering to the signature **Coy** visual design language.

---

## 🎨 Visual Design Specifications

The application strictly implements the distinctive Coy aesthetic:

- **Clean White Canvas**: Focused, centered mobile-first viewport layout (`max-w-md`).
- **Signature Branding**:
  - `coy.` logo at top left with hot pink dot.
  - Settings & Demo Controls at top right.
- **Neo-Brutalist & Soft-Pop Aesthetic**:
  - Crisp `2px` black borders (`#17141E`).
  - Solid, offset black drop shadows (`box-shadow: 4px 4px 0px #17141E`).
  - Rounded corners (`rounded-2xl` & `rounded-3xl`).
  - Dashed borders for empty states (`border-2 border-dashed`).
- **Exact Color Palette**:
  - **Pink (Primary / Likes)**: `#FF3680`
  - **Lavender (Secondary / Matches)**: `#E8DFFF`
  - **Light Pink (Canvas / Splash)**: `#FCE4EC`
  - **Yellow (Accents & Highlights)**: `#FFE45C`
  - **Black (Ink & Borders)**: `#17141E`
  - **White**: `#FFFFFF`
- **Typography**: Bold, rounded typography powered by *Plus Jakarta Sans*.

---

## ✨ Key Features

1. **3-Second Animated Splash Screen**:
   - Soft pink background (`#FCE4EC`).
   - Centered hot pink heart with a smooth continuous heartbeat scale animation.
   - Minimalist Coy logo below the heart.
   - Automatically transitions to the main application after 3 seconds.

2. **Streamlined Navigation (2 Tabs Only)**:
   - **Home**: Intentionally clean and minimalist, preserving Coy branding and navigation.
   - **Discover**: Hosts both the discovery card swiper and the mutual matches gallery.
   - *Matches is strictly accessible inside Discover, not as a 3rd bottom navigation tab.*

3. **Smooth Swipe Deck**:
   - One profile card at a time with smooth stacked deck preview.
   - Mobile drag gestures powered by **Framer Motion** (`drag="x"`).
   - Visual stamp badges: "LIKE" (hot pink) and "PASS" (black ink) appear dynamically as cards are dragged.
   - Tactile desktop action buttons with press animations.
   - Never shows an already-swiped profile again.
   - Friendly empty state when all cards are exhausted.

4. **Mutual Matching & Strict Privacy**:
   - Matches trigger **ONLY** when both people have liked each other.
   - **Privacy Guarantee**: Incoming one-sided likes are 100% confidential and never exposed in the API or UI.
   - "It's a Match!" celebratory modal appears immediately upon mutual match with overlapping profile photos, hot pink badge, and navigation options.
   - **Matches Section**: Displays all mutual matches with detailed profile views.

5. **Demo Ready**:
   - 30 diverse mock profiles seeded with realistic bios, colleges, cities, and interests.
   - 10 profiles are pre-seeded to have already liked the demo user (e.g., Maya Patel, Chloe Rodriguez, Julian Rivera), allowing real mutual matches during testing.
   - Integrated **Settings Modal** with a one-click **"Reset Swipes & Matches"** button.

---

## 🏗️ Project Architecture

```
coy-discover/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── BottomNav.jsx       # 2-tab navigation bar
│   │   │   ├── CoyLogo.jsx         # Signature 'coy.' logo with pink period
│   │   │   ├── Header.jsx          # Header with logo & settings trigger
│   │   │   ├── Icons.jsx           # Zero-dependency vector SVG icons
│   │   │   ├── MatchModal.jsx      # Celebratory 'It's a match!' popup
│   │   │   ├── ProfileCard.jsx     # Framer Motion drag card with badges
│   │   │   ├── SettingsModal.jsx   # Demo info & swipe reset
│   │   │   ├── SplashScreen.jsx    # 3-second heartbeat splash screen
│   │   │   └── SwipeButtons.jsx    # Desktop Like/Pass buttons
│   │   ├── pages/
│   │   │   ├── DiscoverPage.jsx    # Swipe deck & Matches gallery tabs
│   │   │   └── HomePage.jsx        # Blank minimal home page
│   │   ├── services/
│   │   │   └── api.js              # REST client
│   │   ├── App.jsx                 # App controller & layout
│   │   ├── index.css               # Tailwind & custom neo-brutalist styles
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js          # Coy palette & offset shadows
│   └── vite.config.js              # Dev proxy to backend
│
├── backend/
│   ├── controllers/
│   │   ├── feedController.js       # GET /api/feed (filtered & privacy safe)
│   │   ├── matchController.js      # GET /api/matches & reset
│   │   └── swipeController.js      # POST /api/swipe (mutual match check)
│   ├── prisma/
│   │   ├── dev.db                  # SQLite database
│   │   ├── schema.prisma           # Prisma schema (User, Profile, Swipe, Match, IncomingLike)
│   │   └── seed.js                 # 30 profiles & 10 secret incoming likes
│   ├── routes/
│   │   └── apiRoutes.js            # Express router
│   ├── services/
│   │   └── db.js                   # Prisma singleton
│   ├── test-api.js                 # Verification test suite
│   ├── package.json
│   └── server.js                   # Express server with CORS
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- npm

### 1. Backend Setup & Run

```bash
cd backend

# Install dependencies (if not already installed)
npm install

# Push schema to SQLite & seed 30 profiles
npx prisma db push
node prisma/seed.js

# Run test suite to verify endpoints & privacy rules
node test-api.js

# Start backend server
npm run dev
# Running on http://localhost:5000
```

### 2. Frontend Setup & Run

```bash
cd frontend

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
# Running on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/feed` | `GET` | Returns profiles not yet swiped by the demo user. Strict privacy: never exposes incoming likes. |
| `/api/swipe` | `POST` | Accepts `{ profileId, action: "LIKE" \| "PASS" }`. Persists swipe. If LIKE and mutual, creates match and returns `{ isMatch: true, matchedProfile }`. |
| `/api/matches` | `GET` | Returns list of mutual matches. |
| `/api/reset` | `POST` | Clears all swipes and matches for the demo user, restoring the full deck. |
| `/api/user` | `GET` | Returns the logged-in demo user profile (Alex, 22). |

---

## 🧪 Verification & Automated Tests

Run the included verification test suite:

```bash
cd backend
node test-api.js
```

Verifies:
- 30 profiles loaded in SQLite.
- Feed excludes secret incoming like fields.
- One-sided likes persist without creating false matches.
- Mutual likes create persisted `Match` entries and return `isMatch: true`.
- Matches view only returns verified mutual matches.
