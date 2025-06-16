#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templates = {
  // Package.json
  packageJson: (projectName) => ({
    name: projectName,
    type: "module",
    version: "0.0.1",
    scripts: {
      dev: "astro dev",
      start: "astro dev --host",
      build: "astro build",
      preview: "astro build & astro preview --host"
    },
    dependencies: {
      astro: "^5.9.1",
      sass: "^1.89.1"
    },
    devDependencies: {

    }
  }),

  // Astro config
  astroConfig: `import { defineConfig } from 'astro/config';
    
    
    export default defineConfig({
      base: "/",
    });`,

  // Netlify config
  netlifyToml: `[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"`,

  // Base Layout
  baseLayout: `---
export interface Props {
  title: string;
  description?: string;
}
import "../scss/index.scss";


const { title, description = "Built with Astro and SCSS" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <!-- Font Awesome for social icons -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <title>{title}</title>
  </head>
  <body>
    <!-- Navbar -->
    <nav class="navbar" id="navbar">
      <div class="navbar__container">
        <a href="/" class="navbar__logo">
          <span class="navbar__logo-icon">🚀</span>
          Brand
        </a>

        <ul class="navbar__menu" id="navMenu">
          <li><a href="/" class="navbar__menu-link">Home</a></li>
          <li><a href="/about" class="navbar__menu-link">About</a></li>
          <li><a href="/contact" class="navbar__menu-link">Contact</a></li>
        </ul>

        <div class="navbar__cta">
          <a href="#" class="nav-btn">Get Started</a>
        </div>

        <button class="navbar__hamburger" id="hamburger">
          <span class="navbar__hamburger-line"></span>
          <span class="navbar__hamburger-line"></span>
          <span class="navbar__hamburger-line"></span>
        </button>
      </div>
    </nav>

    <div id="overlay"></div>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__column">
          <h3>About Us</h3>
          <p>
            Building amazing web experiences with modern tools and technologies.
          </p>
          <!-- CTA Button -->
          <a href="/about" class="btn-cta">Learn More</a>
        </div>
        <div class="footer__column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Web Design</a></li>
            <li><a href="#">Development</a></li>
            <li><a href="#">Consulting</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:hello@example.com">hello@example.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
          </ul>
          <!-- Social Links -->
          <div class="footer__social">
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <script>
      // Navbar functionality
      const navbar = document.getElementById("navbar");
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("navMenu");
      const overlay = document.getElementById("overlay");

      // Mobile menu toggle
      hamburger?.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        overlay.classList.toggle("active");
      });

      // Close menu when overlay is clicked
      overlay?.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
      });

      // Scroll effect
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });
    </script>
  </body>
</html>
`,

  // Index page
  indexPage: `---
import BaseLayout from "../layouts/BaseLayout.astro";
import "../scss/pages/_home.scss";
---

<BaseLayout title="Home - Astro SCSS Template">
  <!-- DELETE EVERYTHING BELOW -->
  <div class="main-content">
    <section class="hero">
      <h1>Welcome to Astro + SCSS Template</h1>
      <p class="hero__subtitle">
        A modern, lightweight npm template for building fast and scalable web
        experiences.
      </p>
      <a
        href="https://kolibriwebdesigns.com"
        class="btn-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Discover Kolibri Web Designs
      </a>
    </section>

    <section class="about-project">
      <h2>About This Template</h2>
      <p>
        Hi, I'm Aayan, the creator of this Astro + SCSS template and the owner
        of
        <a
          href="https://kolibriwebdesigns.com"
          target="_blank"
          rel="noopener noreferrer">Kolibri Web Designs</a
        >. This npm template is designed to help developers kickstart their
        projects with a modern, performant, and maintainable tech stack. Whether
        you're building a personal portfolio, a business website, or a complex
        web application, this template provides a solid foundation.
      </p>
      <p>
        The template leverages <strong>Astro</strong> for its server-first rendering
        and component-based architecture, paired with <strong>SCSS</strong> for flexible,
        modular styling. It includes pre-configured features like a responsive footer,
        animated CTA buttons, and a clean project structure, making it easy to customize
        and scale.
      </p>
    </section>

    <section class="why-astro-scss">
      <h2>Why I Chose Astro + SCSS</h2>
      <div class="reasons-grid">
        <div class="reason">
          <h3>Performance with Astro</h3>
          <p>
            Astro’s hybrid rendering approach—combining static site generation
            (SSG) and server-side rendering (SSR)—delivers lightning-fast
            websites. By default, Astro ships zero JavaScript to the client,
            which I love because it ensures optimal load times and SEO
            performance, critical for my clients at Kolibri Web Designs.
          </p>
        </div>
        <div class="reason">
          <h3>Flexibility with SCSS</h3>
          <p>
            SCSS is my go-to for styling because it offers powerful features
            like variables, mixins, and nesting, making it easy to create
            maintainable and reusable styles. The template’s SCSS setup includes
            custom mixins (like the CTA button) and a modular structure,
            reflecting the clean and professional designs I build at Kolibri Web
            Designs.
          </p>
        </div>
        <div class="reason">
          <h3>Developer Experience</h3>
          <p>
            Astro’s component-based system and support for frameworks like React
            or Vue make it a joy to work with. Combined with SCSS’s intuitive
            syntax, this stack streamlines my workflow, allowing me to focus on
            creating stunning user experiences without wrestling with complex
            build tools.
          </p>
        </div>
        <div class="reason">
          <h3>Scalability and Community</h3>
          <p>
            Astro’s growing ecosystem and SCSS’s maturity ensure this template
            can scale from small sites to large applications. The active Astro
            community and extensive SCSS resources provide the support I need to
            keep my projects cutting-edge, aligning with my mission at Kolibri
            Web Designs to deliver future-proof solutions.
          </p>
        </div>
      </div>
    </section>

    <section class="get-started">
      <h2>Get Started</h2>
      <p>
        Ready to build with this template? Clone the repository, customize the
        SCSS, and deploy your site with Astro’s seamless integrations. Visit <a
          href="https://kolibriwebdesigns.com"
          target="_blank"
          rel="noopener noreferrer">Kolibri Web Designs</a
        >
        to learn more about my work or hire me for your next project!
      </p>
      <a
        href="https://github.com/aayan-shaikh"
        class="btn-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </section>
  </div>
</BaseLayout>
`,

  // SCSS Files
  indexScss: `@use 'variables/' as *;
@use 'base/' as *;
@use 'components/' as *;`,

  variablesIndex: `@forward 'variables';
@forward 'colors';`,

  variables: `// Typography
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$border-radius: 5px;
`,

  colors: `$primary: #34856f;
$secondary: #0e241f;
$accent: #e44c59;
$text-primary: #fffce5;
$text-secondary: darken($text-primary, 5%);`,

  baseIndex: `@forward 'reset';
@forward 'typography';`,

  reset: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #2D2D2D;
}`,

  typography: `// ===== FONT SCALING =====
