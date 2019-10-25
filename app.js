const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');

const events = [];

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use('/graphql', new graphqlHTTP({
    graphiql: true,
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => events,
        createEvent: ({eventInput}) => {
            const event = {
                _id: Math.random().toString(),
                title: eventInput.title,
                description: eventInput.description,
                price: +eventInput.price,
                date: eventInput.date
            }
            events.push(event);
            return event;
        }
    }
}));

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
