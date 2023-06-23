const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:11111';
const dbName = 'your_database_name';
const collectionName = 'customers';

const client = new MongoClient(url);

client.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db(dbName);

  db.createCollection(collectionName, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Collection "customers" created successfully');

    const collection = db.collection(collectionName);

    const inputCustomers = [
      {
        firstname: "Nate",
        lastname: "Brown",
        address: "123 Main Street"
      },
      {
        firstname: "James",
        lastname: "Jones",
        address: "1834 South Charles"
      },
      {
        firstname: "Tupac",
        lastname: "Jackson",
        address: "222 Thugs Mansion Drive"
      },
      {
        firstname: "Fred",
        lastname: "Bass",
        address: "5 Cavan Green Circle"
      },
      {
        firstname: "Cassie",
        lastname: "Mann",
        address: "56 Riverside Avenue"
      }
    ];

    collection.insertMany(inputCustomers, function (err, result) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`${result.insertedCount} documents inserted into "${collectionName}" collection`);

      collection.find().sort({ firstname: 1 }).toArray(function (err, customers) {
        if (err) {
          console.error(err);
          return;
        }

        console.log("Customer names in ascending order:");
        customers.forEach(function (customer) {
          console.log(`${customer.firstname} ${customer.lastname}`);
        });

        const customerToUpdate = 'Cassie';

        collection.updateOne({ firstname: customerToUpdate }, { $set: { address: "1244 William Street" } }, function (err, result) {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`Address updated for ${customerToUpdate}`);

          // Delete the customer collection
          collection.drop(function (err, result) {
            if (err) {
              console.error(err);
              return;
            }

            console.log(`Collection "${collectionName}" deleted successfully`);

            // Find customers with last name starting with 'J'
            const query = { lastname: { $regex: '^J', $options: 'i' } };

            collection.find(query).toArray(function (err, customers) {
              if (err) {
                console.error(err);
                return;
              }

              console.log("Customers with last name starting with 'J':");
              customers.forEach(function (customer) {
                console.log(`${customer.firstname} ${customer.lastname}`);
              });

              // Close the connection to the MongoDB server
              client.close();
            });
          });
        });
      });
    });
  });
});
