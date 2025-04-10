// import { createHmac, randomBytes } from "node:crypto";
// import { Schema, model } from "mongoose";
// import { createToken } from "../utils/createToken.js"; // Make sure this is correct

// const userSchema = new Schema({
//   fullName: { type: String, required: true },
//   email:    { type: String, required: true, unique: true },
//   salt:     { type: String },
//   password: { type: String, required: true },
//   profileImageUrl: { type: String, default: "/images/default.png" },
//   role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
// }, { timestamps: true });

// // 🔐 Hash password before saving
// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) return next();

//   this.salt = randomBytes(16).toString("hex");
//   this.password = createHmac("sha256", this.salt)
//     .update(this.password)
//     .digest("hex");

//   next();
// });

// // 🔐 Match password and generate token
// userSchema.statics.matchPasswordandGenerateToken = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (!user) throw new Error("User not found");

//   const hash = createHmac("sha256", user.salt).update(password).digest("hex");

//   if (hash !== user.password) throw new Error("Incorrect Password");

//   return createToken(user);
// };

// export default model("User", userSchema);


// models/user.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: "/images/default.png" },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
