const ghpages = require('gh-pages');
const path = require('path');

// Deploy the site to GitHub Pages
ghpages.publish(
  'dist/app',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/yourusername/construction-calculator.git',
    message: 'Auto-deployment [ci skip]'
  },
  (err) => {
    if (err) {
      console.error('Deployment failed:', err);
      process.exit(1);
    } else {
      console.log('Successfully deployed!');
    }
  }
);
