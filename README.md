# Agtalist - AI Prompt Marketplace

A cyberpunk-themed landing page for discovering, downloading, and sharing AI prompts.

**Live Site:** [agtalist.net](https://agtalist.net)

## Tech Stack
- Next.js 15 (Static Export) + TypeScript
- Tailwind CSS 4 + Cyberpunk Theme
- shadcn/ui + Lucide Icons + Framer Motion

## Features
- Hero section with cyberpunk anime girl background
- Real-time prompt search
- 5 categories: Text→Text, Text→Image, Image→Image, Text→Video, Video→Video
- Latest/trending prompts grid
- Upload prompt dialog (ready for backend integration)
- Fully responsive (mobile-first)
- Neon glow effects & particle animations

## Local Development
```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages
1. Push this repo to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Click "Create a project" → "Connect to Git"
4. Select this repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `20`
6. Deploy!

## Custom Domain (agtalist.net)
1. Cloudflare Pages → your project → Custom domains
2. Add `agtalist.net` and `www.agtalist.net`

## License
MIT
