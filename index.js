const express = require('express')

const app = express();

app.use(express.json());

app.use(require('./src/routes/crud.aviones'));
app.use(require('./src/routes/crud.pasajeros'));
app.use(require('./src/routes/crud.usuarios'));
app.use(require('./src/routes/crud.vuelos'));

app.use(express.static(__dirname + '/public'));

app.listen(3000, err => {
    if (err) throw new Error(err);
    console.log('Server on port 3000');
});