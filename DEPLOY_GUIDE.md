# Deploying Minato Sanctuary to GitHub Pages

To view this application on your mobile device, you can publish it to GitHub Pages.

## Prerequisite
Ensure you are logged into GitHub and have created a new repository named `minato-sanctuary` (or similar).

## Deployment Steps

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit of Minato Sanctuary"
    ```

2.  **Add Remote Origin** (Replace `<USERNAME>` and `<REPO>` with yours):
    ```bash
    git remote add origin https://github.com/<USERNAME>/<REPO>.git
    ```

3.  **Deploy**:
    Run the following commands to build and push the `dist` folder to a `gh-pages` branch:
    
    ```bash
    # Build the project
    npm run build
    
    # Push the build folder to gh-pages branch (using a subdirectory push trick)
    git push origin --delete gh-pages # optional cleanup
    git subtree push --prefix dist origin gh-pages
    ```
    *Alternatively, you can configure GitHub Actions settings on your repo.*

4.  **View**:
    Go to `Settings > Pages` in your repository.
    Your site will be live at: `https://<USERNAME>.github.io/<REPO>/`

## Important Note regarding LocalStorage
Since this app uses `localStorage`, your memories saved on your PC **will not transfer** to your phone automatically. You will need to "Input" them again or use the Import/Export feature if we add cloud sync later.
