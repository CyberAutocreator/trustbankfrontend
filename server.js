const express = require('express');
const path = require('path');
const app = express();

// 1. Serve static files from the 'build' directory (where 'npm run build' places files)
app.use(express.static(path.join(__dirname, 'build')));

// 2. Handle all other requests by serving the main index.html file
// This is crucial for front-end routing (e.g., React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 3. Set the port (must use process.env.PORT for hosting platforms)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