// Select the min and max screen sizes you are working with
$screen-min-width: 30;
$screen-max-width: 120;

// Select the min and max font-sizes for each header type
$h1-min-size: 3.0;
$h1-max-size: 5.0;
$h2-min-size: 2.0;
$h2-max-size: 4.0;
$h3-min-size: 3.0;
$h3-max-size: 3.5;
$h4-min-size: 2.0;
$h4-max-size: 3.0;

// Select the min and max font-sizes for body text types
$body-min-size: 1.0;
$body-max-size: 1.25;
$small-min-size: 0.875;
$small-max-size: 1.0;
$large-min-size: 1.125;
$large-max-size: 1.5;
$lead-min-size: 1.25;
$lead-max-size: 1.75;

// FONT SCALING CALCULATIONS - DON'T NEED TO EDIT
// Header calculations
$h1-slope: calc(($h1-max-size - $h1-min-size) / ($screen-max-width - $screen-min-width));
$h2-slope: calc(($h2-max-size - $h2-min-size) / ($screen-max-width - $screen-min-width));
$h3-slope: calc(($h3-max-size - $h3-min-size) / ($screen-max-width - $screen-min-width));
$h4-slope: calc(($h4-max-size - $h4-min-size) / ($screen-max-width - $screen-min-width));

// Body text calculations
$body-slope: calc(($body-max-size - $body-min-size) / ($screen-max-width - $screen-min-width));
$small-slope: calc(($small-max-size - $small-min-size) / ($screen-max-width - $screen-min-width));
$large-slope: calc(($large-max-size - $large-min-size) / ($screen-max-width - $screen-min-width));
$lead-slope: calc(($lead-max-size - $lead-min-size) / ($screen-max-width - $screen-min-width));

