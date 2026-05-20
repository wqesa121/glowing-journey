const { MongoClient, ServerApiVersion } = require('mongodb');

const hosts = [
  'ac-qu4rrk9-shard-00-00.liwqlnr.mongodb.net:27017',
  'ac-qu4rrk9-shard-00-01.liwqlnr.mongodb.net:27017',
  'ac-qu4rrk9-shard-00-02.liwqlnr.mongodb.net:27017',
];

const uri = `mongodb://denis:change%231800@${hosts.join(',')}/neuracms?ssl=true&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 20000,
  socketTimeoutMS: 20000,
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected via non-SRV hosts');
  } catch (err) {
    console.error('Non-SRV connection error:');
    console.error(err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
