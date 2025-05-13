export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  images: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  challenges: string[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "A modern take on the classic game with multiplayer capabilities and round system.",
    longDescription: "a modern, stylized version of the classic tic-tac-toe game, enhanced with multiplayer functionality and a round-based system. Designed for both fun and fast-paced interactions, it features smooth state management with Jotai, elegant UI styling via TailwindCSS and daisyUI, and is built entirely with React and TypeScript.",
    technologies: ["React", "Jotai", "TypeScript", "TailwindCSS", "daisy UI"],
    image: "/tic-tac-toe-tn2.jpg",
    images: [
      "/tic-tac-toe-tn2.jpg",
      "/tic-tac-toe-tn.jpg",
    ],
    githubUrl: "https://github.com/jojimer/tic-tac-toe",
    liveUrl: "#",
    features: [
      "Two-player turn-based game logic",
      "Live round tracking and scoreboard",
      "Minimalist, responsive game UI",
      "Game history and statistics tracking",
      "Global state via Jotai atoms",
      "Component-based structure with TypeScript",
      "Tailwind + daisyUI for styling"
    ],
    challenges: [
      "Managing turn logic and rounds",
      "Designing persistent game state",
      "Balancing minimalist yet engaging UI",
      "Handling tie and win conditions"
    ],
    learnings: [
      "Jotai for lightweight state management",
      "Game logic structuring in React",
      "Polished UI with daisyUI/Tailwind",
      "Dynamic rendering with TypeScript",
      "Real-time interactivity best practices"
    ]
  },
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    description: "A minimalist habit tracking application that helps users build and maintain positive daily routines.",
    longDescription: "A comprehensive habit tracking application designed to help users develop and maintain positive daily routines. The app features a clean, focused interface that eliminates distractions, emphasizes simplicity, and provides detailed analytics to help users understand their habit-forming patterns. Users can create custom habits, log daily completions, and view their progress over time through intuitive charts.",
    technologies: ["React", "Next.js", "TailwindCSS", "Recharts", "TypeScript"],
    image: "/habit-tracker-tn1.jpg",
    images: [
      "/habit-tracker-tn1.jpg",
      "/habit-tracker-ss.png"
    ],
    githubUrl: "https://github.com/jojimer/habit-tracker",
    liveUrl: "#",
    features: [
      "Daily, weekly, and monthly habit tracking",
      "Habit Catogories(Health, Productivity, & personal growth)",
      "Detailed progress analytics and visualizations using Recharts",
      "Customizable habit categories and goals",
      "Streak tracking and milestone celebrations",
      "Mobile-first responsive design",
      "Light/Dark mode toggle support",
      "Persistent data with local storage"
    ],
    challenges: [
      "Designing an intuitive user interface for complex habit tracking",
      "Managing complex state updates",
      "Creating meaningful analytics visualizations",
      "Ensuring mobile-responsive layout",
      "Enforcing strict TypeScript types"
    ],
    learnings: [
      "Advanced state management with React Query",
      "React integration in Next.js apps",
      "Clean UI using TailwindCSS",
      "UX principles for habit tracking",
      "Scalable architecture in Next.js",
      "Improved component design patterns"
    ]
  },
  {
    slug: "weather-app",
    title: "Weather Hub",
    description: "Real-time weather forecasting application with beautiful visualizations and location-based updates.",
    longDescription: "A sophisticated weather application that provides real-time weather data and forecasts with beautiful visualizations. The app features location-based weather updates, detailed meteorological data, and interactive weather maps. This project emphasizes API integration, reactive data handling, and meaningful visual communication, making it both a utility tool and a showcase of front-end craftsmanship.",
    technologies: ["React", "Recharts", "TypeScript", "OpenWeather API", "TailwindCSS"],
    image: "/weather-hub-tn.jpg",
    images: [
      "/weather-hub-tn.jpg",
      "/weather-app-ss.png"
    ],
    githubUrl: "https://github.com/jojimer/weather-app",
    liveUrl: "#",
    features: [
      "Real-time weather via OpenWeather API",
      "Interactive weather maps and radar",
      "Interactive charts with Recharts",
      "Auto location-based weather updates",
      "Severe weather alerts and notifications",
      "Hourly and weekly forecast options"
    ],
    challenges: [
      "Handling async API data updates",
      "Creating smooth animations for weather transitions",
      "Implementing accurate geolocation services",
      "Mapping weather data to charts",
      "Designing compact, responsive layouts"
    ],
    learnings: [
      "Dynamic data visualization with Recharts",
      "Working with third-party weather APIs",
      "Geo-based interactivity and UX logic",
      "Creating responsive data visualizations",
      "TypeScript for safer component design"
    ]
  }
];