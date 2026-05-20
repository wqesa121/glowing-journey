const { MongoClient, ServerApiVersion } = require('mongodb');

// Note: password '#' is URL-encoded as %23
const uri = "mongodb+srv://denis:change%231800@cluster0.liwqlnr.mongodb.net/neuracms?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // increase connection timeout for slow networks
  connectTimeoutMS: 20000,
  socketTimeoutMS: 20000,
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. Connected to MongoDB!');
  } catch (err) {
    console.error('Connection error:');
    console.error(err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
