const mongoose = require("mongoose");

const { Schema } = mongoose;

//formats the date for the query return
function formatDate(createdAt) {
  return (
    [
      createdAt.getDate(),
      createdAt.getMonth() + 1,
      createdAt.getFullYear(),
    ].join("/") +
    " " +
    [createdAt.getHours(), createdAt.getMinutes(), createdAt.getSeconds()].join(
      ":"
    )
  );
}

const reviewSchema = new Schema(
  {
    reviewDate: {
      type: Date,
      default: Date.now,
      get: formatDate,
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
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
