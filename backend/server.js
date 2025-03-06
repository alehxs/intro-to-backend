const http = require('http');
const https = require('https');

const API_KEY = ''; 
const PORT = 3001;

const server = http.createServer((req, res) => {
  if (req.url === '/weather' && req.method === 'GET') {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=29.7604&lon=-95.3698&appid=${API_KEY}&units=imperial`;

    https.get(weatherUrl, (weatherRes) => {
      let data = '';
      weatherRes.on('data', (chunk) => {
        data += chunk;
      });
      weatherRes.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // allow requests from React
        });
        res.end(data);
      });
    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error fetching weather data' }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});