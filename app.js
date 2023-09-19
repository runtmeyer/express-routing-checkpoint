const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hourOfDay = now.getHours();
  
    // Check if it's a working day (Monday to Friday) and between 9 AM and 5 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
      next(); // Continue processing the request
    } else {
      res.send('This web application is only available during working hours (Mon-Fri, 9 AM to 5 PM).');
    }
  };

app.use(workingHoursMiddleware);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define routes for the three pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});