// Header intersections
$h1-intersection: calc((-1 * $screen-min-width * $h1-slope) + $h1-min-size);
$h2-intersection: calc((-1 * $screen-min-width * $h2-slope) + $h2-min-size);
$h3-intersection: calc((-1 * $screen-min-width * $h3-slope) + $h3-min-size);
$h4-intersection: calc((-1 * $screen-min-width * $h4-slope) + $h4-min-size);

// Body text intersections
$body-intersection: calc((-1 * $screen-min-width * $body-slope) + $body-min-size);
$small-intersection: calc((-1 * $screen-min-width * $small-slope) + $small-min-size);
$large-intersection: calc((-1 * $screen-min-width * $large-slope) + $large-min-size);
$lead-intersection: calc((-1 * $screen-min-width * $lead-slope) + $lead-min-size);

// Header preferred values
$h1-preferred: calc($h1-intersection + ($h1-slope * 100));
$h2-preferred: calc($h2-intersection + ($h2-slope * 100));
$h3-preferred: calc($h3-intersection + ($h3-slope * 100));
$h4-preferred: calc($h4-intersection + ($h4-slope * 100));

// Body text preferred values
$body-preferred: calc($body-intersection + ($body-slope * 100));
$small-preferred: calc($small-intersection + ($small-slope * 100));
$large-preferred: calc($large-intersection + ($large-slope * 100));
$lead-preferred: calc($lead-intersection + ($lead-slope * 100));

// Header min/mid/max values
$h1-min: calc($h1-min-size * 1rem);
$h1-mid: calc($h1-preferred * 1vw);
$h1-max: calc($h1-max-size * 1rem);
$h2-min: calc($h2-min-size * 1rem);
$h2-mid: calc($h2-preferred * 1vw);
$h2-max: calc($h2-max-size * 1rem);
$h3-min: calc($h3-min-size * 1rem);
$h3-mid: calc($h3-preferred * 1vw);
$h3-max: calc($h3-max-size * 1rem);
$h4-min: calc($h4-min-size * 1rem);
$h4-mid: calc($h4-preferred * 1vw);
$h4-max: calc($h4-max-size * 1rem);

// Body text min/mid/max values
$body-min: calc($body-min-size * 1rem);
$body-mid: calc($body-preferred * 1vw);
$body-max: calc($body-max-size * 1rem);
$small-min: calc($small-min-size * 1rem);
$small-mid: calc($small-preferred * 1vw);
$small-max: calc($small-max-size * 1rem);
$large-min: calc($large-min-size * 1rem);
$large-mid: calc($large-preferred * 1vw);
$large-max: calc($large-max-size * 1rem);
$lead-min: calc($lead-min-size * 1rem);
$lead-mid: calc($lead-preferred * 1vw);
$lead-max: calc($lead-max-size * 1rem);

// Final font-size variables
$h1-font-size: clamp($h1-min, $h1-mid, $h1-max);
$h2-font-size: clamp($h2-min, $h2-mid, $h2-max);
$h3-font-size: clamp($h3-min, $h3-mid, $h3-max);
$h4-font-size: clamp($h4-min, $h4-mid, $h4-max);
$body-font-size: clamp($body-min, $body-mid, $body-max);
$small-font-size: clamp($small-min, $small-mid, $small-max);
$large-font-size: clamp($large-min, $large-mid, $large-max);
$lead-font-size: clamp($lead-min, $lead-mid, $lead-max);


