# rejaka.id — Portfolio

Personal portfolio site for Rejaka Abimanyu Susanto, built with Next.js 15 (App Router).

## Features

- **Dual-theme UI** — toggle between a GUI card view and a terminal/developer mode
- **Discord presence** — live status widget powered by [Lanyard](https://github.com/Phineas/lanyard), showing current status, Spotify playback, and active activities
- **WakaTime stats** — weekly coding language breakdown via WakaTime embeddable JSON
- **Project showcase** — structured project data served from internal API routes
- **Blog** — MDX-based posts with syntax highlighting
- **Contact form** — submits via FormSubmit, no backend required

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the project root:

```env
# Your Discord user ID (for Lanyard presence)
DISCORD_USER_ID=your_discord_user_id

# WakaTime embeddable JSON URL
# Generate at https://wakatime.com/share/embed → Last 7 Days → Languages → JSON
WAKATIME_JSON_URL=https://wakatime.com/share/...
```

> **Discord presence note:** your account must be a member of [discord.gg/lanyard](https://discord.gg/lanyard) for Lanyard to monitor your presence.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── data/          # Static data routes (projects, about, etc.)
│   │   └── status/        # Live status proxies (discord, wakatime)
│   ├── blog/              # Blog pages
│   └── layout.tsx         # Root layout — mounts StatusWidgetStack
├── components/
│   ├── DiscordWidget.tsx   # Discord presence panel
│   ├── WakaTimeWidget.tsx  # WakaTime language stats panel
│   ├── StatusWidgetStack.tsx # Fixed overlay managing both status widgets
│   ├── GUITerminal.tsx     # GUI-mode main content
│   └── TabTerminal.tsx     # Terminal-mode main content
└── context/
    └── ViewModeContext.tsx # Global gui/terminal mode state
```

## Tech Stack

- [Next.js 15](https://nextjs.org) — App Router, React Server Components
- [Lanyard API](https://github.com/Phineas/lanyard) — Discord real-time presence
- [WakaTime](https://wakatime.com) — Coding activity stats
- Vanilla CSS / inline styles — no CSS framework

## Deployment

Deploy to [Vercel](https://vercel.com) and set the environment variables in the project settings.
