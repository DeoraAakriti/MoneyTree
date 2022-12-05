import app from "./server.js"
import dbSetup from './configs/db.js';

dbSetup();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});