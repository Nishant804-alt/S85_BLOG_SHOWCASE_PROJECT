// import JWT from "jsonwebtoken";

// const secret = "$Nishant";

// export function createToken(user) {
//   const payload = {
//     _id: user._id,
//     fullName: user.fullName,
//     email: user.email,
//     profileImageUrl: user.profileImageUrl,
//     role: user.role,
//   };

//   const token = JWT.sign(payload, secret);

//   return token;
// }

// export function validateToken(token) {
//   const payload = JWT.verify(token, secret);

//   return payload;
// }


// utils/createToken.js
import JWT from "jsonwebtoken";

const secret = "$Nishant"; // You can replace this with process.env.JWT_SECRET

export function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  return JWT.sign(payload, secret, { expiresIn: "7d" });
}

export function validateToken(token) {
  return JWT.verify(token, secret);
}
