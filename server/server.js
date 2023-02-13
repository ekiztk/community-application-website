const mongoose = require('mongoose');
const dotenv = require('dotenv');

//declare ENV variables
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
//connect mongoDB database
mongoose.connect(DB).then(() => {
  console.log('DB Connection succesfull');
});

const port = process.env.PORT || 3000;

//run server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
