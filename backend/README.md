# Express TypeScript ESLint Prettier Template

A modern starter template for building Express.js applications with TypeScript, ESLint, Prettier, Vitest, Husky, lint-staged, and GitHub Actions.

## Prerequisites

- **Node.js** v22 (use NVM with `.nvmrc`)
- **npm**
- **Git**
- **VS Code** (recommended)

## Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url> <new-repo-name>
   cd <new-repo-name>
   ```

2. **Switch Node version**

   ```bash
   nvm install
   nvm use
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

## Available Scripts

| Script                 | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Run the server in watch mode (`tsx --watch src/index.ts`) |
| `npm run start`        | Run the compiled code (`node dist/index.js`)              |
| `npm run build`        | Compile TypeScript to JavaScript                          |
| `npm run type-check`   | Run TypeScript without emitting files                     |
| `npm run lint`         | Check code with ESLint                                    |
| `npm run lint:fix`     | Fix linting issues automatically                          |
| `npm run format`       | Format code with Prettier                                 |
| `npm run format:check` | Check formatting without changes                          |
| `npm run test`         | Run tests with Vitest                                     |
| `npm run coverage`     | Generate test coverage report                             |

## Environment Variables

- Copy `.env.example` to `.env` and fill in values (e.g., `PORT=3000`).

## Git Hooks & CI

- **Husky & lint-staged**: runs type-check, lint and format checks on staged files before commit.
- **GitHub Actions**: CI workflow in `.github/workflows/ci.yml` to run tests, type-check, lint, format on push to `main`.

## License

This project is licensed under the MIT License.
