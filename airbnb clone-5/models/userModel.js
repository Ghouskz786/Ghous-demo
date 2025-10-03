const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["guest", "host"] },
  favourites: [
    {
      favouriteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home",
      },
    },
  ],
});
module.exports = mongoose.model("userDetails", userSchema);
