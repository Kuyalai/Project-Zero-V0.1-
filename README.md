# Ramathibodi Nursing Council OS

Ramathibodi Nursing Council OS is a pilot website for the Ramathibodi Nursing Student Council. It helps manage student council tasks, documents, feedback, and handover knowledge for future generations.

Creator: นายซียภัทร์ ลูกหวาย | Seayaphat Lookwhile | RANS

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

## Pages

- `/` Home
- `/dashboard`
- `/tasks`
- `/documents`
- `/handover`
- `/feedback`

## How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## V0.1 Scope

- Working responsive demo
- Thai UI
- Mobile-first layout
- Shared navigation and footer
- Trial database and API routes for tasks, documents, handover, and feedback
- Feedback form with saved responses

## Not Included Yet

- Real login
- Production database
- Notification system
- Chatbot
- Native mobile app

## Vercel Deployment

This project is ready for a standard Vercel deployment. Connect the repository, keep the default Next.js build settings, and set `NEXT_PUBLIC_SITE_URL` to the public URL after deployment so sitemap and metadata point to the real domain.
