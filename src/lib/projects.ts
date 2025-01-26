export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "azure-arm-template",
    title: "Azure ARM Template to deploy VMs",
    description: "This ARM template is used to deploy VMs in Azure. It creates a resource group, a virtual network, a subnet, a public IP address, a network interface, and a virtual machine. This project automates the deployment of an Azure Virtual Machine (VM) through an Azure Resource Manager (ARM) template and a PowerShell script. The PowerShell script runs as an extension on the initial VM and creates five additional VMs. You can manually upload the ARM template to our Azure account and run the PowerShell script within Azure Cloud Shell. Furthermore, the entire deployment process can be automated using GitHub Actions, ensuring continuous integration and deployment (CI/CD).",
    image: "/azure_vm.png",
    technologies: ["Azure ARM Template", "Azure Storage", "Azure Active Directory", "GitHub Actions", "PowerShell", "Shell Scripting"],
    githubUrl: "https://github.com/ntanwir10/Azure_ARM_VM",
    // liveUrl: "https://portfolio.yourdomain.com",
    featured: true,
  },
  {
    id: "cloudUpload",
    title: "Cloud Upload CLI",
    description: "This is an efficient bash-based CLI tool allows quick and effortless file uploads to Amazon S3 cloud storage, ensuring a user-friendly experience with enhanced features.",
    image: "/clouduploadcli.png",
    technologies: ["Bash", "Shell Scripting", "AWS CLI", "AWS S3", "AWS IAM"],
    githubUrl: "https://github.com/ntanwir10/Bash-CloudUploaderCLI",
    // liveUrl: "https://github.com/ntanwir10/cloud-upload-cli",
    featured: true,
  },
  {
    id: "city_api",
    title: "All-in-One City API",
    description: "The All-in-One City API provides comprehensive, city-specific data, including weather, news, events, traffic, and general city information. It is designed for developers building applications that require dynamic and scalable city-related data services. Built with NodeJS and ExpressJS.",
    image: "/city_api.png",
    technologies: ["Node.js", "Express", "helmet", "CORS", "Rate Limiting", "OpenWeatherMap API", "WeatherAPI", "GNEWS" , "Eventbrite API", "Tom Tom Traffic API", "Geo Coding API", "Geo Names API"],
    githubUrl: "https://github.com/ntanwir10/city_api_server",
    // liveUrl: "https://github.com/ntanwir10/cloud-upload-cli",
    featured: true,
  },
  {
    id: "scrape_free_proxy",
    title: "Scrape Free Proxy",
    description: "A simple Node.js tool that fetches and saves HTTP proxy servers from ProxyScrape API.",
    image: "/scrape_free_proxy.png",
    technologies: ["Node.js", "ProxyScrape API"],
    githubUrl: "https://github.com/ntanwir10/scrape-free-proxy",
    // liveUrl: "https://github.com/ntanwir10/cloud-upload-cli",
    featured: true,
  },
  {
    id: "terminal_website",
    title: "My Terminal Website",
    description: "A terminal or a command prompt-inspired portfolio website built using next.js and typescript.",
    image: "/terminal_website.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/ntanwir10/react-terminal-website",
    liveUrl: "https://react-terminal-website.vercel.app/",
    featured: true,
  },
  {
    id: "covid_tracker",
    title: "COVID-19 Tracker",
    description: "A simple and responsive COVID-19 tracker built using React, TypeScript, and Tailwind CSS. It fetches data from the Rapid API and displays it in a table format. The data is fetched every 10 seconds and updated in real-time. The table is sorted by the number of cases in descending order. The table is also responsive and can be viewed on any device.",
    image: "/covid.png",
    technologies: ["React", "Material UI", "Charts.js", "Numeral.js", "Leaflet.js"],
    githubUrl: "https://github.com/ntanwir10/react-covid-app",
    liveUrl: "https://react-covid-app-575115.netlify.app/",
    featured: true,
  },
  {
    id: "trello_clone",
    title: "Trello Clone",
    description: "A simple and responsive Trello clone built using React, Redux and Material-UI. It allows you to create, edit, and delete boards, columns, and cards. It also allows you to drag and drop cards between columns. The project is fully responsive and can be viewed on any device.",
    image: "/trello_clone.png",
    technologies: ["React", "Redux", "Material UI", "styled-components"],
    githubUrl: "https://github.com/ntanwir10/react-trello-clone/",
    liveUrl: "https://react-trello-clone-5ae01e.netlify.app/",
    featured: true,
  },
]; 