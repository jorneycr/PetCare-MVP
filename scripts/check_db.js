
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

async function checkDB() {
    console.log('Checking database connection...');
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI is not defined in .env.local');
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB successfully!');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        const usersCount = await mongoose.connection.db.collection('users').countDocuments();
        console.log(`Users count: ${usersCount}`);

        const sittersCount = await mongoose.connection.db.collection('sitters').countDocuments();
        console.log(`Sitters count: ${sittersCount}`);

        if (sittersCount === 0) {
            console.log('WARNING: No sitters found. Please run the seed script.');
        }

    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

checkDB();
