import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { setServers } from 'dns';

// Force Google DNS to bypass local ISP filtering
setServers(['8.8.8.8']);

// Load .env.local manually
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function testConnection() {
  if (!uri) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
  }

  console.log('🔌 Testing MongoDB Connection...');
  console.log(`URI: ${uri.replace(/:([^:@]+)@/, ':****@')}`); // Hide password

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    console.log('Name:', mongoose.connection.name);
    // Try to get full host list
    const hosts = mongoose.connection.getClient().options.hosts;
    console.log('Replica Set Hosts:', hosts);
    console.log('RS Name:', mongoose.connection.getClient().options.replicaSet);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Failed:', error);
    process.exit(1);
  }
}

testConnection();
