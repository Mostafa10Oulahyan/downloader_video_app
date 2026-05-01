# 🚀 Premium Video Downloader Pro

A stunning, high-converting SaaS video downloader with glassmorphism UI, mesh gradients, and premium micro-interactions. Built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, and Supabase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Premium Features

### 🎨 **Ultra-Modern UI/UX**
- **Glassmorphism Effects** - Frosted glass cards with backdrop blur
- **Mesh Gradient Background** - Dynamic dark indigo/slate gradients
- **Grainy Texture Overlay** - Subtle noise for premium feel
- **Animated Blobs** - Floating gradient spheres with pulse animations
- **Glow Effects** - Glowing borders on focus with box-shadow transitions

### 🎬 **Download Features**
- **Video Info Display** - Thumbnail, title, duration with slide-down animation
- **Multiple Resolutions** - 1080p, 720p, 480p, Audio only
- **Format Selection** - MP3 and MP4 with animated toggle
- **Progress Tracking** - Real-time download progress
- **Copy to Clipboard** - One-click URL paste with success toast

### 🔥 **Micro-Interactions**
- ✅ Loading skeletons during fetch
- ✅ Toast notifications (Sonner)
- ✅ Smooth Framer Motion animations
- ✅ Hover effects on all cards
- ✅ Scale transitions on buttons
- ✅ Pulse animation on Pro plan button

### 🏆 **Trending Section**
- Small cards showing popular downloads
- Icon animations on hover
- Real-time download counts

### 💳 **Pricing Section**
- **Most Popular Badge** - Highlighted Pro plan
- **Pulse Glow Animation** - Attention-grabbing CTA button
- **Feature Comparison** - Clear FREE vs PRO benefits
- **3D Card Effect** - Pro card scales up on desktop

### 🔐 **Authentication System**
- **Smart Login/Register** - Beautiful auth pages
- **Form Validation** - Real-time field validation
- **Password Strength** - Visual strength indicator
- **Email Verification** - Supabase Auth integration
- **Social Login UI** - Google & GitHub (ready for integration)
- **Remember Me** - 30-day session persistence

### 📊 **Database & Backend**
- **Supabase PostgreSQL** - Fully relational database
- **Usage Limits** - 3 downloads/month (FREE), Unlimited (PRO)
- **Auto-Reset** - Monthly limit reset system
- **Download History** - Complete audit trail
- **Payment Tracking** - PayPal integration ready

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Components** | Shadcn UI + Radix UI |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Notifications** | Sonner (Toast) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Deployment** | Vercel (Ready) |

## 📁 Project Structure

