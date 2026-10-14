import type { SkillItem } from '../types'

/**
 * Technologies consistent with Mohsin Ahmad's actual skills and CV.
 * Each entry has a short, factual explanation of the tool's role.
 */
export const frontendSkills: SkillItem[] = [
  {
    name: 'HTML5',
    detail:
      'The standard markup language that structures every web page, defining content and semantics.',
    category: 'frontend',
  },
  {
    name: 'CSS3',
    detail:
      'Stylesheets that control layout, colour, spacing, and responsive behaviour across devices.',
    category: 'frontend',
  },
  {
    name: 'JavaScript',
    detail:
      'The programming language of the web that adds interactivity, logic, and dynamic behaviour.',
    category: 'frontend',
  },
  {
    name: 'React',
    detail:
      'A JavaScript library for building fast, component-based user interfaces with reusable pieces.',
    category: 'frontend',
  },
  {
    name: 'Bootstrap',
    detail:
      'A responsive CSS framework that speeds up building mobile-first layouts with ready-made components.',
    category: 'frontend',
  },
  {
    name: 'Tailwind CSS',
    detail:
      'A utility-first CSS framework for rapidly building custom designs directly in the markup.',
    category: 'frontend',
  },
  {
    name: 'Git',
    detail:
      'A version-control system that tracks code changes and enables safe collaboration.',
    category: 'frontend',
  },
  {
    name: 'GitHub',
    detail:
      'A platform for hosting Git repositories, collaborating on code, and deploying projects.',
    category: 'frontend',
  },
  {
    name: 'Visual Studio Code',
    detail:
      'A lightweight, extensible code editor used daily for writing and debugging projects.',
    category: 'frontend',
  },
]

export const analyticsSkills: SkillItem[] = [
  {
    name: 'Microsoft Excel',
    detail:
      'A spreadsheet application for organising data, calculations, and everyday analysis.',
    category: 'analytics',
  },
  {
    name: 'Excel Formulas',
    detail:
      'Functions such as SUMIFS, VLOOKUP, and IF that automate calculations and logic in spreadsheets.',
    category: 'analytics',
  },
  {
    name: 'Data Cleaning',
    detail:
      'Preparing raw data by removing errors and duplicates so analysis is accurate and reliable.',
    category: 'analytics',
  },
  {
    name: 'PivotTables',
    detail:
      'Interactive tables that summarise and cross-tabulate large datasets to reveal patterns.',
    category: 'analytics',
  },
  {
    name: 'Excel Charts',
    detail:
      'Bar, line, and pie charts that turn spreadsheet numbers into clear visual comparisons.',
    category: 'analytics',
  },
  {
    name: 'Power BI',
    detail:
      'A business-intelligence tool that builds interactive dashboards and reports from data.',
    category: 'analytics',
  },
  {
    name: 'Interactive Dashboards',
    detail:
      'Visual screens combining KPIs and charts that let users filter and explore data live.',
    category: 'analytics',
  },
  {
    name: 'Data Visualization',
    detail:
      'Turning raw data into charts and graphics so insights are easy to understand at a glance.',
    category: 'analytics',
  },
]

export const allSkills: SkillItem[] = [...frontendSkills, ...analyticsSkills]

export const developmentTools: string[] = [
  'Visual Studio Code',
  'Git',
  'GitHub',
  'Chrome DevTools',
  'Figma',
]

export const areasOfInterest: string[] = [
  'Frontend Website Development',
  'Responsive Interfaces',
  'UI Implementation',
  'Excel Analysis',
  'Power BI Dashboards',
  'Data Visualization',
]

export const learningTimeline = [
  {
    title: 'Frontend Development',
    detail: 'Building interfaces with HTML, CSS, JavaScript, and React.',
  },
  {
    title: 'Responsive Design',
    detail: 'Making layouts work cleanly across phone, tablet, and desktop.',
  },
  {
    title: 'Data Analytics',
    detail: 'Using Excel to organise, clean, and analyse real datasets.',
  },
  {
    title: 'Business Intelligence',
    detail: 'Creating dashboards and reports with Power BI.',
  },
  {
    title: 'Problem Solving',
    detail: 'Breaking down challenges and building practical solutions.',
  },
  {
    title: 'Continuous Learning',
    detail: 'Growing through hands-on projects, experiments, and new tools.',
  },
]
