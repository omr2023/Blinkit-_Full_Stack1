import jwt from "jsonwebtoken";

const generatedAccessToken = async (UserId) => {
  const token = await jwt.sign(
    { id: UserId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: "5h" }
  );
  return token 
};










export default generatedAccessToken;