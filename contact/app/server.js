const { formatErr } = require('./utils');
require('dotenv').config();
const app = require('express')();
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { server } = require('./config');
const schema = require('./schema');

var corsOptions = { origin: process.env.REACT_APP_ENDPOINT_URL || 'http://localhost:3000' };
app.use(cors(corsOptions));

app.use('/contact_manager', bodyParser.json(), graphqlExpress({
    formatError: formatErr,
    schema,
}));

if (process.env.ENV == 'development') {
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/contact_manager',
    }));
}
app.listen(server.port, () => {
    console.log('info', `Running a GraphQL API server at ${server.host}:${server.port}/contact_manager`);
});
