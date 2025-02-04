const express = require('express');
const app = express();
const PORT = 8000;

// Basic /ping route
app.get('/ping', (req, res) => {
    res.send('Pong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
