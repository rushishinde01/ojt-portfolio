# OJT Team Portfolio

A data-driven agency landing page introducing our team and showcasing
all five capstone projects. Built with vanilla HTML, CSS, and JavaScript
as part of the On-Job Training Advanced JavaScript Capstone.

## Live Projects
| Project | Repo | Live |
|---|---|---|
| Quiz App | [ojt-quiz](https://github.com/rushishinde01/ojt-quiz.git) | [Live](https://ojt-quiz1.netlify.app) |
| Expense Tracker | [ojt-expense](https://github.com/rushishinde01/ojt-expense.git) | [Live](https://dreamy-palmier-432381.netlify.app) |
| News Feed | [ojt-news](https://github.com/rushishinde01/ojt-news.git) | [Live](https://ojt-live-news.netlify.app) |
| GitHub Explorer | [ojt-github-explorer](https://github.com/rushishinde01/ojt-github-explorer.git) | [Live](https://ojt-github-explorer.netlify.app) |
| Kanban Board | [ojt-kanban](https://github.com/rushishinde01/ojt-kanban.git) | [Live](https://ojt-kanban.netlify.app) |


## Features
- Team member cards with avatar, skills, and GitHub profile links
- Light / dark theme toggle persisted via localStorage
- Contact form with client-side validation
- Fully responsive from 320px mobile to desktop

## Project Structure
```
├── index.html
├── style.css
├── README.md
├── CONVENTIONS.md
└── js/
    ├── main.js       # Entry point — imports all modules, wires events
    ├── state.js      # Theme state only (light/dark)
    ├── render.js     # Renders team member cards from data array
    └── storage.js    # localStorage helpers for theme preference
```
