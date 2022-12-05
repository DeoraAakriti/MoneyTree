import express from 'express';
import dbSetup from './configs/db.js';
import { UserRoute } from './routes/UserRoute.js';
import { TransactionRoute }from './routes/TransactionRoute.js';
import { AccountRoute } from './routes/AccountRoute.js';
import { CategoryRoute } from './routes/CategoryRoute.js';
import { TaskRoute } from './routes/TaskRoute.js';
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: '*' }));

dbSetup();

app.use(UserRoute);
app.use(TransactionRoute);
app.use(AccountRoute);
app.use(CategoryRoute);
app.use(TaskRoute);

app.get('/',(req, res) => {
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});