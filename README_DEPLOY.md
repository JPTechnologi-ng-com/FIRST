# Deploying this site to GitHub Pages

This repository is prepared to publish the `public` folder to GitHub Pages using a GitHub Actions workflow. Follow one of the two options below to create the remote repo and push your site.

Default repo name used in examples: `FIRST`. Replace with your preferred repo name if different.

Option A — Create repo on GitHub website (recommended if you don't have `gh`):

1. Go to https://github.com/new and sign in.
2. Create a new repository named `FIRST` (or your chosen name). Do NOT initialize with a README — leave it empty.
3. Back in your project folder, run:

```bash
git init
git add .
git commit -m "Initial site commit"
git branch -M main
git remote add origin https://github.com/JPTechnologi-ng-com/FIRST.git
git push -u origin main
```

Option B — Create and push using the GitHub CLI (`gh`):

```bash
git init
git add .
git commit -m "Initial site commit"
git branch -M main
gh repo create JPTechnologi-ng-com/FIRST --public --source=. --remote=origin --push
```

After pushing:
- The workflow `.github/workflows/deploy.yml` runs on each push to `main` and will publish the `public` folder to GitHub Pages.
- Visit `https://JPTechnologi-ng-com.github.io/FIRST/` to see the site once the Actions job completes (may take a minute).

Notes:
- If you prefer the repo name to differ, replace `FIRST` in the commands and in the final URL above.
- If your site requires `server.js`, GitHub Pages will not run server-side code; use a different host (Heroku/Render/Glitch) or share a tunnel (ngrok).

If you want, tell me when you've pushed and I will watch the Actions run and confirm the live URL.
