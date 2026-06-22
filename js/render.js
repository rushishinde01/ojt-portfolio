// render.js — DOM rendering only
// Reads from data arrays; never fetches, never imports from main.js

// ─── Team data ───────────────────────────────────────────────────────────────
const members = [
  {
    initials: 'RL',
    name: 'Rushikesh (Team Lead)',
    role: 'Portfolio',
    skills: ['DOM', 'Git', 'CSS'],
    github: 'https://github.com/rushishinde01',
    color: 'purple',
  },
  {
    initials: 'P2',
    name: 'Roshan Bhendekar',
    role: 'Quiz · Expense',
    skills: ['State', 'CRUD', 'localStorage'],
    github: 'https://github.com/roshanbhendekar',
    color: 'teal',
  },
  {
    initials: 'P3',
    name: 'Arman Sheikh',
    role: 'News · GitHub API',
    skills: ['Async', 'API', 'Fetch'],
    github: 'https://github.com/shaikharman8814-cloud',
    color: 'coral',
  },
  {
    initials: 'P4',
    name: 'Satyam Yadav',
    role: 'Kanban Board',
    skills: ['DnD', 'State', 'Storage'],
    github: 'https://github.com/satyamrakeshyaduvanshi',
    color: 'amber',
  },
];

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    name: 'Interactive Quiz',
    description:
      'Multiple choice quiz with live scoring and immediate visual feedback.',
    link: 'https://ojt-quiz1.netlify.app',
    icon: '❓',
  },
  {
    name: 'Expense Tracker',
    description: 'Full CRUD finance logger with localStorage persistence.',
    link: 'https://dreamy-palmier-432381.netlify.app',
    icon: '💰',
  },
  {
    name: 'Live News Feed',
    description:
      'Live articles from NewsAPI with search and category filters.',
    link: 'https://ojt-live-news.netlify.app',
    icon: '📰',
  },
  {
    name: 'GitHub Explorer',
    description:
      'Search GitHub profiles, repos, and language breakdowns.',
    link: 'https://ojt-github-explorer.netlify.app',
    icon: '🐙',
  },
  {
    name: 'Kanban Board',
    description:
      'Drag-and-drop task board with full state persistence.',
    link: 'https://ojt-kanban.netlify.app',
    icon: '📋',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build and return a team member card element.
 * @param {Object} member
 * @returns {HTMLElement}
 */
const buildMemberCard = (member) => {
  const card = document.createElement('article');
  card.className = 'card member-card';
  card.setAttribute('data-color', member.color);

  const skillTags = member.skills
    .map((s) => `<span class="skill-tag">${s}</span>`)
    .join('');

  card.innerHTML = `
    <div class="member-avatar" data-color="${member.color}">
      <span>${member.initials}</span>
    </div>
    <h3 class="member-name">${member.name}</h3>
    <p class="member-role">${member.role}</p>
    <div class="member-skills">${skillTags}</div>
    <a
      class="member-github"
      href="${member.github}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub profile of ${member.name}"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205
          11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235
          -3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
          -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23
          1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605
          -2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
          -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27
          1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23
          3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905
          1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81
          1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69
          .825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      GitHub
    </a>
  `;

  return card;
};

/**
 * Build and return a project card element.
 * @param {Object} project
 * @returns {HTMLElement}
 */
const buildProjectCard = (project) => {
  const card = document.createElement('article');
  card.className = 'card project-card';

  card.innerHTML = `
    <div class="project-icon" aria-hidden="true">${project.icon}</div>
    <h3 class="project-name">${project.name}</h3>
    <p class="project-desc">${project.description}</p>
    <a
      class="project-link"
      href="${project.link}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View ${project.name} project"
    >
      View Project →
    </a>
  `;

  return card;
};

// ─── Public render functions ──────────────────────────────────────────────────

/**
 * Render all team member cards into the #team-grid element.
 */
export const renderTeam = () => {
  const grid = document.getElementById('team-grid');
  if (!grid) return;
  grid.innerHTML = '';
  members.forEach((member) => grid.appendChild(buildMemberCard(member)));
};

/**
 * Render all project cards into the #projects-grid element.
 */
export const renderProjects = () => {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach((project) => grid.appendChild(buildProjectCard(project)));
};
