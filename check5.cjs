const puppeteer = require('puppeteer');

const ids = [
  { id: '1518977676601-b53f82aba655', name: 'Potato' },
  { id: '1618512496248-a07fe83aa8cb', name: 'Onion' },
  { id: '1592924357228-91a4daadcfea', name: 'Tomato' },
  { id: '1576045057995-568f588f82fb', name: 'Spinach' },
  { id: '1599940824399-b87987ceb72a', name: 'Coriander' },
  { id: '1603833665858-e61d17a86224', name: 'Banana' },
  { id: '1459411621453-7b03977f4bfc', name: 'Broccoli' },
  { id: '1523049673857-eb18f1d7b578', name: 'Avocado' },
  { id: '1598170845058-32b9d6a5da37', name: 'Carrot' },
  { id: '1568584711075-3d021a7c3ca3', name: 'Cauliflower' },
  { id: '1594282486552-05b4d80fbb9f', name: 'Cabbage' },
  { id: '1563514227147-6d2ff665a6a0', name: 'Capsicum' },
  { id: '1615485925600-97237c4fc1ec', name: 'Ginger' },
  { id: '1553279768-865429fa0078', name: 'Mango' },
  { id: '1589984662646-e7b2e4962f18', name: 'Watermelon' }
];

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  for (const item of ids) {
    try {
      await page.goto(`https://unsplash.com/photos/${item.id}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const title = await page.title();
      console.log(`${item.name} (${item.id}): ${title}`);
    } catch (e) {
      console.log(`${item.name} (${item.id}): Error`);
    }
  }
  
  await browser.close();
}

run();
