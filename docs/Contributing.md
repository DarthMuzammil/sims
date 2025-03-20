# Contributing to Sims Game

Thank you for your interest in contributing to the Sims Game project! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn
- Git

### Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/sims-game.git
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style
- Use TypeScript for new components and features
- Follow ESLint configuration
- Use meaningful variable and function names
- Comment complex logic
- Write unit tests for new features

### Commit Messages
- Use clear and descriptive commit messages
- Follow conventional commits format:
  - feat: New feature
  - fix: Bug fix
  - docs: Documentation changes
  - style: Code style changes
  - refactor: Code refactoring
  - test: Test updates
  - chore: Maintenance tasks

### Pull Request Process
1. Update documentation to reflect changes
2. Add tests for new features
3. Ensure all tests pass
4. Update the Context.md file with your changes
5. Create a pull request with a clear description
6. Link relevant issues

### Component Guidelines
- Use functional components with hooks
- Follow React best practices
- Implement responsive design
- Ensure accessibility compliance
- Document props and interfaces

### Testing
- Write unit tests for new components
- Include integration tests where necessary
- Test across different browsers
- Ensure mobile responsiveness

## Project Structure
```
sims/
├── docs/           # Project documentation
├── components/     # React components
├── pages/          # Next.js pages
├── styles/         # CSS/SCSS files
├── utils/          # Utility functions
├── tests/          # Test files
└── public/         # Static assets
```

## Communication
- Use GitHub Issues for bug reports
- Use Discussions for feature requests
- Be respectful and constructive
- Follow the code of conduct

## Code of Conduct
- Be respectful of others
- Use inclusive language
- Accept constructive criticism
- Focus on what's best for the community

## Questions?
If you have questions, please open a GitHub Discussion or reach out to the maintainers.

Thank you for contributing to make the Sims Game better! 