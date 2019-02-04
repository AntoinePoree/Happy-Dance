import * as mongoose from 'mongoose';

const profSchema = new mongoose.Schema({
  name: String,
  surname: String,
  photo: String,
  resume: String,
});

const profModel = mongoose.model('prof', profSchema);

export default profModel;
