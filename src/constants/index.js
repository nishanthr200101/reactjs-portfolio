import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  amphisoft,
  hrlytics,
  portfolio,
  threejs,
  postgresql,
  next_js,
  nest_js,
  studio_diseno,
  terraform_git,
  socket_node,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web, 
  },
  {
    title: "Software Engineer",
    icon: mobile,
  },
  {
    title: "Fullstack Developer",
    icon: backend,
  },
  {
    title: "Product Engineer",
    icon: creator,
  },
];


const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: next_js,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Node JS",
    icon: nest_js,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Postgre SQL",
    icon: postgresql,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
];

const experiences = [
  {
    title: "Product Engineer",
    company_name: "Amhpisoft Technologies",
    icon: amphisoft,
    iconBg: "#383E56",
    date: "December 2021 - June 2022",
    points: [
      "Developed and maintained college websites, focusing on responsive design and user engagement",
      "Created mini-games for children using Konva and Three.js, ensuring an interactive and engaging experience",
      "Collaborated with cross-functional teams to meet project deadlines and deliver high-quality products",
    ],
  },
  {
    title: "Software Development Engineer",
    company_name: "HRLytics",
    icon: hrlytics,
    iconBg: "#E6DEDD",
    date: "July 2022 - Sept 2024",
    points: [
      "Developed and maintained dynamic frontend interfaces using React.js, improving the user experience and responsiveness of the platform",
      "Developed and integrated modular child React projects with a main application, reducing codebase size by 30% and improving loading times by 20%",
      "Integrated RESTful APIs and optimized frontend data handling to deliver real-time insights and features",
      "Collaborated closely with backend and testing teams to ensure seamless integration and accurate implementation of features",
      "Designed and implemented efficient state management solutions using Redux and Context API for scalable application development",
      "Contributed to the deployment and monitoring of the frontend applications, ensuring high availability and prompt issue resolution",
      "Mentored junior developers, guiding them through modern frontend technologies and best practices"
    ],
  },
  {
    title: "Fullstack Developer",
    company_name: "Studio Diseno",
    icon: studio_diseno,
    iconBg: "#E6DEDD",
    date: "Sept 2024 - Present",
    points: [
      "Will Update Soon...",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "My Portfolio",
    description:
      "A portfolio showcasing skills, projects and experiences as a frontend developer with interactive design elements.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/nishanthr200101/reactjs-portfolio",
  },
  {
    name: "Github Repo creation",
    description:
      "An automation tool for creating GitHub repositories, streamlining the setup process for new projects.",
    tags: [
      {
        name: "Terraform",
        color: "green-text-gradient",
      },
    ],
    image: terraform_git,
    source_code_link: "https://github.com/nishanthr200101/terraform-git",
  },
  {
    name: "Socket Chat",
    description:
      "A chat application built with React and Node.js, enabling seamless communication between users.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "node.js",
        color: "green-text-gradient",
      },
    ],
    image: socket_node,
    source_code_link: "https://github.com/nishanthr200101/chat-socket",
  },
];

export { services, technologies, experiences, testimonials, projects };
