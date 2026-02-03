# Saojakho Samzareulo | Family Kitchen - Full Project Code

This document contains the complete source code for the Family Kitchen website. All project files are included below for a comprehensive overview.

The application is a modern, minimalist website for a local Georgian family kitchen, designed to be easily managed by a non-technical business owner.

---

## Key Features

*   **Headless CMS via Google Sheets**: All website content (menu items, prices, business hours, UI text) is fetched live from a public Google Sheet. This allows the business owner to update the site from their phone or computer without any code changes.
*   **Dynamic Content Loading**: The site fetches the latest content every time a user visits, ensuring that changes made in the Google Sheet are reflected automatically without needing to redeploy the application.
*   **Robust Fallback System**: If the Google Sheets data cannot be loaded for any reason (e.g., network error, incorrect configuration), the application seamlessly falls back to a local copy of the data. This ensures the website is always online and functional.
*   **Multi-language Support**: All text is managed in the CMS, supporting Georgian, English, and Russian.
*   **Fully Responsive Design**: A clean, modern aesthetic that looks great on all devices.
*   **Automated Deployments**: Using GitHub Actions, any change pushed to the `main` branch is automatically built and deployed to GitHub Pages.

---

## How to Deploy to GitHub Pages

This project is configured for automated deployment to GitHub Pages.

### Step 1: Push to a New GitHub Repository

1.  **Create a Repository:** Create a new, public repository on your GitHub account (e.g., `family-kitchen-website`).
2.  **Push the Code:** In your local project folder, run the following commands, replacing the URL with your repository's URL.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <YOUR_REPOSITORY_URL>
    git push -u origin main
    ```

### Step 2: Configure GitHub Pages Settings

1.  In your new GitHub repository, go to **Settings > Pages**.
2.  Under the "Build and deployment" section, change the **Source** to **"GitHub Actions"**.

### Step 3: Done!

The repository already contains a workflow file at `.github/workflows/deploy.yml`. The moment you push your code and configure the Pages source, GitHub Actions will automatically start building and deploying your site.

The first deployment may take a few minutes. You can monitor its progress in the **"Actions"** tab of your repository.

Your live site will be available at: `https://<your-username>.github.io/<repository-name>/`
