
const mongoose = require('mongoose');

async function checkDB() {
    console.log('Checking database connection...');
    // Hardcoded URI from .env.local
    const uri = 'mongodb+srv://jorneycr_db_user:7buaqtb0ZE38IuBb@petcaremvp.ztkri4r.mongodb.net/petcare?retryWrites=true&w=majority';

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
            console.log('WARNING: No sitters found.');
        }

    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

checkDB();
