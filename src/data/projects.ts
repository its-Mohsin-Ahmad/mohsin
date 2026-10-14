import type { Project } from '../types'

/**
 * Real projects. Descriptions are based on the actual live sites.
 * Where a live preview could not be verified, `previewVerified` is false and a
 * neutral placeholder is shown in the UI (never a fabricated screenshot).
 * To add a future project, append an object here following the same shape.
 */
export const projects: Project[] = [
  {
    id: 'be-careful',
    title: 'Be Careful',
    tagline: 'Interactive web experience',
    description:
      'A web project by Mohsin Ahmad. The live destination is preserved below so visitors can explore the real application directly.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    links: {
      live: 'https://mohsinahmad0347-maker.github.io/Be-careful/',
      repo: 'https://github.com/mohsinahmad0347-maker',
    },
    previewVerified: false,
    accent: '#D9AE63',
    featured: true,
  },
  {
    id: 'grand-thief-autos',
    title: 'Grand Thief Autos',
    tagline: 'Luxury Car Rental Platform',
    description:
      'A luxury car rental website — "Drive Luxury. Own the Road." It showcases a premium fleet of over 500 vehicles, category browsing, rental packages, featured vehicle detail pages, testimonials, and a booking enquiry flow.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    links: {
      live: 'https://gta-rental-cars.vercel.app/',
    },
    previewVerified: true,
    accent: '#E0A458',
    featured: true,
  },
  {
    id: 'vectoria',
    title: 'Vectoria',
    tagline: 'Premium Corporate Solutions Site',
    description:
      'A professional corporate consulting landing page built for "Victoria – The Great Business." It presents enterprise services, global-reach messaging, pricing tiers, an insights journal, and a consultation enquiry section with a polished, animation-rich layout.',
    technologies: ['React', 'JavaScript', 'CSS3', 'Responsive Design'],
    links: {
      live: 'https://vectoria-nine.vercel.app/',
    },
    previewVerified: true,
    accent: '#9FB4A0',
    featured: true,
  },
  {
    id: 'you-can',
    title: 'YOU CAN',
    tagline: 'Fitness & Training Experience',
    description:
      'A fitness-focused website built around the motivational tagline "Train Strong. Move Better. You Can." A bold, high-energy frontend layout for a training brand.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    links: {
      live: 'https://you-can-opal.vercel.app/',
    },
    previewVerified: true,
    accent: '#C97B5A',
    featured: true,
  },
  {
    id: 'razdar',
    title: 'RAZDAR',
    tagline: 'Brand Experience Site',
    description:
      'A brand-driven website themed "Your World. Your Choice." A modern frontend build emphasizing strong visual identity and an immersive landing experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    links: {
      live: 'https://its-razdar.vercel.app/',
    },
    previewVerified: true,
    accent: '#7E8FA6',
    featured: true,
  },
]
