const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema({
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  stars: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
