const express = require('express');
const scoreRoutes = require('./routes/score');
const studentRoutes = require('./routes/student');

const app = express();
app.use(express.json());

app.use('/api/score', scoreRoutes);
app.use('/api/student', studentRoutes);

app.get('/healthz', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`edu-admin-server listening on ${port}`));
