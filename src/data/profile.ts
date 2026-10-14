import type { ProfileInfo } from '../types'

export const profile: ProfileInfo = {
  fullName: 'Mohsin Ahmad',
  monogram: 'MA',
  headline:
    'Software Engineering Student | Frontend Developer | Data Analytics Enthusiast',
  roles: [
    'Software Engineering Student',
    'Frontend Developer',
    'Data Analytics Enthusiast',
  ],
  about:
    "I'm Mohsin Ahmad, a Software Engineering student passionate about frontend development, interactive digital experiences, and data analytics. I enjoy building responsive websites, designing intuitive interfaces, and turning information into meaningful visual insights using Microsoft Excel and Power BI. I am continuously developing my technical skills through practical projects, experimentation, and learning.",
  education: {
    degree: 'BS Software Engineering',
    institution: 'Islamia College Peshawar',
    period: '2025–2029',
    gpa: '4.00/4.00',
    location: 'Peshawar, KPK, Pakistan',
  },
  location: 'Peshawar, KPK, Pakistan',
  email: 'mohsinahmad0347@gmail.com',
  phone: '+92 330 5205409',
  socials: {
    github: 'https://github.com/mohsinahmad0347-maker',
    linkedin:
      'https://www.linkedin.com/in/mohsin-ahmad%C2%AE-92356b403/',
    facebook: 'https://www.facebook.com/profile.php?id=61586514629344',
  },
  // Base-aware so the CV resolves correctly on GitHub Pages (/mohsin/) and locally (/).
  cvPath: `${import.meta.env.BASE_URL}assets/cv/Mohsin-Ahmad-CV.pdf`,
}
