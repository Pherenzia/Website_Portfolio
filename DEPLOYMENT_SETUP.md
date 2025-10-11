# 🚀 GitHub Pages Deployment Setup Guide

## Current Issue: Exit Code 128

The error "The process '/usr/bin/git' failed with exit code 128" indicates authentication/permission issues.

## ✅ Required Setup Steps

### 1. Repository Settings

Go to your repository: `https://github.com/Pherenzia/Website_Portfolio`

#### A. Enable GitHub Pages
1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (will be created automatically)
4. **Folder**: `/ (root)`

#### B. Actions Permissions
1. **Settings** → **Actions** → **General**
2. **Workflow permissions**: "Read and write permissions"
3. **Allow GitHub Actions to create and approve pull requests**: ✅ Checked

### 2. Create Personal Access Token

#### A. Generate Token
1. Go to **GitHub** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: "GitHub Pages Deployment"
4. **Expiration**: 90 days (or longer)
5. **Select scopes**:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `write:packages` (Upload packages to GitHub Package Registry)

#### B. Copy the Token
- **Important**: Copy the token immediately - you won't see it again!

### 3. Add Repository Secrets

Go to your repository: **Settings** → **Secrets and variables** → **Actions**

#### Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `GITHUB_TOKEN` | Your personal access token | For deployment authentication |
| `GITHUB_USERNAME` | `Pherenzia` | Your GitHub username |

### 4. Environment Setup

#### A. Create GitHub Pages Environment
1. **Settings** → **Environments**
2. Click **"New environment"**
3. Name: `github-pages`
4. **Protection rules**: None needed for now
5. Click **"Configure environment"**

#### B. Environment Secrets (Optional)
If you want to add environment-specific secrets:
1. In the `github-pages` environment
2. Add the same secrets as repository secrets

### 5. Test the Setup

#### A. Manual Test
```bash
# Build locally
npm run build

# Test deployment script
npm run deploy
```

#### B. Automatic Deployment
1. Push to `main` branch
2. Check **Actions** tab for workflow progress
3. Check **Pages** settings for deployment status

## 🔧 Troubleshooting

### Still Getting Exit Code 128?

#### Option 1: Use Manual Deployment
```bash
npm run deploy
```

#### Option 2: Check Token Permissions
- Ensure token has `repo` and `workflow` scopes
- Token should not be expired

#### Option 3: Repository Access
- Repository must be public for free GitHub Pages
- Or you need a GitHub Pro account for private repos

#### Option 4: Branch Protection
- Disable branch protection rules temporarily
- Or add the GitHub token as an authorized user

### Common Error Messages

| Error | Solution |
|-------|----------|
| "Repository not found" | Check repository URL and token permissions |
| "Permission denied" | Verify token has correct scopes |
| "Branch not found" | Push to `main` or `master` branch |
| "Workflow not found" | Check workflow file exists in `.github/workflows/` |

## 📋 Verification Checklist

- [ ] Repository is public
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] Actions have write permissions
- [ ] Personal access token created with correct scopes
- [ ] Repository secrets added (`GITHUB_TOKEN`, `GITHUB_USERNAME`)
- [ ] `github-pages` environment created
- [ ] Workflow file exists in `.github/workflows/deploy.yml`
- [ ] Pushed to `main` or `master` branch

## 🎯 Expected Result

After completing these steps:
1. **Push to main branch** triggers deployment
2. **Actions tab** shows successful workflow run
3. **Site available** at: `https://pherenzia.github.io/Website_Portfolio`

## 🆘 Still Need Help?

1. **Check Actions logs** for specific error messages
2. **Verify all secrets** are correctly set
3. **Try manual deployment** as fallback
4. **Check repository settings** match requirements

---

**Next Step**: Complete the setup above, then push your changes to trigger the deployment.
