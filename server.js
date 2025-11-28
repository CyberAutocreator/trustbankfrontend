// server.js: Simple Express server to serve the React/Front-end build directory

const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle requests that aren't for static files by serving the main index.html
// This allows front-end routing (like React Router) to work correctly.
app.get('*', (req, res) => {
  // We assume the built files are in a directory named 'build'
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use the PORT provided by the hosting environment, or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running and serving files from the 'build' folder on port ${PORT}`);
});
