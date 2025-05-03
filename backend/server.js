const express = require('express');
const cors = require('cors');
const associationRoutes = require('./routes/association.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/associations', associationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
