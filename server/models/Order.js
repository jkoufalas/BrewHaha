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

const orderSchema = new Schema(
  {
    purchaseDate: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantity: [
      {
        type: Number,
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
