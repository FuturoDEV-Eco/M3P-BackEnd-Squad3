const { compare, compareSync } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

class LoginController {
  async login(request, response) {
    try {
      const data = request.body;

      if (!data.email || !data.senha) {
        return response
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // bcryptjs functions, functions to compare encrypted passwords to login:

      const user = await Usuario.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return response.status(404).json({ mensagem: "Conta não encontrada" });
      }

      if (!user) {
        return response.status(404).json({ message: "Account not found" });
      }

      const rightPassword = compareSync(data.senha, user.password_hash);

      if (rightPassword === false) {
        return response.status(404).json({ mensagem: "Account not found" });
      }

      // ---------------------------------------------------------

      if (rightPassword === false) {
        return response.status(404).json({
          message: "Account not found with this email or password",
        });
      }

      const token = sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      response.json({
        token: token,
        name: user.name,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Error logging in" });
    }
  }
}

module.exports = new LoginController();
