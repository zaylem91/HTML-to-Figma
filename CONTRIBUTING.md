# Contributing to HTML-to-Figma

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/kbishopzz/HTML-to-Figma/issues)
- Create a new issue with a clear description and steps to reproduce
- Include browser version, Figma version, and sample JSON if applicable

### Suggesting Enhancements

- Open an issue describing your idea
- Explain why this enhancement would be useful
- Provide examples if possible

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run `npm run build` to ensure it compiles
5. Test your changes thoroughly
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/kbishopzz/HTML-to-Figma.git

# Install dependencies
npm install

# Build the plugin
npm run build

# Import to Figma Desktop
# Plugins → Development → Import plugin from manifest
```

## Code Style

- Use TypeScript for all code
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and readable

## Testing

- Test with multiple websites
- Verify browser extraction script works in Chrome, Firefox, Safari
- Check that Figma plugin handles edge cases

## Areas We'd Love Help With

- CSS Grid layout support
- Background image loading from URLs
- CSS gradient support (linear, radial)
- Better component deduplication
- SVG support
- Performance optimizations
- More comprehensive testing

## Questions?

Open an issue or discussion on GitHub!

Thank you for contributing! 🚀
