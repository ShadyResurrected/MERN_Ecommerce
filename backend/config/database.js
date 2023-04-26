const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.l3tr7ln.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log(`Mongodb connected with server:  ${data.connection.host}`);
    })
};

module.exports = connectDatabase;
