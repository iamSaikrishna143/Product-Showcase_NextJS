# TechStore - Premium Mini Product Showcase Website

**TechStore** is a production-grade, interview-level mini product showcase e-commerce website built using the latest **Next.js 15+ App Router**, **TypeScript**, and **Tailwind CSS 4.0**. The site features a highly polished, Apple-inspired minimalist user interface, responsive layouts, persistent user state (authentication and cart details), robust search and filtering capability, and SEO configurations.

---

## 🌟 Project Overview

TechStore showcases a premium collection of 20 consumer electronics items (smartphones, laptops, audio systems, gaming consoles, wearables, and cameras). Customers can search, filter, and sort products, add them to a shopping cart, modify item quantities, and simulate secure checkouts.

---

## 🚀 Features

### 1. Catalog & Detail Pages
* **Interactive Dynamic Catalog**: Real-time filtering by category, brand, price slider, and review ratings.
* **Smart Search**: Live client-side search indexing across titles, brands, and categories.
* **Sort Controls**: Sort items by Newest/Featured, Price (Low to High), Price (High to Low), or Ratings.
* **Pagination & Skeleton Loaders**: Optimized chunk-based pagination accompanied by premium pulsing loading placeholders.
* **Dynamic Details Page**: Rich product detail layout including thumbnail photo gallery, tabbed specs sheets, stock check tags, and shipping guarantees.

### 2. State & E-Commerce Workflows
* **Shopping Cart (CartContext)**: Supports adding items, removing items, updating quantities (with stock limits), and calculating order statistics (MRP Subtotal, Product Discounts, 18% GST, and Shipping fees).
* **Authentication Guard (AuthContext)**: Manages simulated sign-ins and guest sessions. Guest users can browse freely, but checking out redirects them to a login portal (redirecting back once logged in).
* **LocalStorage Sync**: Cart items and user logins are automatically saved and restored on page reloads.

### 3. Polish & UI Design
* **Apple-like Aesthetic**: Rounded panels, light borders, subtle card shadows, and spacious grid grids.
* **Micro-Animations**: Elegant click scales, transition hover states, bounce badges, and slow-spinning radars.
* **Custom Contact Form**: Contact form with real-time error validations and success feedback.
* **HQ Location Map**: Custom CSS-themed map mockup featuring GPS coordinates and pulsing visual radar sweeps.

---

## 📁 Folder Structure

The project conforms to a clean, modular, and highly scalable frontend architecture:

```text
app/                      # Next.js App Router folders
    layout.tsx            # Global state wrapping (Auth/Cart Contexts) & standard HTML shell
    page.tsx              # Home landing page (featured, categories, USP, testimonials)
    globals.css           # Global styles and Tailwind 4.0 animation keyframes
    products/
        page.tsx          # Catalog entry server component (holds SEO metadata)
        ProductsClient.tsx# Catalog client component (manages filters, search, and pagination)
        [id]/
            page.tsx      # Dynamic details page server wrapper (handles async params and og tags)
    cart/
        page.tsx          # Shopping cart client component
    login/
        page.tsx          # Credentials validation page
    about/
        page.tsx          # Corporate info and custom-styled interactive map page
components/               # Reusable UI & Feature components
    Navbar.tsx            # Sticky header with drawer menu, cart count, and user profiles
    Footer.tsx            # Newsletter form, social panels, and categorised links
    Hero.tsx              # Cupertino gradient-theme banner
    ProductCard.tsx       # Standard card grid item
    ProductGrid.tsx       # Grid system container
    SearchBar.tsx         # Live controlled search bar
    FilterSidebar.tsx     # Categories, brands, price sliders, and star filters
    ProductDetails.tsx    # Details gallery and specs compiler
    QuantitySelector.tsx  # Interactive plus/minus item editor
    CartItem.tsx          # Cart row layouts
    Button.tsx            # Variant-based button buttons
    Input.tsx             # Text inputs with validation labels
    Badge.tsx             # Alert status tags
    Loader.tsx            # pulsing skeletons & page spinners
    EmptyState.tsx        # Illustration placeholder
    ProtectedRoute.tsx    # Cart guard wrapper
context/                  # React Context providers
    AuthContext.tsx       # Authentication context and hooks
    CartContext.tsx       # E-Commerce cart calculations
hooks/                    # Custom React hooks
    useLocalStorage.ts    # Safe Next.js SSR-friendly storage sync
    useCart.ts            # Cart context proxy
    useProducts.ts        # Client query filtration compiler
lib/
    utils.ts              # Styling merges and currency formatters
data/
    products.json         # Static database of 20 premium devices
types/
    product.ts            # Product data types
    cart.ts               # Cart schema definitions
    user.ts               # Authenticated user profiles
services/
    productService.ts     # Encapsulated query controllers
```

---

## 🔍 SEO Features

TechStore implements standard modern SEO practices:
* **Next.js Metadata API**: Centralized static metadata in layout pages and dynamic metadata generation (`generateMetadata`) in dynamic routes (`/products/[id]`).
* **OpenGraph & Twitter Cards**: Programmatic OG tags (title, description, URL, matching unsplash images) for optimal social sharing.
* **Semantic HTML**: Structural sections conforming to `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` layouts.
* **Heading Hierarchy**: Strict H1-H3 structures to ensure clean document models for crawling engines.
* **Canonical URL**: Dynamic canonical parameters whitelisting primary source pathways.
* **Accessibility (a11y)**: Focus rings, keyboard tab-indices, descriptive `aria-labels`, and image `alt` attributes.

---

## 🛠️ Installation & Local Dev

To configure and execute the project locally:

1. **Clone and Navigate**:
   ```bash
   cd Task
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) inside your web browser.

4. **Production Build Compilation**:
   ```bash
   npm run build
   ```

---

## ⚙️ Core Technical Specifications

### State Management
Managed using client-side **React Context Providers** (`AuthProvider` and `CartProvider`). By isolating context hooks to their corresponding pages, the site achieves efficient component rendering.

### Performance Optimization
* **Static Rendering**: The landing page and product details layouts are compiled server-side, reducing Time-to-First-Byte (TTFB).
* **Next/Image Whitelisting**: Image domains are filtered inside `next.config.ts`, enabling optimization of external image sizes.
* **Lazy Component Operations**: Heavy logic modules use React client-side rendering boundaries to reduce bundling payloads.

### Key Assumptions & Guidelines
1. **Offline-first Simplicity**: The static JSON database functions as a database mock, ensuring instant queries without database lag.
2. **Standard 18% tax**: Order tax calculations apply standard Indian GST rates (18%).
3. **Simulated Validation Delay**: Slight artificial timeouts are added during contact submissions to demo premium loading transitions.

---

## 🧪 Limitations
* Payment gateway portals are mocked.
* User account creation is simulated without backend database records.

---

## 🤖 AI Tools Used
* Developed in pair-programming collaboration with **Antigravity (by Google DeepMind)**.

---

## 🌐 Deployment

This application is ready for instant deployment to cloud hosts like **Vercel** or **Netlify**:
1. Connect this workspace repo to Vercel.
2. Ensure build command is configured as `npm run build` and output directory as `.next`.
3. Set the environment paths (no special environment variables required out of the box).
#   P r o d u c t - S h o w c a s e _ N e x t J S  
 