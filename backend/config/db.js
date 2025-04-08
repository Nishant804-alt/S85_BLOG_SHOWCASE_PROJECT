const mongoose = require("mongoose");

const connectDatabase = () => {
  const mongoURI = process.env.DB_URL;
  if (!mongoURI) {
    console.error("❌ MongoDB URI is undefined. Check your .env file.");
    process.exit(1);
  }

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((data) => {
      console.log(`✅ MongoDB Connected: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err);
      process.exit(1);
    });
};

module.exports = connectDatabase;
