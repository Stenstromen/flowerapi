const sqlDbFile = "./assets/store/db/flowerdb.sqlite";
const sqlite3 = require("sqlite3").verbose();
const readme = "./assets/store/readme.txt"
const fs = require("fs");

const flowerdb = new sqlite3.Database(sqlDbFile, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Connected to DB");

  const statement = `CREATE TABLE flowers
    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, 
      description TEXT,
      author TEXT,
      imageUrl TEXT )`;

  flowerdb.run(statement, (error) => {
    if (error) {
      console.log('Table "flowers" already exists, continuing...');
      return;
    }

    const insert =
      "INSERT INTO flowers (name, description, author, imageUrl) VALUES (?, ?, ?, ?)";
      flowerdb.run(insert, ["TLieutenant Heart", "Ida's favorite flower", "Unknown", "HOSTNAME/assets/img/pic.jpg"]);
      flowerdb.run(insert, ["Tulips", "Pretty wild tulips", "Filip", "HOSTNAME/assets/img/tulips.jpg"]);
      flowerdb.run(insert, ["Tulips 2", "Pretty tulips", "Filip", "HOSTNAME/assets/img/tulips2.jpg"]);
      flowerdb.run(insert, ["Thimble FLower", "Thimble Flower from a store", "Filip", "HOSTNAME/assets/img/thimbleflower.jpg"]);
    flowerdb.run(insert, ["Japanese Maple", "Japanese Maple from store", "Filip", "HOSTNAME/assets/img/japanesemaple.jpg" ])
    flowerdb.run(insert, ["Apple Tree Flower", "Apple Tree Flower", "Filip", "HOSTNAME/assets/img/appletree.jpg"])
    flowerdb.run(insert, ["Unknown", "Unknown Bushflower", "Filip", "HOSTNAME/assets/img/unknown.jpg"])
  });
});

const printReadme = fs.readFileSync(readme, "utf8", (error) => {
    if (error) {
        console.error(error.message);
        throw error;
      }
});

module.exports = {
    flowerdb,
    printReadme,
}