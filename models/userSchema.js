const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstname: String, // String is shorthand for {type: String}
    lastname: String,
    email: String,
    password: String,
    age: { type: Number, default: 10 },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todos" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// pre save function
// userSchema.pre("save", async function (next) {
//   try {
//     const user = this;
//     if (user.isModified("password")) {
//       const hash = await bcrypt.hash(user.password, 10);
//       user.password = hash;
//       next();
//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

const User = mongoose.model("Users", userSchema);

module.exports = User;
