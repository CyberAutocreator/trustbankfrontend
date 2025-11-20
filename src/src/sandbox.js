module.exports = {
  // Sets the default port for the application to run on
  port: 3000, 
  
  // Specifies the entry file to run when the sandbox starts.
  // This points to the server.js file we previously created.
  entry: './server.js', 
  
  // Specifies the command to run before starting the application, 
  // which ensures the front-end code is built first.
  prestart: 'npm install && npm run build',
  
  // Defines the environment variables
  environment: {
    NODE_ENV: 'production',
  }
};
