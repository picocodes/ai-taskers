# AI Taskers

Conversion landing page for a managed AI-training-account service. Account owners create and retain their accounts; AI Taskers handles permitted training work under an agreed 50/50 split.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Contact form

The form posts to `/api/contact` and sends mail through SMTP. Configure the values shown in `.env.example`. The form intentionally never asks for account passwords.

## Coolify

1. Create a new application from the Git repository.
2. Select Dockerfile as the build pack.
3. Set port `3000` and add the environment variables from `.env.example`.
4. Attach `ai-taskers.nopt.in` and enable HTTPS.
5. Deploy and submit one real test lead.

The application uses Next.js standalone output and runs as a non-root user in the production container.