```
url-downloader/
├── app/
│   ├── api/
│   │   └── download/route.ts      # Download API with usage limits
│   ├── login/page.tsx             # Login page
│   ├── register/page.tsx          # Register page
│   ├── page.tsx                   # Premium landing page
│   ├── layout.tsx                 # Root layout with Toaster
│   └── globals.css                # Premium CSS with effects
├── components/
│   ├── ui/                        # Shadcn components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── skeleton.tsx
│   │   ├── avatar.tsx
│   │   ├── sonner.tsx             # Toast component
│   │   ├── progress.tsx
│   │   └── tabs.tsx
│   └── pricing-section.tsx        # Premium pricing cards
├── lib/
│   ├── supabase.ts               # Supabase client
│   └── utils.ts                  # Utility functions
├── types/
│   └── database.ts               # TypeScript interfaces
├── supabase/
│   └── schema.sql                # Database schema
└── .env.local                    # Environment variables
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

#### Create Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for database provisioning

#### Run Database Schema
1. Navigate to **SQL Editor** in Supabase dashboard
2. Copy contents of `supabase/schema.sql`
3. Paste and **Run** the SQL

#### Get API Credentials
Your `.env.local` is already configured with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://daksejqiizbqoeikpzch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 🎯 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Premium landing page with glassmorphism |
| **Login** | `/login` | Smart authentication with social login UI |
| **Register** | `/register` | Registration with password strength indicator |

## 🎨 Premium Design Features

### Glassmorphism Card
```css
.glass-dark {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Mesh Gradient
```css
.mesh-gradient {
  background:
    radial-gradient(at 0% 0%, hsla(253, 70%, 15%, 1) 0px, transparent 50%),
    radial-gradient(at 50% 0%, hsla(240, 70%, 15%, 1) 0px, transparent 50%),
    radial-gradient(at 100% 0%, hsla(260, 70%, 15%, 1) 0px, transparent 50%);
}
```

### Glowing Border
```css
.glow-border:focus-within {
  box-shadow:
    0 0 20px rgba(99, 102, 241, 0.3),
    0 0 40px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
}
```

### Pulse Animation (Pro Button)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
}
```

## 📊 Database Schema

### Tables

#### users
- `id` (UUID) - Primary key
- `email` (TEXT) - Unique email
- `full_name` (TEXT) - User's full name
- `plan` ('FREE' | 'PRO') - Subscription plan
- `created_at` (TIMESTAMP) - Account creation

#### usage_limits
- `id` (SERIAL) - Primary key
- `user_id` (UUID) - Foreign key to users
- `download_count` (INT) - Current month downloads
- `last_reset_month` (INT) - 1-12
- `last_reset_year` (INT) - Year
- `updated_at` (TIMESTAMP) - Last update

#### download_logs
- `id` (SERIAL) - Primary key
- `user_id` (UUID) - Foreign key to users
- `url` (TEXT) - Video URL
- `format` ('mp3' | 'mp4') - Download format
- `created_at` (TIMESTAMP) - Download time

#### payments
- `id` (TEXT) - PayPal Order ID
- `user_id` (UUID) - Foreign key to users
- `status` (TEXT) - COMPLETED, PENDING, etc.
- `amount` (DECIMAL) - Payment amount
- `currency` (TEXT) - USD, EUR, etc.
- `created_at` (TIMESTAMP) - Payment time

## 🔒 Authentication Flow

1. **Register** → Creates user in `users` table
2. **Supabase Auth** → Sends verification email
3. **Usage Limit** → Creates initial limit record
4. **Login** → Authenticates via Supabase
5. **Session** → Stored in localStorage/cookies

## 📈 Usage Limit System

- **FREE Plan**: 3 downloads/month
- **PRO Plan**: Unlimited downloads
- **Auto-Reset**: Monthly on the 1st
- **Tracking**: Per-user in `usage_limits` table

## 🎁 Bonus Features

✅ Grainy texture overlay
✅ Custom scrollbar styling
✅ Responsive mobile design
✅ Dark mode optimized
✅ Loading states everywhere
✅ Error handling with toasts
✅ Form validation
✅ Password strength meter
✅ Social login UI (Google, GitHub)
✅ Remember me checkbox
✅ Forgot password link

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Environment variables are already in `.env.local`
4. Deploy!

```bash
npm run build
npm start
```

## 📸 Screenshots

### Landing Page
- Mesh gradient background
- Glassmorphic input card
- Glowing border on focus
- Trending downloads section

### Video Info Display
- Slide-down animation
- Thumbnail with hover effect
- Multiple quality options
- One-click download buttons

### Pricing Section
- Pro card with pulse animation
- "Most Popular" badge
- 3D scale effect
- Clear feature comparison

### Auth Pages
- Smart form validation
- Password strength indicator
- Social login buttons
- Beautiful error states

## 🔧 Customization

### Change Brand Colors
Edit `app/globals.css`:
```css
:root {
  --primary: 240 5.9% 10%;  /* Change this */
}
```

### Modify Download Limits
Edit `app/api/download/route.ts`:
```typescript
const FREE_PLAN_LIMIT = 3;  // Change this
```

### Add New Features
All components are modular and reusable!

## 🤝 Contributing

Contributions welcome! Feel free to submit PRs.

## 📄 License

MIT License - use freely for personal or commercial projects.

## 💎 Premium Support

Need help? Found a bug? Create an issue on GitHub!

---

**Built with ❤️ using Next.js, Shadcn UI, Framer Motion & Supabase**

🌟 **Star this repo if you found it helpful!**
