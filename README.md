# Clement Stack Portfolio & Blog Website

A responsive portfolio and blog website for Clement Stack with a Node.js backend. Includes:

- Home, About, Services, Blog, and Contact pages
- Blog API with categories and tags
- Contact form submission endpoint
- Responsive layout for mobile and desktop

## Setup

1. Open a terminal in `c:\Users\hp\Desktop\FIRST`
2. Run `npm install`
3. Start the server with `npm start`
4. Open `http://localhost:3000`

## Contact form / Email

To receive contact form submissions by email, configure SMTP credentials and the recipient address.

1. Copy `.env.example` to `.env` and update the values:

```text
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
FROM_ADDRESS="Clement Stack <hello@yourdomain.com>"
TO_ADDRESS=josephclement332@gmail.com
```

2. Install dependencies and start the server:

```bash
npm install
npm start
```

Notes:
- For local testing, Mailtrap provides SMTP credentials you can use safely.
- To send via Gmail, create an App Password and use `smtp.gmail.com` as the host.
- Do not commit your `.env` file to version control.

## Continuous integration

This project includes a GitHub Actions workflow that runs `npm test` on every push and pull request.

## Files

- `public/` - front-end HTML, CSS, JS
- `server.js` - Express backend for API and contact submissions
- `data/posts.json` - sample blog posts with categories and tags
- `package.json` - Node dependencies and scripts
