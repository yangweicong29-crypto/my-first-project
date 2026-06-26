const fs = require('fs');
const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const html = fs.readFileSync('index.html', 'utf8');
for (const marker of ['service-grid', 'booking-form', 'appointment-list']) {
  if (!html.includes(marker)) {
    console.error(`Missing app marker in index.html: ${marker}`);
    process.exit(1);
  }
}

console.log('Static appointment app files verified.');
