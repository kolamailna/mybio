const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 12000;

// Serve static files
app.use(express.static(__dirname));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Tap Bio Mobile Dashboard is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Tap Bio Mobile Dashboard running on port ${PORT}`);
    console.log(`📱 Access at: http://localhost:${PORT}`);
    console.log(`🌐 External: http://0.0.0.0:${PORT}`);
});

module.exports = app;