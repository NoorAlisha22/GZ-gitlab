# Customizable POD T-Shirt Store (React SPA)

This is a customizable Print-On-Demand (POD) T-shirt store built as a **React Single Page Application (SPA)**. It features an animated landing page, interactive product customization options, and is structured for future integration with backend APIs.

> **Note:** This project does not use Lit Web Components as I chose to implement it in **React**, which is allowed per the optional framework clause.

---

## Features

###  Part 1: Repeating Image Transition (Home Page)

- A pixel-perfect React replica of [Codrops' Repeating Image Transition](https://tympanus.net/Development/RepeatingImageTransition/)
- Animation logic implemented using React state and CSS transitions
- Responsive design with smooth automatic image cycling
- Navigation integrated to switch from home to product page (SPA routing)

###  Part 2: Product Customization Page

- **Base UI** from [CodePen by @jkantner](https://codepen.io/jkantner/full/OPJrMbp)
- **Dropdown menus** from [CodePen by @jh3y](https://codepen.io/jh3y/pen/QWPGwOr)
- Customization Inputs:
  - Height (default 180cm)
  - Weight (default 80kg)
  - Build (lean, regular, athletic, big; default: athletic)
- Product type selector (tshirt, hoodie, sleevie, cap) using radial menu
- Image uploader (drag & drop or click)
- Live preview with uploaded image
- Interactive 3D t-shirt component from [threejs-t-shirt repo](https://github.com/Starklord17/threejs-t-shirt)
- Input area to enter custom text (max 3 lines)
- Theme toggling using Alt+Q to switch between 3 layouts
- Cloudflare deployment

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm 

### Installation

```bash
git clone https://github.com/NoorAlisha22/GZ-gitlab.git
cd pod-tshirt-store
npm install
npm run dev
```
Visit http://localhost:5173 in your browser.

---

## Project Structure
  project-root/
  ├── public/
  │   └── images/
  │       └── [image files...]
  │
  ├── src/
  │   ├── components/
  │   │   ├── ImageTransition.jsx
  │   │   ├── ImageTransition.css
  │   │   ├── Navbar.jsx
  │   │   ├── Navbar.css
  │   │   ├── ProductCustomizer.jsx
  │   │   ├── ProductCustomizer.css
  │   │   ├── SizeCustomizer.jsx
  │   │   └── SizeCustomizer.css
  │   │
  │   ├── pages/
  │   │   ├── HomePage.jsx
  │   │   ├── HomePage.css
  │   │   ├── ProductPage.jsx
  │   │   └── ProductPage.css
  │   │
  │   ├── App.jsx
  │   ├── App.css
  │   ├── index.css
  │   └── main.jsx
  │
  ├── index.html
  ├── package.json
  ├── package-lock.json
  └── vite.config.js

---

## Deployment Instructions (Cloudflare)

1.Push your project to GitHub or GitLab.
2.Go to Cloudflare Pages, and connect your repository.
3.Set build settings:
   -Framework preset: None
   -Build command: npm run build
   -Output directory: dist
4.Deploy.

---

## How AI Was Used

ChatGPT was used for:
  -Reviewing layout and animation logic
  -Improving CSS for transitions and responsive design
  -Suggesting file structure and state management patterns
No code was copied directly. All AI-generated responses were adapted to fit this project's context.

---

## License

 This project is licensed under the MIT License.
