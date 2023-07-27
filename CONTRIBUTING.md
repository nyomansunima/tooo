# Contributing Guide for Tooo

Welcome to the contributing guide for our Digital Product E-Commerce App! We appreciate your interest in contributing to this open-source project. By following this guide, you can make meaningful contributions to the project and help improve it for the entire community.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Setting Up the Development Environment](#setting-up-the-development-environment)
   - [Project Structure](#project-structure)
3. [Contributing](#contributing)
   - [Bug Reports and Feature Requests](#bug-reports-and-feature-requests)
   - [Code Contributions](#code-contributions)
   - [Submitting Pull Requests](#submitting-pull-requests)
4. [Code Guidelines](#code-guidelines)
   - [General Guidelines](#general-guidelines)
   - [NestJS Guidelines](#nestjs-guidelines)
   - [Next.js Guidelines](#nextjs-guidelines)
   - [Flutter Guidelines](#flutter-guidelines)
5. [Testing](#testing)
   - [Unit Tests](#unit-tests)
   - [Integration Tests](#integration-tests)
6. [Documentation](#documentation)
   - [Updating Documentation](#updating-documentation)
   - [Adding Code Comments](#adding-code-comments)
7. [Code Review](#code-review)
8. [Versioning](#versioning)
9. [License](#license)
10. [Acknowledgements](#acknowledgements)

## 1. Introduction

Our Digital Product E-Commerce App is a modern solution built using NestJS (backend), Next.js (frontend), and Flutter (mobile) to provide users with an easy and engaging online shopping experience for digital products. This contributing guide aims to help developers like you understand how to contribute effectively to the project.

## 2. Getting Started

### Setting Up the Development Environment

To contribute to the project, you'll need to set up your development environment. Follow these steps:

1. Clone the repository: `git clone https://github.com/nyomansunima/tooo.git`
2. Install the necessary dependencies for each part of the project (NestJS, Next.js, Flutter).
3. Start the development server for each part.

### Project Structure

The project is organized into the following directories:

```
digital-product-ecommerce-app/
|-- appps
|   |-- backend/         # NestJS backend code
|   |-- frontend/        # Next.js frontend code
|   |-- mobile/          # Flutter mobile app code
|-- .github/         # GitHub-related files (e.g., issue templates, workflows)
|-- LICENSE          # Project license
|-- CONTRIBUTING.md  # This contributing guide
|-- README.md        # Project README
```

## 3. Contributing

### Bug Reports and Feature Requests

If you encounter a bug while using the app or have a feature request, please check the [issue tracker](https://github.com/nyomansunima/tooo/issues) to see if it has been reported before. If not, feel free to open a new issue following the issue template.

### Code Contributions

We welcome code contributions to improve the app. Before you start coding, consider the following:

- Discuss your proposed changes in a GitHub issue or pull request comment to gather feedback from the maintainers and the community.
- Fork the repository and create a new branch for your feature or bug fix.
- Ensure your code follows the coding guidelines (see section 4).
- Write comprehensive unit and integration tests (see section 5).

### Submitting Pull Requests

When you're ready to submit your changes, follow these steps:

1. Push your changes to your forked repository.
2. Open a pull request against the `main` branch of the original repository.
3. Use the provided pull request template to describe your changes and link any relevant issues.
4. Ensure all automated tests pass successfully.

## 4. Code Guidelines

### General Guidelines

- Write clean and maintainable code following best practices.
- Use meaningful variable and function names.
- Keep functions short and focused on a single task.

### NestJS Guidelines

- Organize files using NestJS module structure.
- Utilize decorators for dependency injection, routing, etc.
- Apply middleware for logging, error handling, etc.

### Next.js Guidelines

- Use the built-in routing system and data fetching methods.
- Optimize performance by lazy-loading components when appropriate.
- Leverage Next.js features like server-side rendering (SSR) and static site generation (SSG) when needed.

### Flutter Guidelines

- Follow the Dart style guide and Flutter best practices.
- Use stateful and stateless widgets efficiently.
- Handle responsiveness and different screen sizes appropriately.

## 5. Testing

### Unit Tests

- Write unit tests for individual functions and components.
- Use testing libraries suitable for each part of the project (e.g., Jest for NestJS, React Testing Library for Next.js, Flutter Test for Flutter).

### Integration Tests

- Create integration tests to ensure different parts of the app work together correctly.
- Cover important user flows and edge cases.

## 6. Documentation

### Updating Documentation

- Maintain up-to-date documentation for the project in the `docs/` directory.
- Explain how to set up the development environment and run the app locally.
- Document any architecture decisions, configuration settings, etc.

### Adding Code Comments

- Add comments to clarify complex logic or tricky parts of the code.
- Follow a consistent commenting style.

## 7. Code Review

- Participate in code reviews and offer constructive feedback to others.
- Address feedback from reviewers professionally and promptly.

## 8. Versioning

We use [Semantic Versioning](https://semver.org/) for versioning the app. The version is updated as follows:

- MAJOR version for incompatible changes,
- MINOR version for new features and backwards-compatible changes, and
- PATCH version for backwards-compatible bug fixes.

## 9. License

By contributing to this project, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE).

## 10. Acknowledgements

Thank you for contributing to our Digital Product E-Commerce App! Your efforts help make this project better for everyone. If you have any questions or need assistance, don't hesitate to reach out to the maintainers or the community.

Happy coding! 🚀
