// require("dotenv").config();
// const app = require("./app");
// const sequelize = require("./src/config/db.config");

// const PORT = process.env.PORT || 3000;

// const startServer = async () => {
//   try {
//     // Authenticate Database Connection
//     await sequelize.authenticate();
//     console.log("Database connection has been established successfully.");

//     // Start listening for requests
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//     process.exit(1);
//   }
// };

// startServer();

require("dotenv").config();
const app = require("./app");
const sequelize = require("./src/config/db.config");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    app.listen(PORT, HOST, () => {
      console.log(`Server running at http://192.168.1.25:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
