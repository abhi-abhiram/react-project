const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.URI, { useUnifiedTopology: true });

async function connectDb() {
  const DBNAME = "radixdb";
  return client.connect().then((client) => client.db(DBNAME));
}

module.exports = async function (req, res) {
  const { address } = req.body;
  const db = await connectDb();
  let status = 200;
  const isAddressExist = await db
    .collection("addresses")
    .findOne({ address: address });
  const alerts = await db.collection("alerts").findOne({ address: address });
  await db.collection("alerts").deleteOne({ address: address });
  await client.close();

  if (!isAddressExist) {
    status = 204;
  }
  res.status(status).json(alerts);
};
