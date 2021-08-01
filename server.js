import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Database
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("Database connected...")
})

global.appRoot = path.resolve(__dirname)

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use('/api', routes);

// Middle wares
app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`Server is running at ${APP_PORT} port`));