h1 {
  font-size: $h1-font-size;
}

h2 {
  font-size: $h2-font-size;
}

h3 {
  font-size: $h3-font-size;
}

h4 {
  font-size: $h4-font-size;
}

body,
p {
  font-size: $body-font-size;
}

.text-small,
small {
  font-size: $small-font-size;
}

.text-large {
  font-size: $large-font-size;
}

.lead {
  font-size: $lead-font-size;
}`,

  componentsIndex: `@forward 'navbar';
@forward 'footer'; @forward 'buttons';`,
  buttons: `@use "../base/" as *;
@use "../variables/" as *;

// Simple button mixin with sensible defaults
@mixin button($bg: $primary,
    $color: $text-primary,
    $padding: 1rem 1.5rem,
    $radius: $border-radius,
    $shadow: true) {
    display: inline-block;
    padding: $padding;
    text-transform: uppercase;
    background: $bg;
    color: $color;
    border: none;
    border-radius: $radius;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
    font-size:inherit;


    @if $shadow {
        box-shadow: 0 2px 4px rgba($bg, 0.2);
    }

    &:hover {
        background: darken($bg, 8%);
        transform: translateY(-1px);

        @if $shadow {
            box-shadow: 0 4px 8px rgba($bg, 0.3);
        }
    }

    &:active {
        transform: translateY(0);
    }
}

// Enhanced button with gradient and effects
@mixin button-enhanced($bg: $primary,
    $color: $text-primary,
    $padding: 0.8rem 2rem,
    $radius: $border-radius,
    $lift: 2px,
    $shimmer: false) {
    @include button($bg, $color, $padding, $radius, $shadow: true);

    background: linear-gradient(135deg, $bg, darken($bg, 10%));
    position: relative;
    overflow: hidden;

    @if $shimmer {
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg,
                    transparent,
                    rgba(white, 0.2),
                    transparent);
            transition: left 0.6s ease;
        }
    }

    &:hover {
        background: linear-gradient(135deg, darken($bg, 5%), darken($bg, 15%));
        transform: translateY(-$lift);
        box-shadow: 0 #{$lift + 4px} 20px rgba($bg, 0.4);

        @if $shimmer {
            &::before {
                left: 100%;
            }
        }
    }
}


// Button styles for different contexts
.btn-primary {
    @include button($accent);
}

.btn-secondary {
    @include button($secondary);
}

.btn-cta {
    @include button-enhanced($accent, $shimmer: true);
}

// Default button element styling
button {
    @include button($color: black);
}`,

  navbar: `@use '../variables/' as *;
@use './buttons' as *;
// Navbar variables
$nav-primary: $primary;

$nav-accent: $accent;
$nav-text: $text-primary;

.navbar {
  background-color: rgba($primary, 0.95);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, padding 0.2s ease;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    color: $nav-text;
    font-weight: 700;
    font-size: 1.8rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s ease;

    &-icon {
      color: $nav-accent;
      transition: transform 0.2s ease;
    }

    &:hover {
      color: $nav-accent;

      .navbar__logo-icon {
        transform: rotate(-15deg);
      }
    }
  }

  &__menu {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;

    &-link {
      color: rgba($nav-text, 0.9);
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;
      position: relative;
      padding: 0.5rem 0;
      transition: color 0.2s ease;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: $nav-accent;
        transition: width 0.2s ease;
      }

      &:hover {
        color: $nav-text;

        &::after {
          width: 100%;
        }
      }
    }
  }

  &__cta {
    align-items: center;

    .nav-btn {
      @include button-enhanced($accent, $shimmer: true);
      align-items: center;
      // max-height: 50px;  
      justify-content: center;
    }
  }

  &__hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;

    &-line {
      display: block;
      width: 25px;
      height: 2px;
      background: $nav-text;
      margin: 5px 0;
      transition: all 0.2s ease;
    }

    &.active &-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    &.active &-line:nth-child(2) {
      opacity: 0;
    }

    &.active &-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  &.scrolled {
    background-color: rgba(darken($primary, 5%), 0.98);
    padding: 0.2rem 0;

    .navbar__logo {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 992px) {
    &__menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 300px;
      height: 100vh;
      background: $primary;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      transition: right 0.3s ease;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);

      &.active {
        right: 0;
      }
    }

    &__hamburger {
      display: block;
    }

    &__cta {
      // display: none;
      margin-left: auto;
      margin-right: 1rem;

    }
  }

  @media (max-width: 576px) {
    &__container {
      padding: 1rem;
    }

    &__logo {
      font-size: 1.5rem;
    }
  }
}

