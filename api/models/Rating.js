import mongoose from 'mongoose';
import Itinerary from '../models/Itinerary.js';

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

// RatingSchema.pre('remove', async (doc, next) => {
//   // Delete all records from transaction schema with category
//   // await Itinerary.deleteMany({ rating: doc.title });
//   // OR Update the category of transactions to empty string
//   console.log(doc, 'helo');
//   process.exit();
//   await Itinerary.findByIdAndUpdate(itineraryId, {
//     $pull: {
//       ratings: { _user_id: doc.userId },
//     },
//     multi: true,
//   });
//   next();
// });

// RatingSchema.pre('remove', function(next) {
//   Itinerary.update(
//       { rating : this._id},
//       { $pull: { submission_ids: this._id } },
//       { multi: true })  //if reference exists in multiple documents
//   .exec();
//   next();
// });

export default mongoose.model('Rating', RatingSchema);
