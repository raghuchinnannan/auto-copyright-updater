# Auto Copyright Updater

A webpack plugin that automatically updates copyright years in website footers. This plugin provides a seamless solution for maintaining current copyright information across your web properties.

## Key Features

The Auto Copyright Updater plugin offers several powerful features for managing copyright dates:

- Automatic year updates during build process
- Configurable date format options (single year or year range)
- Customizable separators for year ranges
- Flexible text templates
- Selective start year preservation
- Custom HTML selector support
- Seamless webpack integration

## Installation

Install the plugin using npm:

```bash
npm install auto-copyright-updater --save-dev
```

## Basic Implementation

```javascript
// webpack.config.js
const AutoCopyrightUpdater = require('auto-copyright-updater');

module.exports = {
  plugins: [
    new AutoCopyrightUpdater({
      format: 'range',
      template: '© ${year} Your Company Name'
    })
  ]
};
```

## Configuration Options

The plugin accepts the following configuration options:

```javascript
new AutoCopyrightUpdater({
  // File Selection
  pattern: '**/*.html',  // Glob pattern for file matching
  
  // Element Selection
  footerSelector: 'footer',  // Footer element selector
  copyrightSelector: '.copyright',  // Copyright element selector
  
  // Date Formatting
  format: 'range',  // 'range' or 'current'
  rangeDelimiter: '-',  // Year range separator
  preserveStartYear: true,  // Maintain original start year
  
  // Content
  template: '© ${year} Company Name'  // Year placeholder template
})
```

## Usage Examples

### Current Year Format

```javascript
new AutoCopyrightUpdater({
  format: 'current',
  template: 'Copyright © ${year} Company Name'
})
// Output: Copyright © 2024 Company Name
```

### Year Range Format

```javascript
new AutoCopyrightUpdater({
  format: 'range',
  rangeDelimiter: ' to ',
  template: '© ${year} Company Name'
})
// Output: © 2023 to 2024 Company Name
```

## Development and Testing

Run the test suite using:

```bash
npm test
```

## Contributing

We welcome contributions to the Auto Copyright Updater plugin. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License.