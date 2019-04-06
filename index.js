const express = require('express');

const app = express();

app.use('/', express.static(__dirname + '/src'));

app.listen(4000, () => console.log(`Server is listening on port 4000`));
