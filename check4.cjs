const puppeteer = require('puppeteer');

const ids = [
  { id: '1518977676601-b53f82aba655', name: 'Potato' },
  { id: '1618512496248-a07fe83aa8cb', name: 'Onion' },
  { id: '1592924357228-91a4daadcfea', name: 'Tomato' },
  { id: '1576045057995-568f588f82fb', name: 'Spinach' },
  { id: '1599940824399-b87987ceb72a', name: 'Coriander' },
  { id: '1603833665858-e61d17a86224', name: 'Banana' },
  { id: '1560806887-1e4cd0b6faa6', name: 'Apple' },
  { id: '1459411621453-7b03977f4bfc', name: 'Broccoli' },
  { id: '1523049673857-eb18f1d7b578', name: 'Avocado' },
  { id: '1598170845058-32b9d6a5da37', name: 'Carrot' },
  { id: '1568584711075-3d021a7c3ca3', name: 'Cauliflower' },
  { id: '1594282486552-05b4d80fbb9f', name: 'Cabbage' },
  { id: '1592407421833-2895662f2f79', name: 'Green Peas' },
  { id: '1563514227147-6d2ff665a6a0', name: 'Capsicum' },
  { id: '1540148426945-14733320a56e', name: 'Garlic' },
  { id: '1615485925600-97237c4fc1ec', name: 'Ginger' },
  { id: '1553279768-865429fa0078', name: 'Mango' },
  { id: '1615486171448-4df1b3156248', name: 'Pomegranate' },
  { id: '1589984662646-e7b2e4962f18', name: 'Watermelon' },
  { id: '1617112848923-cc2234394a8a', name: 'Papaya' }
];

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  for (const item of ids) {
    try {
      const response = await page.goto(`https://images.unsplash.com/photo-${item.id}?auto=format&fit=crop&w=500&q=80`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = response.status();
      const url = response.url();
      console.log(`${item.name} (${item.id}): Status ${status}, URL ${url}`);
    } catch (e) {
      console.log(`${item.name} (${item.id}): Error`);
    }
  }
  
  await browser.close();
}

run();
