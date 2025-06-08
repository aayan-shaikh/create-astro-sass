# Create Astro + SCSS

![Astro + SCSS Banner](https://via.placeholder.com/1200x400?text=Astro+%2B+SCSS+Template)  
*A modern, lightweight template for building fast, responsive, and stylish web projects with Astro and SCSS.*

---

## Overview

**Create Astro + SCSS** is an npm template designed to kickstart your web development projects with a performant and modular tech stack. Built by **Aayan Shaikh**, owner of [Kolibri Web Designs](https://kolibriwebdesigns.com), this template combines **Astro**’s server-first rendering with **SCSS**’s powerful styling capabilities to deliver fast, SEO-friendly, and visually stunning websites.

Whether you’re crafting a personal portfolio, a business site, or a complex web application, this template provides a solid foundation with pre-built components like a **responsive navbar**, **animated footer**, and **CTA buttons** with shimmer effects. Deploy seamlessly to platforms like **Netlify** and customize with ease.

---

## Features

- 🚀 **Astro-Powered Performance**: Leverage Astro’s hybrid rendering (SSG + SSR) with zero client-side JavaScript by default for lightning-fast load times.
- 🎨 **SCSS Styling**: Modular SCSS setup with variables, mixins (e.g., `cta-button` with hover shimmer), and nesting for maintainable, reusable styles.
- 📱 **Fully Responsive**: Includes a responsive navbar and footer with smooth animations (e.g., `fadeInUp` for footer columns) and mobile-friendly layouts.
- ✨ **Interactive Components**: Animated CTA buttons with gradient backgrounds, hover lift, and shimmer effects, plus social links with circular hover states.
- 🛠 **Developer-Friendly**: Clean project structure, easy customization, and support for frameworks like React or Vue within Astro components.
- 🌐 **Deployment Ready**: Optimized for deployment on Netlify, Vercel, or other platforms with Astro’s adapters.
- 🌙 **Dark Mode Support**: Built-in media queries for seamless dark mode styling.
- 📜 **MIT Licensed**: Open-source and free to use for personal or commercial projects.

---

## Why Astro + SCSS?

As Aayan Shaikh, the creator behind [Kolibri Web Designs](https://kolibriwebdesigns.com), I chose **Astro** and **SCSS** for this template to align with my mission of delivering high-performance, beautifully designed websites:

- **Astro**:
  - Server-first rendering ensures fast, SEO-optimized sites with minimal JavaScript.
  - Component-based architecture supports integrations with React, Vue, or Svelte, offering flexibility for diverse projects.
  - Growing ecosystem and active community keep your projects future-proof.

- **SCSS**:
  - Variables (e.g., `$primary`, `$accent`) and mixins (e.g., `cta-button`) enable reusable, maintainable styles.
  - Powerful features like nesting and functions support complex animations (e.g., footer’s staggered `fadeInUp` or button shimmer).
  - Familiar syntax streamlines my workflow, allowing me to focus on crafting stunning user experiences.

This template reflects the professional, clean, and modern approach I take at Kolibri Web Designs, making it perfect for developers who value performance and design.

---

## Installation

Get started with `create-astro-scss` in just a few steps:

1. **Use the CLI**:
   ```bash
   npx create-astro-scss my-project
   ```
   This creates a new project directory (`my-project`) with the template.

2. **Navigate to the Project**:
   ```bash
   cd my-project
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` to see your site in action.

---

## Project Structure

```plaintext
my-project/
├── src/
│   ├── components/
│   │   ├── Footer.astro      # Responsive footer with social links and CTA
│   │   └── Navbar.astro      # Responsive navigation bar
│   ├── layouts/
│   │   └── BaseLayout.astro  # Base layout for pages
│   ├── pages/
│   │   └── index.astro       # Homepage with sample content
│   ├── styles/
│   │   ├── cta-button.scss   # CTA button mixin with shimmer effect
│   │   ├── footer.scss       # Footer styles with animations
│   │   └── variables.scss    # SCSS variables ($primary, $accent, etc.)
├── astro.config.mjs          # Astro configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

---

## Usage

### Customizing Styles
Edit SCSS files in `src/styles/`:
- **`variables.scss`**: Update colors (e.g., `$primary: #1a1a2e`, `$accent: #007bff`) to match your brand.
- **`cta-button.scss`**: Tweak the `cta-button` mixin (e.g., `$shimmer-opacity`, `$hover-lift`) for custom button effects.
- **`footer.scss`**: Modify footer animations or grid layouts for different column configurations.

### Adding Pages
Create new `.astro` files in `src/pages/` to add routes. For example:
```astro
---
// src/pages/about.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="About - Astro SCSS Template">
  <h1>About Us</h1>
</BaseLayout>
```

### Deploying
Deploy to **Netlify**, **Vercel**, or other platforms using Astro’s adapters:
```bash
npm run build
```
Configure the adapter in `astro.config.mjs` (e.g., `@astrojs/netlify`).

---

## Example Components

### CTA Button
The template includes a `cta-button` mixin for call-to-action buttons with:
- Gradient background using `$accent` (e.g., `#007bff`).
- Hover effect with 2px lift, brighter gradient (`lighten($accent, 12%)`), and shimmer animation.
- Active state with a darker gradient (`darken($accent, 5%)`).

Usage in Astro:
```astro
<a href="https://kolibriwebdesigns.com" class="btn-cta">Learn More</a>
```

### Responsive Footer
The footer features:
- Four-column grid (responsive: 2x2 at 1024px, 1x4 at 768px).
- Staggered `fadeInUp` animations for columns.
- Social links with circular hover effects and `$accent`-colored underlines for links.

Usage:
```astro
import Footer from '../components/Footer.astro';
<Footer />
```

---

## Requirements

- **Node.js**: `>=14.0.0` (see `engines` in `package.json`).
- **Astro**: Installed via `npm install astro`.
- **SCSS**: Handled by `@astrojs/astro-scss` (included in template).

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## About the Author

Hi, I’m **Aayan Shaikh**, a web developer and the founder of [Kolibri Web Designs](https://kolibriwebdesigns.com). I specialize in building modern, performant, and visually appealing websites for clients worldwide. This template is a reflection of my commitment to quality and efficiency in web development. Connect with me on [LinkedIn](https://linkedin.com) or reach out via [hello@kolibriwebdesigns.com](mailto:hello@kolibriwebdesigns.com) for collaboration or custom projects!

---

## Get Started

Ready to build something amazing? Run:
```bash
npx create-astro-scss my-project
```
Explore the template, customize it, and deploy your next masterpiece! Visit [Kolibri Web Designs](https://kolibriwebdesigns.com) for more about my work or to hire me for your project.

---

*Built with 💖 by Aayan Shaikh at Kolibri Web Designs.*