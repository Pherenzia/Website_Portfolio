# Mitchell Riley - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases projects, skills, and experience in a clean, professional design.

🌐 **Live Site**: [https://pherenzia.github.io/Website_Portfolio/](https://pherenzia.github.io/Website_Portfolio/)

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Fully responsive across all devices
- **GitHub Integration**: Automatically fetches and displays GitHub repositories
- **Performance Optimized**: Code splitting, lazy loading, and optimized builds
- **SEO Ready**: Meta tags, structured data, and accessibility features
- **Dark Mode**: Built-in dark/light theme toggle
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Contact Form**: Functional contact form with validation
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing utilities

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pherenzia/Website_Portfolio.git
   cd Website_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   VITE_GITHUB_USERNAME=your_github_username
   VITE_GITHUB_TOKEN=your_github_token
   VITE_CONTACT_EMAIL=your_email@example.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Footer, Sidebar)
│   ├── Sections/       # Page sections (Hero, About, Projects, etc.)
│   ├── UI/             # Basic UI components (Button, Card, Badge)
│   └── ErrorBoundary/  # Error handling components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services and external integrations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── main.tsx           # Application entry point
```

## ⚙️ Configuration

### GitHub Integration

The portfolio automatically fetches your GitHub repositories. Configure the following:

1. **GitHub Username**: Set `VITE_GITHUB_USERNAME` in your environment variables
2. **GitHub Token** (Optional): For higher rate limits, set `VITE_GITHUB_TOKEN`

### Customization

1. **Personal Information**: Update `src/types/index.ts` with your information
2. **Skills**: Modify the skills array in `src/components/Sections/Skills.tsx`
3. **Experience**: Update experience data in `src/components/Sections/Experience.tsx`
4. **Education**: Update education data in `src/components/Sections/Education.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the built files

## 🔧 Customization Guide

### Adding New Sections

1. Create a new component in `src/components/Sections/`
2. Add the component to the appropriate page
3. Update navigation if needed

### Styling

- Use Tailwind CSS classes for styling
- Customize colors in `tailwind.config.js`
- Add custom animations in the config file

### Adding New Projects

Projects are automatically fetched from GitHub, but you can also add manual projects by:

1. Creating a projects data file
2. Updating the GitHub service to include manual projects
3. Modifying the project display components

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [GitHub API](https://docs.github.com/en/rest) - For project data

## 📞 Contact

Mitchell Riley - [d.r.mitchellriley@gmail.com](mailto:d.r.mitchellriley@gmail.com) - 808-203-7139

- LinkedIn: [https://www.linkedin.com/in/mitchell-riley/](https://www.linkedin.com/in/mitchell-riley/)
- GitHub: [https://github.com/Pherenzia](https://github.com/Pherenzia)
- Instagram: [@memechell.riley](https://www.instagram.com/memechell.riley/)

**Project Link**: [https://github.com/Pherenzia/Website_Portfolio](https://github.com/Pherenzia/Website_Portfolio)

**Live Site**: [https://pherenzia.github.io/Website_Portfolio/](https://pherenzia.github.io/Website_Portfolio/)
