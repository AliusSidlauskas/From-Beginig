import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "bad auth" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "bad auth" });
    }

    req.body.userId = decoded.user_id;

    return next();
  });
};