#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}`,

  footer: `@use '../variables/' as *;

.footer {
  background: linear-gradient(135deg, $primary 0%, lighten($primary, 2%) 100%);

  padding: 5rem 2rem 3rem;
  position: relative;
  overflow: hidden;

  // Subtle background pattern
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
        transparent,
        rgba($accent, 0.3),
        transparent);
  }

  // Container for content
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    gap: 3rem;
    position: relative;
  }

  // Column styling
  &__column {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;

    // Stagger animation for each column
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: #{($i - 1) * 0.1}s;
      }
    }

    // Heading styles
    h3 {
      color: $accent;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      position: relative;
      transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 2rem;
        height: 2px;
        background: linear-gradient(90deg, $accent, transparent);
        border-radius: 1px;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 3rem;
      }
    }

    // Paragraph styles
    p {
      color: $text-secondary;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      transition: color 0.3s ease;

      &:hover {
        color: lighten($text-secondary, 10%);
      }
    }

    // List styles
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 0.75rem;
      transform: translateX(0);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateX(4px);
      }
    }

    // Link styles
    a:where(:not(.btn-cta)) {
      color: $text-secondary;
      text-decoration: none;
      font-size: 0.9rem;
      position: relative;
      transition: all 0.2s ease;
      display: inline-block;

      &::before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: $accent;
        transition: width 0.3s ease;
      }

      &:hover {
        color: $accent;
        transform: translateY(-1px);

        &::before {
          width: 100%;
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  // Social links special styling
  &__social {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    a {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($accent, 0.1);
      border-radius: 50%;
      transition: all 0.3s ease;
      transform: scale(1);

      &:hover {
        background: rgba($accent, 0.2);
        transform: scale(1.1) translateY(-2px);
        box-shadow: 0 4px 12px rgba($accent, 0.2);
      }

      &::before {
        display: none; // Remove underline for social icons
      }
    }
  }

  // Responsive design
  @media (max-width: 1024px) {
    &__container {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 2.5rem;

    &__container {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: left;
    }

    &__column {
      h3::after {
        left: 0;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem 2rem;
  }
}

// Keyframe animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Performance optimizations
.footer {
  // Enable hardware acceleration for animations
  will-change: transform, opacity;

  * {
    // Optimize repaints
    backface-visibility: hidden;
    perspective: 1000px;
  }

  // Reduce animation complexity on mobile
  @media (prefers-reduced-motion: reduce) {
    &__column {
      animation: none;
      opacity: 1;
      transform: none;
    }

    * {
      transition: none !important;
      animation: none !important;
    }
  }
}`,
  basePage: `main {
    padding-top: 8rem;
}`,
  homePage: `@use "../variables/" as *;


main {
    padding-top: 8rem;
}

// DELETE EVERYTHING BELOW
$primary-light: lighten($primary, 2%);

.main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;

}

.hero {
    text-align: center;
    padding: 4rem 0;
    background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
    border-radius: 10px;
    margin-bottom: 3rem;

    h1 {
        font-size: 2.5rem;
        color: $text-primary;
        margin-bottom: 1rem;
    }

    &__subtitle {
        font-size: 1.2rem;
        color: $text-secondary;
        margin-bottom: 2rem;
    }

    .btn-cta {
        font-size: 1.1rem;
    }
}

.about-project,
.why-astro-scss,
.get-started {
    margin-bottom: 4rem;

    h2 {
        font-size: 1.8rem;
        color: $accent;
        margin-bottom: 1.5rem;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 4rem;
            height: 3px;
            background: $accent;
        }
    }

    p {
        font-size: 1rem;
        color: #333;
        line-height: 1.7;
        margin-bottom: 1rem;

        a {
            color: $accent;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}

.reasons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    .reason {
        background: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

        h3 {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 0.75rem;
        }

        p {
            font-size: 0.9rem;
            color: #666;
        }
    }
}

.get-started {
    text-align: center;

    .btn-cta {
        margin-top: 1.5rem;
    }
}

@media (max-width: 768px) {
    .hero {
        h1 {
            font-size: 2rem;
        }

        &__subtitle {
            font-size: 1rem;
        }
    }

    .about-project h2,
    .why-astro-scss h2,
    .get-started h2 {
        font-size: 1.5rem;
    }
}`,
  indexPageScss: `@forward "base-page";
@forward "home";`,
};

