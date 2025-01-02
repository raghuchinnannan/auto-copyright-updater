# Auto Copyright Updater

Auto Copyright Updater is a webpack plugin that automatically manages copyright year information in your website's footer. It intelligently handles both single year and year range formats, making it perfect for keeping your copyright notices current across all your web properties.

## Features

The plugin provides a rich set of features to handle various copyright date scenarios:

- Automatic year updates during your build process
- Support for both single year and year range formats
- Configurable year range delimiters
- Flexible text templates for copyright notices
- Multiple options for managing start years
- Custom HTML selector support
- Seamless webpack integration
- Detailed logging for debugging

## Installation

You can install the plugin using npm:

```bash
npm install auto-copyright-updater --save-dev
```

## Basic Usage

The simplest way to use the plugin is to add it to your webpack configuration:

```javascript
const AutoCopyrightUpdater = require('auto-copyright-updater');

module.exports = {
  plugins: [
    new AutoCopyrightUpdater({
      template: '© ${year} Your Company Name'
    })
  ]
};
```

Your HTML should include a copyright element within a footer:

```html
<footer>
  <div class="copyright">© 2023 Your Company Name</div>
</footer>
```

## Configuration Options

The plugin accepts a comprehensive set of configuration options to customize its behavior:

```javascript
new AutoCopyrightUpdater({
  // File Selection
  pattern: '**/*.html',  // Glob pattern for finding HTML files
  
  // Element Selection
  footerSelector: 'footer',  // CSS selector for footer element
  copyrightSelector: '.copyright',  // CSS selector for copyright element
  
  // Year Formatting
  format: 'range',  // 'range' or 'current'
  startYear: 2020,  // Explicit start year (optional)
  rangeDelimiter: '-',  // Separator for year ranges
  preserveStartYear: true,  // Whether to keep existing year from HTML
  
  // Content
  template: '© ${year} Company Name'  // Template with year placeholder
})
```

## Year Handling Strategies

### 1. Current Year Only

Use this when you want to display just the current year:

```javascript
new AutoCopyrightUpdater({
  format: 'current',
  template: '© ${year} Company Name'
})
// Output: © 2024 Company Name
```

### 2. Year Range with Explicit Start

Set a specific start year for your copyright range:

```javascript
new AutoCopyrightUpdater({
  format: 'range',
  startYear: 2020,
  rangeDelimiter: ' to ',
  template: '© ${year} Company Name'
})
// Output: © 2020 to 2024 Company Name
```

### 3. Preserve Existing Start Year

Maintain the original year found in your HTML:

```javascript
new AutoCopyrightUpdater({
  format: 'range',
  preserveStartYear: true,
  rangeDelimiter: '-',
  template: '© ${year} Company Name'
})
// If HTML contains "© 2018 Company Name"
// Output: © 2018-2024 Company Name
```

## Start Year Resolution Logic

The plugin determines the start year using the following priority order:

1. Explicitly provided `startYear` in configuration
2. Existing year from HTML if `preserveStartYear` is true
3. Current year as a fallback

## Custom Templates

The template system is flexible and allows for various copyright notice formats:

```javascript
// Simple copyright
template: '© ${year} Company Name'

// More formal copyright
template: 'Copyright © ${year} Company Name. All rights reserved.'

// Multi-line copyright
template: 'Copyright © ${year}\nCompany Name Inc.'
```

## HTML Structure Requirements

Your HTML should follow this basic structure for the plugin to work:

```html
<!DOCTYPE html>
<html>
<body>
  <footer>
    <div class="copyright">© 2023 Company Name</div>
  </footer>
</body>
</html>
```

The selectors in your configuration should match your HTML structure:

```javascript
new AutoCopyrightUpdater({
  footerSelector: '#main-footer',  // For <footer id="main-footer">
  copyrightSelector: '.copyright-text'  // For <div class="copyright-text">
})
```

## Advanced Usage

### Custom Year Range Formatting

You can customize how year ranges appear:

```javascript
// Using a word separator
new AutoCopyrightUpdater({
  format: 'range',
  rangeDelimiter: ' to ',
  template: '© ${year} Company Name'
})
// Output: © 2020 to 2024 Company Name

// Using custom punctuation
new AutoCopyrightUpdater({
  format: 'range',
  rangeDelimiter: ' ~ ',
  template: '© ${year} Company Name'
})
// Output: © 2020 ~ 2024 Company Name
```

## Error Handling

The plugin includes comprehensive error checking:

- Validates all configuration options
- Provides detailed error messages
- Logs warnings for missing elements
- Ensures year values are reasonable

## Debugging

Enable webpack's debug logging to see detailed plugin operations:

```javascript
module.exports = {
  infrastructureLogging: {
    level: 'verbose'
  }
}
```

## TypeScript Support

Type definitions are included. For TypeScript projects:

```typescript
import AutoCopyrightUpdater from 'auto-copyright-updater';
```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your changes include tests and documentation updates.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/raghuchinnannan/auto-copyright-updater/issues)
2. Review the documentation
3. Open a new issue if needed

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes in each version.