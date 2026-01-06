const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(htmlFile) {
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Read the HTML file
    const htmlPath = path.join(__dirname, htmlFile);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Set the content
    await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
    });

    // Generate PDF with proper settings
    const outputPath = htmlFile.replace('.html', '-test.pdf');
    await page.pdf({
        path: outputPath,
        format: 'Letter',
        printBackground: true,
        margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
        }
    });

    console.log(`✓ Generated: ${outputPath}`);

    // Get page metrics to check if content fits on one page
    const metrics = await page.evaluate(() => {
        return {
            bodyHeight: document.body.scrollHeight,
            bodyWidth: document.body.scrollWidth,
            couponCode: (() => {
                const code = document.querySelector('.inline-code');
                if (code) {
                    const rect = code.getBoundingClientRect();
                    const styles = window.getComputedStyle(code);
                    return {
                        text: code.textContent,
                        width: rect.width,
                        height: rect.height,
                        padding: styles.padding,
                        fontSize: styles.fontSize,
                        display: styles.display
                    };
                }
                return null;
            })()
        };
    });

    console.log(`  Body height: ${metrics.bodyHeight}px (Letter page ~11in = ~792pt)`);
    console.log(`  Fits on one page: ${metrics.bodyHeight < 900 ? '✓ YES' : '✗ NO - content too tall'}`);

    if (metrics.couponCode) {
        console.log(`  Coupon code: "${metrics.couponCode.text}"`);
        console.log(`  Coupon size: ${Math.round(metrics.couponCode.width)}px × ${Math.round(metrics.couponCode.height)}px`);
        console.log(`  Coupon display: ${metrics.couponCode.display}`);
        console.log(`  Coupon fontSize: ${metrics.couponCode.fontSize}`);
        console.log(`  Is compact: ${metrics.couponCode.width < 200 ? '✓ YES' : '✗ NO - too wide'}`);
    }

    await browser.close();
    return metrics;
}

async function testAllFiles() {
    console.log('Testing PDF generation...\n');

    // Get all HTML files that match the pattern
    const allFiles = fs.readdirSync('.')
        .filter(f => f.endsWith('.html') && f !== 'findurmeds_revenue_calculator.html');

    let tooTall = [];
    let successful = [];

    for (const file of allFiles) {
        console.log(`\n📄 Testing: ${file}`);
        console.log('─'.repeat(50));
        try {
            const metrics = await generatePDF(file);
            if (metrics.bodyHeight >= 900) {
                tooTall.push({ file, height: metrics.bodyHeight });
            } else {
                successful.push(file);
            }
        } catch (error) {
            console.error(`✗ Error: ${error.message}`);
        }
    }

    console.log('\n\n' + '='.repeat(50));
    console.log('SUMMARY');
    console.log('='.repeat(50));
    console.log(`✓ Successful (fits on 1 page): ${successful.length} files`);

    if (tooTall.length > 0) {
        console.log(`\n✗ Too tall (might overflow): ${tooTall.length} files`);
        tooTall.forEach(item => {
            console.log(`  - ${item.file} (${item.height}px)`);
        });
    }

    console.log('\n✓ PDF generation test complete!');
}

testAllFiles().catch(console.error);
