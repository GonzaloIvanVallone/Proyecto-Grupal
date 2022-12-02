const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  storeAllCategories,
  storeAllProducts,
} = require("./src/controlers/dbcharge/dbcharge");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    await storeAllCategories();
    await storeAllProducts();
  });
});

