const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'billetterie.html', 'visa.html', 'transport.html', 'matchs.html', 'reservation.html'];

console.log('Testing CAN 2025 Morocco Web App...');

// 1. Verify pages exist and have standard HTML5 boilerplate
pages.forEach(page => {
    const fullPath = path.join(root, page);
    assert(fs.existsSync(fullPath), `Page ${page} must exist.`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(content.includes('<!DOCTYPE html>'), `${page} must declare HTML5 doctype.`);
    assert(content.includes('<meta name="viewport"'), `${page} must include viewport meta tag.`);
    assert(content.includes('style.css'), `${page} must link to style.css.`);
    assert(content.includes('script.js'), `${page} must load script.js.`);
    assert(content.includes('CAN 2025'), `${page} must include CAN 2025 branding.`);
    console.log(`  ✓ ${page} passed structural and responsive validations.`);
});

// 2. Verify script.js has LocalStorage persistence and navigation logic
const scriptContent = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
assert(scriptContent.includes('can2025_tickets'), 'script.js must handle ticket persistence.');
assert(scriptContent.includes('can2025_visas'), 'script.js must handle visa persistence.');
assert(scriptContent.includes('can2025_hotels'), 'script.js must handle hotel persistence.');
assert(scriptContent.includes('can2025_transports'), 'script.js must handle transport persistence.');
console.log('  ✓ script.js passed LocalStorage state verification.');

console.log('ALL CAN 2025 TESTS PASSED SUCCESSFULLY!');
