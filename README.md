# 🌟 Good Vibes Dashboard

A positive-first dashboard designed to bring a little sunshine to your screen. This project, built with Angular 20, Vite, and Tailwind CSS, focuses on curating and displaying only uplifting and useful information from a user-selected city. It's a digital space free from the negativity of the typical news cycle.

![Good Vibes Dashboard Screenshot](link_to_your_screenshot.png)
_To add a screenshot: Take a picture of your running application, add it to the project (e.g., in a new `docs` folder), and update the link above._

## ✨ About The Project

In a world saturated with often overwhelming and negative news, the Good Vibes Dashboard was created as a personal oasis. The idea was to build a simple, beautiful, and performant web application that provides a daily dose of positivity. When a user selects a city, they are greeted with the day's weather, a stunning photo of their location, a handpicked selection of strictly good news, an inspiring quote, and a song to lift their spirits.

This project was built from the ground up as a learning experience for **Angular 20** and the latest in web development best practices (as of 2025).

## 🚀 Key Features

- **Dynamic Weather:** Fetches and displays the current weather for any searched city, complete with temperature and a dynamic icon.
- **Positive-Only News Feed:** Uses an advanced API query with additive and subtractive filtering to find good news stories while explicitly excluding negative topics like crime, disasters, and health crises. Presented in an interactive carousel.
- **Photo of the Day:** Displays a beautiful, high-quality photograph of the selected city, sourced from the Unsplash API.
- **Song of the Day:** Features an embedded YouTube player with a random, uplifting song recommendation that the user can play directly.
- **Mindful Moment:** Presents an inspiring quote to encourage a moment of reflection.
- **Art-Directed Responsive Design:** A fully responsive layout built with Tailwind CSS Grid that provides a custom, polished experience on desktop, tablet, and mobile devices.
- **Smooth Animations:** Fluid and engaging UI animations orchestrated with GSAP (GreenSock Animation Platform) for a high-end feel.
- **User Personalization:** Remembers the user's last searched city using `localStorage` and loads it automatically on their next visit.
- **Progressive Web App (PWA):** Fully installable on mobile and desktop devices for an app-like experience and offline access.

## 🛠️ Tech Stack

This project leverages a modern, performant, and developer-friendly tech stack:

- **[Angular 20](https://angular.dev/):** Built with Standalone Components, Signals, and the new Zoneless change detection strategy.
- **[TypeScript](https://www.typescriptlang.org/):** For robust, type-safe code.
- **[Vite](https://vitejs.dev/):** The default lightning-fast development server for Angular.
- **[Tailwind CSS](https://tailwindcss.com/):** For utility-first styling and a beautiful, custom design system.
- **[GSAP](https://gsap.com/):** The industry standard for high-performance web animations.
- **[Swiper.js](https://swiperjs.com/):** For the interactive and touch-friendly news carousel.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://your_repo_link/good-vibes-dashboard.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd good-vibes-dashboard
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up your API Keys:**
    You will need free API keys from three services. Create a new file at `src/environments/environment.ts` and paste the following content, replacing the placeholder keys with your own.

    ```typescript
    // src/environments/environment.ts
    export const environment = {
      production: false,
      openWeather: {
        apiKey: "YOUR_OPENWEATHERMAP_API_KEY_HERE", // From openweathermap.org
      },
      newsApi: {
        apiKey: "YOUR_NEWSAPI_API_KEY_HERE", // From newsapi.org
      },
      unsplash: {
        apiKey: "YOUR_UNSPLASH_ACCESS_KEY_HERE", // From unsplash.com/developers
      },
    };
    ```

### Running the Application

1.  **Run the development server:**
    ```sh
    ng serve
    ```
2.  Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building for Production

To create a production-ready build, run:

```sh
ng build

```

## Authors

- [@Christos_Samourelis](https://www.github.com/https://github.com/chris-samou)
