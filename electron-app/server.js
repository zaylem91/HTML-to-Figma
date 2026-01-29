const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let server = null;
let serverInstance = null;
let browser = null;
let isRunning = false;
let currentPort = 3000;

// Load the extraction script
const EXTRACTION_SCRIPT = fs.readFileSync(
  path.join(__dirname, '..', 'browser-extract.js'),
  'utf8'
);

async function startServer(port = 3000) {
  if (isRunning) {
    throw new Error('Server is already running');
  }

  currentPort = port;
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'running', 
      port: currentPort,
      version: '1.0.0'
    });
  });

  // Main extraction endpoint
  app.post('/extract', async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: 'URL is required' 
      });
    }

    console.log(`📦 Extracting: ${url}`);

    try {
      // Launch browser if not already running
      if (!browser) {
        console.log('🌐 Launching browser...');
        browser = await puppeteer.launch({
          headless: 'new',
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ]
        });
      }

      const page = await browser.newPage();
      
      // Set viewport
      await page.setViewport({ width: 1920, height: 1080 });

      // Set timeout
      page.setDefaultTimeout(30000);

      console.log('🌐 Loading page...');
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Wait a bit for dynamic content
      await page.waitForTimeout(2000);

      console.log('🎨 Extracting content...');
      
      // Inject and run extraction script
      const pageJson = await page.evaluate((script) => {
        // Create a modified version that returns the data instead of logging
        const modifiedScript = script.replace(
          'window.extractPage = extractPage;',
          'return extractPage("body");'
        );
        return eval(`(function() { ${modifiedScript} })()`);
      }, EXTRACTION_SCRIPT);

      await page.close();

      if (!pageJson) {
        throw new Error('Failed to extract page structure');
      }

      // Count nodes for stats
      const countNodes = (node) => {
        let count = 1;
        if (node.children) {
          for (let child of node.children) {
            count += countNodes(child);
          }
        }
        return count;
      };

      const stats = {
        totalNodes: countNodes(pageJson),
        url: pageJson.url,
        extractedAt: pageJson.extractedAt
      };

      console.log('✅ Extraction successful!');
      console.log(`📊 Extracted ${stats.totalNodes} nodes`);

      res.json({
        success: true,
        data: pageJson,
        stats: stats
      });

    } catch (error) {
      console.error('❌ Extraction failed:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Start the server
  return new Promise((resolve, reject) => {
    serverInstance = app.listen(port, () => {
      console.log(`🚀 Server started on http://localhost:${port}`);
      isRunning = true;
      server = app;
      resolve();
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use`));
      } else {
        reject(err);
      }
    });
  });
}

async function stopServer() {
  if (!isRunning) {
    return;
  }

  // Close browser
  if (browser) {
    await browser.close();
    browser = null;
  }

  // Close server
  if (serverInstance) {
    return new Promise((resolve) => {
      serverInstance.close(() => {
        console.log('🛑 Server stopped');
        isRunning = false;
        server = null;
        serverInstance = null;
        resolve();
      });
    });
  }
}

function getServerStatus() {
  return {
    running: isRunning,
    port: currentPort,
    url: isRunning ? `http://localhost:${currentPort}` : null
  };
}

module.exports = {
  startServer,
  stopServer,
  getServerStatus
};
