const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8000;

// Serve your dashboard.html and static files
app.use(express.static(__dirname));

// Proxy all /api requests to your Azure Function
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:7071', // or your deployed function URL
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api', // keep path the same
    },
}));

app.listen(PORT, () => {
    console.log(`Dashboard server running at http://127.0.0.1:${PORT}`);
});
