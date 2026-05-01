# Quick Setup Guide

## Step 1: Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to be provisioned

## Step 2: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the schema

## Step 3: Get API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the project root
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## Troubleshooting

### Can't connect to Supabase?
- Verify your `.env.local` file exists and has the correct values
- Make sure there are no extra spaces or quotes around the values
- Restart the dev server after changing environment variables

### Database errors?
- Make sure you ran the complete `schema.sql` script
- Check the Supabase logs in the dashboard for detailed error messages

### Build errors?
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear browser cache

## Testing the App

1. Enter any URL (e.g., `https://example.com/video`)
2. Select MP3 or MP4 format
3. Click Download
4. Watch the progress bar
5. See the download result card

Note: The current implementation is a mock. To enable real downloads, you'll need to integrate video processing services.

## Next Steps

- Integrate real video download service (yt-dlp, etc.)
- Add user authentication for better tracking
- Implement payment system for Pro plan
- Add more video platforms support
- Deploy to production

Happy coding! 🚀
