// src/index.js

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');

class AutoCopyrightUpdater {
  constructor(options = {}) {
    // Initialize with default options that can be overridden
    this.options = {
      pattern: '**/*.html',
      footerSelector: 'footer',
      copyrightSelector: '.copyright',
      format: 'range', // 'range' or 'current'
      rangeDelimiter: '-', // customize the delimiter between years
      preserveStartYear: true, // keep original start year in range
      template: '© ${year} Company Name', // year will be replaced with formatted year
      ...options
    };

    // Validate options
    this.validateOptions();
  }

  validateOptions() {
    if (!['range', 'current'].includes(this.options.format)) {
      throw new Error('Format must be either "range" or "current"');
    }

    if (typeof this.options.template !== 'string' || !this.options.template.includes('${year}')) {
      throw new Error('Template must be a string containing ${year} placeholder');
    }
  }

  apply(compiler) {
    // Register the plugin with webpack
    compiler.hooks.afterEmit.tapAsync(
      'AutoCopyrightUpdater',
      (compilation, callback) => {
        const outputPath = compilation.outputOptions.path;
        this.updateCopyright(outputPath, callback);
      }
    );
  }

  formatYear(existingContent) {
    const currentYear = new Date().getFullYear();
    const startYearMatch = existingContent.match(/\d{4}/);
    const startYear = startYearMatch ? parseInt(startYearMatch[0]) : currentYear;

    // Handle different format options
    if (this.options.format === 'current') {
      return currentYear.toString();
    }

    if (this.options.format === 'range' && this.options.preserveStartYear) {
      return startYear === currentYear ? 
        currentYear.toString() : 
        `${startYear}${this.options.rangeDelimiter}${currentYear}`;
    }

    return currentYear.toString();
  }

  updateCopyright(outputPath, callback) {
    const pattern = path.join(outputPath, this.options.pattern);

    glob(pattern, (err, files) => {
      if (err) {
        console.error('AutoCopyrightUpdater: Error finding files:', err);
        callback(err);
        return;
      }

      try {
        files.forEach(file => {
          this.processFile(file);
        });

        callback();
      } catch (error) {
        console.error('AutoCopyrightUpdater: Error processing files:', error);
        callback(error);
      }
    });
  }

  processFile(file) {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    const footer = $(this.options.footerSelector);
    const copyright = footer.find(this.options.copyrightSelector);

    if (copyright.length) {
      const existingContent = copyright.html();
      const formattedYear = this.formatYear(existingContent);
      const updatedContent = this.options.template.replace('${year}', formattedYear);
      
      copyright.html(updatedContent);
      fs.writeFileSync(file, $.html());
      
      console.log(`AutoCopyrightUpdater: Updated copyright in ${file}`);
    } else {
      console.warn(`AutoCopyrightUpdater: No copyright element found in ${file}`);
    }
  }

  // Utility method for testing
  static getVersion() {
    return require('../package.json').version;
  }
}

module.exports = AutoCopyrightUpdater;