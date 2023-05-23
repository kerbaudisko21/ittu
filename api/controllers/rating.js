import Rating from '../models/Rating.js';
import Itinerary from '../models/Itinerary.js';

export const createRating = async (req, res, next) => {
  const itineraryId = req.params.itineraryid;
  console.log(itineraryId, req.body.user_id);
  try {
    const isExist = await Itinerary.findOne({
      'rating.user_id': req.body.user_id,
    });

    if (isExist) throw { message: 'already rate' };

    console.log(isExist);
    const newRating = new Rating(req.body);
    const savedRating = await newRating.save();
    try {
      await Itinerary.findByIdAndUpdate(itineraryId, {
        $push: {
          rating: savedRating,
        },
      });
      // process.exit();
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRating);
  } catch (error) {
    next(error);
  }
};

export const deletRating = async (req, res, next) => {
  const { itineraryId, userId } = req.params;
  // process.exit();
  try {
    console.log('start', userId);

    const response = await Itinerary.findByIdAndUpdate(itineraryId, {
      $pull: {
        rating: { user_id: userId },
      },
      // multi: true,
    });
    console.log('test', response);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
