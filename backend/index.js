const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  // Add more countries here
];

const states = {
  US: [
    { code: 'NY', name: 'New York' },
    { code: 'CA', name: 'California' },
    // Add more states here
  ],
  IN: [
    { code: 'DL', name: 'Delhi' },
    { code: 'MH', name: 'Maharashtra' },
    // Add more states here
  ],
};

const cities = {
  NY: [
    { code: 'NYC', name: 'New York City' },
    { code: 'BUF', name: 'Buffalo' },
    // Add more cities here
  ],
  CA: [
    { code: 'LA', name: 'Los Angeles' },
    { code: 'SF', name: 'San Francisco' },
    // Add more cities here
  ],
  DL: [
    { code: 'ND', name: 'New Delhi' },
    { code: 'OD', name: 'Old Delhi' },
    // Add more cities here
  ],
  MH: [
    { code: 'MB', name: 'Mumbai' },
    { code: 'PU', name: 'Pune' },
    // Add more cities here
  ],
};

let savedFormData = null;

app.get('/countries', (req, res) => {
  res.json(countries);
});

app.get('/states', (req, res) => {
  const { country } = req.query;
  res.json(states[country] || []);
});

app.get('/cities', (req, res) => {
  const { state } = req.query;
  res.json(cities[state] || []);
});

app.get('/', (_req, res) => {
  res.json("Server running");
});

app.post('/save', (req, res) => {
  const formData = req.body;
  savedFormData = formData;
  res.status(200).send('Data saved successfully');
});

app.get('/savedFormData', (_req, res) => {
  res.json(savedFormData);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