function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

function createTemplate(projectName = 'astro-scss-app') {
  console.log(`🚀 Creating Astro + SCSS template: ${projectName}`);

  // Create directory structure
  const dirs = [
    'src/layouts',
    'src/pages',
    'src/scss/pages',
    'src/scss/variables',
    'src/scss/base',
    'src/scss/components',
    'public'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Create files
  createFile('package.json', JSON.stringify(templates.packageJson(projectName), null, 2));
  createFile('astro.config.mjs', templates.astroConfig);
  createFile('netlify.toml', templates.netlifyToml);

  // Astro files
  createFile('src/layouts/BaseLayout.astro', templates.baseLayout);
  createFile('src/pages/index.astro', templates.indexPage);

  // SCSS files
  createFile('src/scss/index.scss', templates.indexScss);
  createFile('src/scss/pages/_base-page.scss', templates.basePage);
  createFile('src/scss/pages/_home.scss', templates.homePage);
  createFile('src/scss/pages/_index.scss', templates.indexPageScss);
  createFile('src/scss/variables/_index.scss', templates.variablesIndex);
  createFile('src/scss/variables/_variables.scss', templates.variables);
  createFile('src/scss/variables/_colors.scss', templates.colors);
  createFile('src/scss/base/_index.scss', templates.baseIndex);
  createFile('src/scss/base/_reset.scss', templates.reset);
  createFile('src/scss/base/_typography.scss', templates.typography);
  createFile('src/scss/components/_index.scss', templates.componentsIndex);
  createFile('src/scss/components/_navbar.scss', templates.navbar);
  createFile('src/scss/components/_footer.scss', templates.footer);
  createFile('src/scss/components/_buttons.scss', templates.buttons);

  // Public files
  createFile('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#D4A574" d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>');

  console.log('✅ Template created successfully!');
  console.log('\n📝 Next steps:');
  console.log(`   cd ${projectName}`);
  console.log('   npm install');
  console.log('   npm run dev');
  console.log('\n 🌐 Deploy to Netlify:');
  console.log('   npm run build');
  console.log('   Deploy the dist/ folder\n');
  console.log('   Made with ❤️  by Aayan\n');
}

// CLI handling
function main() {
  const args = process.argv.slice(2);
  const projectName = args[0] || 'astro-scss-app';

  // Validate project name
  if (projectName.startsWith('-')) {
    console.error('Error: Project name cannot start with a dash');
    process.exit(1);
  }

  // Check if directory already exists
  if (fs.existsSync(projectName)) {
    console.error(`Error: Directory "${projectName}" already exists`);
    process.exit(1);
  }

  try {
    // Create project directory first
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    createTemplate(projectName);
  } catch (err) {
    console.error('Error creating template:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createTemplate };