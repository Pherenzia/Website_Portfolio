# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Mitchell Riley portfolio to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Repository**: Your code should be in a GitHub repository
3. **Node.js**: Version 18 or higher installed
4. **npm**: Package manager installed

## 🔧 Setup Steps

### 1. Repository Setup

1. **Create a new repository** on GitHub (or use existing one)
2. **Clone the repository** locally:
   ```bash
   git clone https://github.com/Pherenzia/Website_Portfolio.git
   cd Website_Portfolio
   ```

### 2. Environment Configuration

1. **Copy the environment file**:
   ```bash
   cp env.example .env.local
   ```

2. **Edit `.env.local`** with your information:
   ```env
   VITE_GITHUB_USERNAME=your-github-username
   VITE_GITHUB_TOKEN=your-github-token (optional)
   VITE_CONTACT_EMAIL=your-email@example.com
   VITE_CONTACT_PHONE=your-phone-number
   ```

### 3. Update Repository Name

If your repository name is different from `Website_Portfolio`, update these files:

1. **`vite.config.ts`**:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```

2. **`package.json`**:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

3. **All SEO components** in `src/components/SEO/` to use your URL

## 🚀 Deployment Options

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Actions**:
   - Go to your repository on GitHub
   - Click on "Actions" tab
   - Enable GitHub Actions if prompted

2. **Push your code**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on every push

### Option 2: Manual Deployment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy using gh-pages**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "gh-pages" / "root"

### Option 3: Using Deployment Scripts

**Windows**:
```bash
deploy.bat
```

**Linux/Mac**:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Customization

### Update Personal Information

1. **Skills**: Edit `src/components/Sections/Skills.tsx`
2. **Experience**: Edit `src/components/Sections/Experience.tsx`
3. **Education**: Edit `src/components/Sections/Education.tsx`
4. **Contact Info**: Update contact details in layout components
5. **Social Links**: Update social media links in header and footer

### Update Project Data

1. **GitHub Integration**: Set `VITE_GITHUB_USERNAME` in `.env.local`
2. **Manual Projects**: Edit the `SAMPLE_PROJECTS` array in `src/services/github.ts`

### Custom Domain (Optional)

1. **Add CNAME file** to `public/` directory:
   ```
   your-domain.com
   ```

2. **Update DNS settings** to point to GitHub Pages
3. **Enable HTTPS** in repository settings

## 📱 Testing

1. **Local Testing**:
   ```bash
   npm run dev
   ```

2. **Build Testing**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Production Testing**: Visit your deployed site

## 🔍 Troubleshooting

### Common Issues

1. **404 on Refresh**: Ensure you have `public/404.html` and proper routing
2. **Assets Not Loading**: Check the `base` path in `vite.config.ts`
3. **GitHub API Rate Limits**: Add a GitHub token to increase limits
4. **Build Failures**: Check for TypeScript errors and missing dependencies

### Debug Steps

1. **Check GitHub Actions logs** if using automatic deployment
2. **Verify repository name** matches the base path
3. **Test locally** before deploying
4. **Check browser console** for errors

## 📊 Performance Optimization

1. **Enable GitHub Pages caching**
2. **Optimize images** (use WebP format)
3. **Minify assets** (already handled by Vite)
4. **Enable compression** (handled by GitHub Pages)

## 🔒 Security

1. **Don't commit sensitive data** to repository
2. **Use environment variables** for API keys
3. **Enable branch protection** for main branch
4. **Review GitHub Actions** permissions

## 📈 Analytics (Optional)

Add Google Analytics or other tracking:

1. **Create analytics account**
2. **Add tracking code** to `index.html`
3. **Set up conversion tracking** for contact form

## 🎉 Success!

Your portfolio should now be live at:
`https://yourusername.github.io/your-repo-name`

## 📞 Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review the troubleshooting section
3. Test locally first
4. Check repository settings

---

**Happy Coding! 🚀**
