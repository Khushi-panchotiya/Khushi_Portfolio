/* =========================================================
   EDIT YOUR CONTENT HERE
   Add / remove entries in these arrays. The page rebuilds
   itself from them on load — no HTML editing needed.
   ========================================================= */

window.PORTFOLIO = {

  /* ---- FEATURED PROJECTS ----
     The 3 projects shown at the top of the Projects section,
     each with a cover image and its own detail page.

       slug   – must match the file name in /projects (slug.html)
       cover  – image in /assets/projects (a gradient tile shows
                if the file is missing)
       repo   – GitHub URL (optional)
       demo   – live demo URL (optional)
  */
  featuredProjects: [
    {
      slug: "titanic-survival-prediction",
      title: "Titanic Survival Prediction",
      blurb: "End-to-end ML pipeline with an XGBoost model tuned to 82% accuracy.",
      tags: ["Python", "XGBoost", "scikit-learn", "Pandas"],
      cover: "assets/projects/titanic-survival-prediction.png",
      repo: "https://github.com/Khushi-panchotiya/titanic-survival-prediction",
      demo: ""
    },
    {
      slug: "feedforward-neural-network",
      title: "Feedforward Neural Network from Scratch",
      blurb: "Forward pass, backprop, and SGD with momentum by hand in NumPy, benchmarked against scikit-learn.",
      tags: ["Python", "NumPy", "Deep Learning", "Backprop"],
      cover: "assets/projects/feedforward-neural-network.png",
      repo: "https://github.com/Khushi-panchotiya/Feedforward-Neural-Network-from-Scratch",
      demo: ""
    },
    {
      slug: "neuroevolution-cartpole",
      title: "Neuroevolution Lab: CartPole",
      blurb: "Interactive Streamlit app that solves CartPole-v1 with Evolutionary Strategies.",
      tags: ["Python", "NumPy", "Gymnasium", "Streamlit"],
      cover: "assets/projects/project-three.png",
      repo: "https://github.com/Khushi-panchotiya/cartPole",
      demo: ""
    }
  ],

  /* ---- OTHER PROJECTS ----
     Everything else on your GitHub. Shown as a finite carousel
     (arrows stop at both ends — it does not loop). Add a repo
     here whenever you push a new one.
  */
  otherProjects: [
    {
      title: "8-Puzzle Problem Solver",
      blurb: "Four state-space search algorithms (BFS, DFS, UCS, A*) for the 8-puzzle, comparing time, space, and path optimality.",
      tags: ["Python", "AI", "Search"],
      repo: "https://github.com/Khushi-panchotiya/8-Puzzle-Problem-Solver"
    },
    {
      title: "Disaster Early-Warning System from Social Media Chatter",
      blurb: "Using social media data to predict and warn about potential disasters.",
      tags: ["Data Analysis", "Python"],
      repo: "https://github.com/Khushi-panchotiya/Early-Warning-system"
    },
    {
      title: "Tic-Tac-Toe (Minimax)",
      blurb: "An unbeatable Tic-Tac-Toe opponent driven by the minimax algorithm.",
      tags: ["Python", "Minimax"],
      repo: "https://github.com/Khushi-panchotiya/tic-tac-toe-game"
    },
    {
      title: "ESP32 Reaction Timer",
      blurb: "An ESP32 flashes an LED at a random moment and times how fast you hit the button, tracking your personal best.",
      tags: ["C++", "ESP32", "Embedded"],
      repo: "https://github.com/Khushi-panchotiya/ESP32-reaction-time"
    },
    {
      title: "dh-aes-image-encryption",
      blurb: "Encrypt and decrypt images using AES in Python.",
      tags: ["Python", "Cryptography"],
      repo: "https://github.com/Khushi-panchotiya/dh-aes-image-encryption"
    }
  ],

  /* ---- WORK EXPERIENCE (kept basic) ---- */
  experience: [
    {
      role: "Web Development Intern",
      meta: "Reality Craft Pvt. Ltd. · May 2026 – Jul 2026 · Ahmedabad, India (Remote)",
      detail: "Contributed to the development of enterprise web applications using C#, .NET 8, Blazor, Entity Framework Core, and SQL Server."
    },
    {
      role: "Civic and Social Service Internship",
      meta: "Visamo Kids Foundation · Jun 2024 · Ahmedabad, India (On-site)",
      detail: "Completed a two-week Civic & Social Service Internship with Visamo Kids Foundation, an NGO supporting underprivileged children's education in Ahmedabad."
    }
  ],

  /* ---- LICENSES & CERTIFICATIONS ----
     url – the "Show credential" link (leave "" to hide the button)
  */
  certifications: [
    {
      title: "Ultimate Web Development Course 2026 – Build Modern Websites",
      issuer: "Udemy",
      meta: "Issued Jul 2026 · Credential ID UC-91d0bea5-d7b6-4110-ba3a-1427b43bf8ba",
      skills: ["Web Development", "Front-End Development", "AI Integration"],
      blurb: "Officially completed the 22-hour Ultimate Web Development bootcamp by Haris Ali Khan on Udemy, covering modern web tools and AI integration.",
      image: "assets/certificates/udemy-web-dev.jpg",
      url: ""
    },
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Coursera",
      meta: "Issued Feb 2026",
      skills: ["Data Analysis", "Tableau", "R"],
      blurb: "9-course program covering the complete data analysis lifecycle: asking the right questions, preparing and processing data, exploratory data analysis, data visualization, and sharing insights.",
      image: "assets/certificates/google-data-analytics.jpg",
      url: ""
    }
  ],

  /* ---- COLLEGE LAB WORK ---- */
  labs: [
    {
      title: "Data Structures Lab",
      blurb: "Implemented balanced trees, hashing and graph traversals from scratch in C++.",
      tags: ["C++", "DSA"],
      link: "#"
    },
    {
      title: "Operating Systems Lab",
      blurb: "Built a small shell and experimented with scheduling algorithms.",
      tags: ["C", "OS"],
      link: "#"
    },
    {
      title: "DBMS Lab",
      blurb: "Designed a normalized schema and wrote non-trivial SQL for a library system.",
      tags: ["SQL", "ER modeling"],
      link: "#"
    }
  ]
};
