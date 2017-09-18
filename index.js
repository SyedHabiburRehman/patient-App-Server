const app = require('./app');
const post = process.env.port || 3050;



app.listen(port, () => {
    console.log('Running on port', port);
});