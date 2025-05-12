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
    description: "A modern take on the classic game with real-time multiplayer capabilities and an unbeatable AI opponent.",
    longDescription: "A feature-rich implementation of the classic Tic-Tac-Toe game, offering both single-player mode against an AI and real-time multiplayer functionality. The AI opponent uses the minimax algorithm to make optimal moves, while the multiplayer mode enables real-time gameplay using WebSocket connections.",
    technologies: ["React", "TypeScript", "Socket.io", "TailwindCSS", "Node.js", "Express"],
    image: "/tic-tac-toe-tn2.jpg",
    images: [
      "/tic-tac-toe-tn2.jpg",
      "/tic-tac-toe-tn.jpg",
    ],
    githubUrl: "https://github.com/jojimer/tic-tac-toe",
    liveUrl: "#",
    features: [
      "Unbeatable AI opponent using minimax algorithm",
      "Real-time multiplayer functionality",
      "Beautiful animations and transitions",
      "Responsive design for all devices",
      "Game history and statistics tracking"
    ],
    challenges: [
      "Implementing an efficient minimax algorithm for the AI",
      "Managing real-time game state across multiple clients",
      "Optimizing performance for smooth animations"
    ],
    learnings: [
      "Deep understanding of game theory and AI algorithms",
      "WebSocket implementation for real-time applications",
      "State management in multiplayer scenarios"
    ]
  },
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    description: "A minimalist habit tracking application that helps users build and maintain positive daily routines.",
    longDescription: "A comprehensive habit tracking application designed to help users develop and maintain positive daily routines. The app features a clean, intuitive interface and provides detailed analytics to help users understand their habit-forming patterns.",
    technologies: ["Next.js", "Supabase", "TailwindCSS", "Framer Motion", "Chart.js", "TypeScript"],
    image: "/habit-tracker-tn1.jpg",
    images: [
      "/habit-tracker-tn1.jpg",
      "/habit-tracker-ss.png"
    ],
    githubUrl: "https://github.com/jojimer/habit-tracker",
    liveUrl: "#",
    features: [
      "Daily, weekly, and monthly habit tracking",
      "Detailed progress analytics and visualizations",
      "Customizable habit categories and goals",
      "Streak tracking and milestone celebrations",
      "Mobile-first responsive design"
    ],
    challenges: [
      "Designing an intuitive user interface for complex habit tracking",
      "Implementing efficient data synchronization with Supabase",
      "Creating meaningful analytics visualizations"
    ],
    learnings: [
      "Advanced state management with React Query",
      "Real-time database operations with Supabase",
      "Data visualization techniques with Chart.js"
    ]
  },
  {
    slug: "weather-app",
    title: "Weather App",
    description: "Real-time weather forecasting application with beautiful visualizations and location-based updates.",
    longDescription: "A sophisticated weather application that provides real-time weather data and forecasts with beautiful visualizations. The app features location-based weather updates, detailed meteorological data, and interactive weather maps.",
    technologies: ["React", "OpenWeather API", "Chart.js", "TailwindCSS", "TypeScript", "Axios"],
    image: "/weather-hub-tn.jpg",
    images: [
      "/weather-hub-tn.jpg",
      "/weather-app-ss.png"
    ],
    githubUrl: "https://github.com/jojimer/weather-app",
    liveUrl: "#",
    features: [
      "Real-time weather updates and forecasts",
      "Interactive weather maps and radar",
      "Detailed meteorological data visualization",
      "Location-based automatic updates",
      "Severe weather alerts and notifications"
    ],
    challenges: [
      "Handling complex API data from multiple weather services",
      "Creating smooth animations for weather transitions",
      "Implementing accurate geolocation services"
    ],
    learnings: [
      "Working with third-party weather APIs",
      "Geolocation and mapping integration",
      "Creating responsive data visualizations"
    ]
  }
];