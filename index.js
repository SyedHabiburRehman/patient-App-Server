const app = require('./app');
const port = process.env.port || 3050;



app.listen(port, () => {
    console.log('Running on port', port);
});