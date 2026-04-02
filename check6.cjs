const https = require('https');

https.get('https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80', (res) => {
  console.log(res.headers);
});
