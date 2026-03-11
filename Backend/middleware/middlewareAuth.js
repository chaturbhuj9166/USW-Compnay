import jwt from "jsonwebtoken";
import "dotenv/config";

export async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        message: "You need to login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}