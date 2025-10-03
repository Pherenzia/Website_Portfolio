# 🚨 GitHub Pages Deployment Troubleshooting

## Common Issues and Solutions

### 1. "The process '/usr/bin/git' failed with exit code 128"

**Causes:**
- Authentication issues with GitHub token
- Repository permissions not set correctly
- Branch protection rules
- Repository name mismatch

**Solutions:**

#### Option A: Check Repository Settings
1. Go to your repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**

#### Option B: Use Simple Workflow
1. Delete the current workflow file
2. Rename `.github/workflows/deploy-simple.yml` to `.github/workflows/deploy.yml`
3. This uses the older but more reliable `peaceiris/actions-gh-pages` action

#### Option C: Manual Deployment
```bash
npm run deploy
```

### 2. "Repository not found" Error

**Solution:**
- Make sure the repository exists and is public
- Check that you're pushing to the correct branch (usually `main` or `master`)
- Verify the repository URL in your local git config

### 3. "Permission denied" Error

**Solutions:**

#### Check GitHub Token Permissions
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Create a new token with these permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
3. Add the token as a repository secret named `GITHUB_TOKEN`

#### Repository Secrets Setup
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `GITHUB_TOKEN`: Your personal access token
   - `GITHUB_USERNAME`: Your GitHub username (for API calls)

### 4. "Build failed" Error

**Common Causes:**
- TypeScript errors
- Missing dependencies
- Environment variable issues

**Solutions:**
```bash
# Test build locally first
npm run build

# Fix any TypeScript errors
npm run type-check

# Install missing dependencies
npm install
```

### 5. "404 Not Found" on Refresh

**Solution:**
- Make sure you have `public/404.html` file
- Check that your `vite.config.ts` has the correct base path
- Verify that GitHub Pages is serving from the correct branch

### 6. Assets Not Loading (CSS/JS files)

**Solution:**
Check your `vite.config.ts` base path:
```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  // ... rest of config
})
```

## Step-by-Step Fix for Exit Code 128

### 1. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: **"Deploy from a branch"**
3. Branch: **"gh-pages"** (will be created automatically)
4. Folder: **"/ (root)"**

### 2. Set Repository Permissions
1. Go to repository **Settings** → **Actions** → **General**
2. Workflow permissions: **"Read and write permissions"**
3. Allow GitHub Actions: **"Read and write permissions"**

### 3. Create Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with scopes:
   - `repo`
   - `workflow`
   - `write:packages`
3. Copy the token

### 4. Add Repository Secrets
1. Repository Settings → Secrets and variables → Actions
2. Add secret: `GITHUB_TOKEN` = your personal access token
3. Add secret: `GITHUB_USERNAME` = your GitHub username

### 5. Use Simple Deployment Workflow
Replace your current `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_GITHUB_USERNAME: ${{ secrets.GITHUB_USERNAME }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 6. Test the Deployment
1. Commit and push your changes
2. Go to Actions tab to see the workflow running
3. Check the logs if it fails
4. Your site should be available at `https://yourusername.github.io/repository-name`

## Alternative: Manual Deployment

If GitHub Actions continues to fail, you can deploy manually:

```bash
# Build the project
npm run build

# Deploy using gh-pages
npm run deploy

# Or use the deployment script
deploy.bat  # Windows
./deploy.sh # Linux/Mac
```

## Still Having Issues?

1. **Check the Actions logs** in the GitHub repository
2. **Try the simple workflow** instead of the complex one
3. **Use manual deployment** as a fallback
4. **Verify repository settings** and permissions
5. **Check that your repository is public** (required for free GitHub Pages)

## Quick Fix Checklist

- [ ] Repository is public
- [ ] GitHub Pages is enabled in repository settings
- [ ] Repository permissions allow Actions to write
- [ ] Personal access token is created and added as secret
- [ ] Base path in vite.config.ts matches repository name
- [ ] Build works locally (`npm run build`)
- [ ] Using the correct branch (main/master)

---

**Need more help?** Check the GitHub Actions logs for specific error messages and search for solutions online.
