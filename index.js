const express = require('express');
const authMiddleware = require('./middlewares/auth.middleware');
const router = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', authMiddleware, router);

const port = 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

module.exports = app;