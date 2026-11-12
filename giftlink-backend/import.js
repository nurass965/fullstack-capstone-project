const connectToDatabase = require('./models/db');

const gifts = [
  { id: "1", name: "Vintage Watch", category: "Accessories", condition: "New", description: "Classic leather strap watch", age_years: 1 },
  { id: "2", name: "Coffee Maker", category: "Kitchen", condition: "Used", description: "Drip coffee machine, works great", age_years: 2 },
  { id: "3", name: "Wooden Desk Lamp", category: "Home", condition: "New", description: "Minimalist oak desk lamp", age_years: 0 },
  { id: "4", name: "Yoga Mat", category: "Sports", condition: "New", description: "Non-slip exercise mat", age_years: 0 },
  { id: "5", name: "Acoustic Guitar", category: "Music", condition: "Used", description: "6-string acoustic guitar with case", age_years: 3 },
  { id: "6", name: "Mountain Bike", category: "Sports", condition: "Used", description: "21-speed aluminum frame bike", age_years: 4 },
  { id: "7", name: "Ceramic Vase", category: "Home", condition: "New", description: "Handcrafted white ceramic vase", age_years: 0 },
  { id: "8", name: "Board Game Set", category: "Games", condition: "New", description: "Strategy board game for family", age_years: 1 },
  { id: "9", name: "Espresso Machine", category: "Kitchen", condition: "Used", description: "Compact espresso maker", age_years: 2 },
  { id: "10", name: "Leather Backpack", category: "Accessories", condition: "New", description: "Brown faux leather travel bag", age_years: 0 },
  { id: "11", name: "Bookshelf", category: "Home", condition: "Used", description: "3-tier wooden storage shelf", age_years: 2 },
  { id: "12", name: "Wireless Headphones", category: "Electronics", condition: "New", description: "Noise-cancelling over-ear headphones", age_years: 0 },
  { id: "13", name: "Camping Tent", category: "Sports", condition: "Used", description: "2-person waterproof tent", age_years: 1 },
  { id: "14", name: "Potted Monstera", category: "Home", condition: "New", description: "Healthy indoor plant in ceramic pot", age_years: 1 },
  { id: "15", name: "Stand Mixer", category: "Kitchen", condition: "Used", description: "Heavy-duty kitchen mixer", age_years: 3 },
  { id: "16", name: "Wall Art Canvas", category: "Home", condition: "New", description: "Abstract geometric canvas print", age_years: 0 }
];

async function importData() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    await collection.deleteMany({});
    const result = await collection.insertMany(gifts);
    console.log(`Connected to MongoDB database: ${db.databaseName}`);
    console.log(`${result.insertedCount} document(s) imported successfully. 0 document(s) failed to import.`);
    process.exit(0);
  } catch (err) {
    console.error('Import failed:', err);
    process.exit(1);
  }
}

importData();
