const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running on:" + PORT);
    });
  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();
