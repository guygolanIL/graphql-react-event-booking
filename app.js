const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require('./graphql/resolvers/index');


const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  new graphqlHTTP({
    graphiql: true,
    schema: graphQLSchema,
    rootValue: graphQLResolvers
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-qbbid.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
