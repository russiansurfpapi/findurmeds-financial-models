const fs = require('fs');

// List of patient HTML files to fix (excluding rooz-clients which is already fixed)
const patientFiles = [
    'deangelis-patients.html',
    'developmental-pediatrics-patients.html',
    'hawley-patients.html',
    'jenn-patients.html',
    'lea-patients.html',
    'lerner-patients.html',
    'lis-patients.html',
    'murphy-patients.html',
    'torry-patients.html'
];

patientFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⊘ Skipping ${file} (not found)`);
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Apply all the spacing fixes
    content = content
        // Fix body padding and line-height
        .replace(
            /body \{\s*font-family:[^}]*line-height:\s*[\d.]+;[^}]*padding:\s*\d+px;/s,
            match => match
                .replace(/line-height:\s*[\d.]+;/, 'line-height: 1.5;')
                .replace(/padding:\s*\d+px;/, 'padding: 30px 40px;')
        )
        // Fix header margin-bottom
        .replace(
            /\.header \{[^}]*margin-bottom:\s*\d+px;/s,
            match => match.replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 20px;')
        )
        // Fix logo font-size
        .replace(
            /\.logo \{[^}]*font-size:\s*\d+px;/s,
            match => match.replace(/font-size:\s*\d+px;/, 'font-size: 28px;')
        )
        // Fix intro-text
        .replace(
            /\.intro-text \{[^}]*\}/s,
            match => match
                .replace(/font-size:\s*\d+px;/, 'font-size: 14px;')
                .replace(/padding:\s*\d+px;/, 'padding: 14px;')
                .replace(/border-radius:\s*\d+px;/, 'border-radius: 10px;')
                .replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 18px;')
                .replace(/line-height:\s*[\d.]+;/, 'line-height: 1.6;')
        )
        // Fix section margin-bottom
        .replace(
            /\.section \{[^}]*margin-bottom:\s*\d+px;/s,
            match => match.replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 18px;')
        )
        // Fix section-title
        .replace(
            /\.section-title \{[^}]*\}/s,
            match => match
                .replace(/font-size:\s*\d+px;/, 'font-size: 18px;')
                .replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 12px;')
        )
        // Fix step
        .replace(
            /\.step \{[^}]*\}/s,
            match => match
                .replace(/gap:\s*\d+px;/, 'gap: 12px;')
                .replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 11px;')
        )
        // Fix step-number
        .replace(
            /\.step-number \{[^}]*\}/s,
            match => match
                .replace(/width:\s*\d+px;/, 'width: 26px;')
                .replace(/height:\s*\d+px;/, 'height: 26px;')
                .replace(/font-size:\s*\d+px;/, 'font-size: 14px;')
        )
        // Fix step-text
        .replace(
            /\.step-text \{[^}]*\}/s,
            match => match
                .replace(/font-size:\s*\d+px;/, 'font-size: 14px;')
                .replace(/line-height:\s*[\d.]+;/, 'line-height: 1.5;')
                .replace(/padding-top:\s*\d+px;/, 'padding-top: 2px;')
        )
        // Fix inline-code
        .replace(
            /\.inline-code \{[^}]*\}/s,
            match => match
                .replace(/padding:\s*[\d\s]+px[\s\d]+px;/, 'padding: 3px 10px;')
                .replace(/border-radius:\s*\d+px;/, 'border-radius: 5px;')
                .replace(/font-size:\s*\d+px;/, 'font-size: 13px;')
        )
        // Fix qa-section
        .replace(
            /\.qa-section \{[^}]*\}/s,
            match => match
                .replace(/padding:\s*\d+px;/, 'padding: 14px;')
                .replace(/border-radius:\s*\d+px;/, 'border-radius: 10px;')
                .replace(/margin-top:\s*\d+px;/, 'margin-top: 18px;')
        )
        // Fix qa-item
        .replace(
            /\.qa-item \{[^}]*margin-bottom:\s*\d+px;[^}]*font-size:\s*\d+px;/s,
            match => match
                .replace(/margin-bottom:\s*\d+px;/, 'margin-bottom: 8px;')
                .replace(/font-size:\s*\d+px;/, 'font-size: 14px;')
        )
        // Fix footer
        .replace(
            /\.footer \{[^}]*\}/s,
            match => match
                .replace(/margin-top:\s*\d+px;/, 'margin-top: 18px;')
                .replace(/padding-top:\s*\d+px;/, 'padding-top: 14px;')
                .replace(/font-size:\s*\d+px;/, 'font-size: 12px;')
        )
        // Fix print media query body padding
        .replace(
            /@media print \{[^}]*body \{[^}]*padding:\s*\d+px;/s,
            match => match.replace(/padding:\s*\d+px;/, 'padding: 20px 30px;')
        );

    fs.writeFileSync(file, content);
    console.log(`✓ Fixed ${file}`);
});

console.log('\n✓ All patient files updated!');
