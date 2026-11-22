# Luka Fruidze - Modern Developer Portfolio (React & Tailwind CSS)

A modern, high-end, component-driven portfolio website engineered with **React 18**, **Tailwind CSS**, and **Vite**.

## 🌟 Key Features

- **Component-Driven Architecture**: Modular breakdown of pages and reusable visual components (`SkillCard`, `ProjectCard`, `TeamCard`, `PostCard`, `SectionHeader`, `Modal`, `Button`, `Badge`, `Card`).
- **Multi-Page Experience**:
  - **Home Page (`/`)**: Hero with dynamic role typewriter, About narrative with TBC Academy spotlight, Skills with category filters, Featured Projects with interactive CSS mockups, and Contact Form.
  - **Community Page (`/#community`)**: Dedicated second page integrating live REST API data from JSONPlaceholder (`/users` and `/posts`).
- **Real-Time Search & Filtering**:
  - Instant search filtering by Member Name, @Username, Company, and Email.
  - Category / Company filter chips and A-Z sorting.
  - Live search status counter (*"Found X of 10 members"*).
- **JSONPlaceholder API Integration**:
  - Fetches users asynchronously via `GET https://jsonplaceholder.typicode.com/users`.
  - Dynamic user publications fetched on demand via `GET https://jsonplaceholder.typicode.com/posts?userId={id}` inside a glassmorphic modal.
- **Mobile Responsive & Burger Menu**:
  - Adapts to all screen sizes with CSS Grid & Flexbox.
  - Animated mobile drawer with backdrop blur, closing automatically on navigation.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

