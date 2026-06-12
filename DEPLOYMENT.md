# Deployment Guide

## Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add an environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

4. Deploy with the default Next.js settings.
5. After deployment, use the live URL for Google Search Console and sitemap submission.

## Notes

- `robots.txt` and `sitemap.xml` are generated automatically.
- The trial database for feedback and content lives in the app runtime data file and can be replaced later with a real cloud database or Google Sheets sync.
