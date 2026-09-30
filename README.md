# ZeOrthodox

ZeOrthodox is a React website for exploring Ethiopian Orthodox Christian lessons and resources. The current project is a frontend-only Vite application with local lesson data and client-side navigation.

## What is included

- Home page with featured content, calls to action, and resource highlights.
- About page describing the project and its educational approach.
- Lesson tracks for Wednesday adults, Saturday youth, and Sunday youth.
- Search and category filtering within each lesson track.
- Expand-all and collapse-all controls for lesson categories.
- Download links for lesson PDFs when the corresponding files are available.
- Embedded video lessons with links to YouTube.
- English and Amharic language switching, persisted in `localStorage`.
- Light and dark theme switching.
- Responsive navigation, mobile menu, and footer links to social channels.
- Contact form validation with success and error states.

## Routes

| Path                       | Page                    |
| -------------------------- | ----------------------- |
| `/`                        | Home                    |
| `/about`                   | About and contact       |
| `/lessons`                 | Lesson track selection  |
| `/lessons/wednesday-adult` | Wednesday adult lessons |
| `/lessons/saturday-youth`  | Saturday youth lessons  |
| `/lessons/sunday-youth`    | Sunday youth lessons    |
| `/lessons/video`           | Video lessons           |

## Tech stack

- React 19
- Vite 7
- Plain CSS
- Local JavaScript data files
- Browser History API for client-side routing

There is currently no backend, database, authentication, quiz system, or user progress tracking in this repository. The contact helper is a placeholder and does not send or persist messages yet. Lesson catalogs are local data, and some entries are still placeholder lesson names.

## Project structure

```text
ze-orthodox/
├── front-end/
│   ├── public/              # Static assets served from the site root
│   ├── src/
│   │   ├── components/      # Navigation, footer, and shared icons
│   │   ├── context/         # Language and theme state
│   │   ├── data/            # Translations and lesson catalogs
│   │   ├── lib/             # Small client-side helpers
│   │   ├── pages/           # Home, lesson, and about page components
│   │   └── styles/          # Global styles
│   ├── package.json
│   └── vercel.json
└── README.md
```

## Run locally

Use a current Node.js release compatible with Vite 7, then run the commands from `front-end`:

```bash
cd front-end
npm install
npm run dev
```

The development server is normally available at `http://localhost:5173`.

Available scripts:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Static lesson files

Lesson downloads default to `/pdfs/<lesson-id>.pdf`. Add PDF files under `front-end/public/pdfs/` using the IDs from the lesson data if downloads are to work locally or in production. The current `public` directory does not include lesson PDFs.

## Deployment

The frontend includes a Vercel configuration that builds with `npm run build`, serves `dist`, and rewrites application routes to `index.html` so client-side navigation works after deployment.
