import User  from "../model/User.js"
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({
        message: "Mail kayıtlı değil",
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!isCorrectPassword) {
      return res.status(403).json({
        success: false,
        message: "Parola hatalı",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ success: true, });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export { login, register };
