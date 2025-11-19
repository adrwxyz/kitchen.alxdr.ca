# Contributing to Jekyll Recipe Starter

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance design
- 🔧 Fix issues
- ➕ Add new recipes (for examples)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/new-jekyll-recipe-starter.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes locally
6. Commit: `git commit -m "Description of changes"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

### Prerequisites

- Ruby 2.7 or higher
- Bundler
- Node.js 14+ and npm
- Git

### Local Development

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install

# Build Tailwind CSS
npm run build

# Run local server
bundle exec jekyll serve --livereload

# For active development (2 terminals):
# Terminal 1: Watch Tailwind CSS
npm run dev

# Terminal 2: Run Jekyll
bundle exec jekyll serve --livereload

# Open http://localhost:4000
```

## Code Style

### HTML/Liquid
- Use 2 spaces for indentation
- Keep templates readable and well-commented
- Follow Jekyll best practices

### CSS/SCSS
- Use BEM naming convention where appropriate
- Keep specificity low
- Use CSS custom properties for theming
- Mobile-first approach
- Comment complex selectors

### JavaScript
- Use vanilla JavaScript (no jQuery)
- ES6+ syntax is fine
- Keep it simple and performant
- Comment non-obvious code
- Progressive enhancement

## Recipe Guidelines

When adding example recipes:

### Required Fields
```yaml
layout: recipe
title: "Recipe Name"
description: "Brief description"
date: YYYY-MM-DD
categories: [Category]
tags: [tag1, tag2]
difficulty: Easy/Medium/Hard
prep_time: X
cook_time: X
total_time: X
servings: X
ingredients: [...]
instructions: [...]
```

### Best Practices
- Use clear, descriptive titles
- Write concise descriptions (120 chars max)
- Include all timing information
- List ingredients in order of use
- Write numbered instructions
- Add helpful notes
- Include nutrition info when possible

## Testing

Before submitting a PR:

### Automated CI Testing
All PRs automatically run through our CI workflow which:
- ✅ Builds Tailwind CSS
- ✅ Builds Jekyll site
- ✅ Verifies critical files exist
- ✅ Checks for build errors

**Wait for CI to pass** before requesting review!

### Local Testing
```bash
# Build everything
npm run build
bundle exec jekyll build

# Verify no errors
echo $?  # Should output 0
```

### Visual Testing
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Chrome Mobile)
- [ ] Test dark mode
- [ ] Test light mode
- [ ] Test print layout

### Functional Testing
- [ ] Search works correctly
- [ ] Navigation works
- [ ] Recipe cards display properly
- [ ] Recipe pages render correctly
- [ ] All links work
- [ ] Images load (or gracefully fail)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Proper heading hierarchy
- [ ] Alt text on images
- [ ] Color contrast passes WCAG AA

## Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** on multiple devices
3. **Write clear commit messages**
4. **Reference any related issues**
5. **Keep PRs focused** - one feature/fix per PR
6. **Be responsive** to feedback

### PR Title Format
```
[Type] Brief description

Types: Feature, Fix, Docs, Style, Refactor, Test, Chore
```

Examples:
- `[Feature] Add recipe rating system`
- `[Fix] Correct mobile navigation bug`
- `[Docs] Update installation instructions`

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI improvement
- [ ] Code refactoring

## Testing
How you tested these changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

## Reporting Bugs

### Before Reporting
- Check existing issues
- Test on latest version
- Try to reproduce consistently

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

## Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives considered**
Other solutions you've considered

**Additional context**
Any other relevant information
```

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other unprofessional conduct

## Questions?

- Open an issue for questions
- Tag with `question` label
- Be specific and provide context

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Appreciated in the community!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
