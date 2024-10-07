const { Op } = require("sequelize");
const Usuario = require("../models/Usuario");
const Location = require("../models/local");

class UsuarioController {
  async create(request, response) {
    console.log("request IS:");
    console.dir(request.body);

    const dados = request.body;

    const { nome, cpf, email, password, dataNascimento, sexo, endereco } =
      request.body;

    const userExist = await Usuario.findOne({
      where: {
        email: dados.email,
      },
    });

    if (userExist) {
      return response
        .status(409)
        .json({ mensagem: "Ja existe uma conta com esse email" });
    }

    const errors = [];
    if (!nome) {
      errors.push({
        msg: "User name is required and not null",
        param: "nome",
      });
    }

    if (dados.cpf.length !== 11) {
      return response
        .status(404)
        .json("Seu CPF esta incorreto, por favor digite novamente");
    }

    if (!cpf) {
      errors.push({
        msg: "CPF is required and not null",
        param: "cpf",
      });
    }

    if (!email) {
      errors.push({
        msg: "Email is required and not null",
        param: "email",
      });
    }

    if (
      email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.push({
        msg: "Please enter a valid email address.",
        param: "email",
      });
    }

    if (!password) {
      errors.push({
        msg: "User password is required and not null",
        param: "password",
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    const existingUser = await Usuario.findOne({
      where: {
        email,
        cpf,
      },
    });

    if (existingUser) {
      return response.status(409).json({ message: "Account already exists" });
    }

    try {
      const usuario = await Usuario.create({
        nome,
        cpf,
        email,
        password_hash: dados.password,
        dataNascimento,
        endereco,
        sexo,
      });

      const usuarioPlain = usuario.get({ plain: true });
      const maskedUsuario = {
        ...usuarioPlain,
        cpf: "*****",
        endereco: "*****",
        dataNascimento: "*****",
        password_hash: "*****",
      };

      return response.status(201).json(maskedUsuario);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to create user",
        error,
      });
    }
  }

  async searchAll(request, response) {
    try {
      const { nome, cpf, email, dataNascimento, endereco, sexo } =
        request.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.like]: `%${nome}%` };
      }

      if (cpf) {
        where.cpf = { [Op.like]: `%${cpf}%` };
      }

      if (email) {
        where.email = { [Op.like]: `%${email}%` };
      }
      if (dataNascimento) {
        where.dataNascimento = { [Op.like]: `%${dataNascimento}%` };
      }

      if (endereco) {
        where.endereco = { [Op.like]: `%${endereco}%` };
      }

      if (sexo) {
        where.sexo = { [Op.like]: `%${sexo}%` };
      }
      console.log("query IS:");
      console.log(request.query);

      const usuarios = await Usuario.findAll({ where });

      const maskedUsuarios = usuarios.map((user) => ({
        ...user["dataValues"],
        cpf: "*****",
        endereco: "*****",
        dataNascimento: "*****",
        password_hash: "*****",
      }));

      response.json({ maskedUsuarios });
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to search for users",
      });
    }
  }

  async update(request, response) {
    const { nome, cpf, email, senha, dataNascimento, endereco, sexo } =
      request.body;
    const errors = [];
    if (
      !nome &&
      !cpf &&
      !email &&
      !senha &&
      !dataNascimento &&
      !endereco &&
      !sexo
    ) {
      errors.push({
        msg: "At least one of the following must be a valid update value: name, cpf, email, password, birth date, address or gender.",
        param: ["nome"],
      });
    }

    if (
      email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.push({
        msg: "Please enter a valid email address.",
        param: "email",
      });
    }

    if (cpf !== undefined) {
      return response.status(403).json({
        mensagem: "Use CPF cannot be modified",
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    try {
      const id = request.params.id;
      const dados = request.body;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "User id not found",
        });
      }

      if (dados.nome) usuario.nome = dados.nome;
      if (dados.cpf) usuario.cpf = dados.cpf;
      if (dados.email) usuario.email = dados.email;
      if (dados.senha) usuario.senha = dados.senha;
      if (dados.dataNascimento) usuario.dataNascimento = dados.dataNascimento;
      if (dados.endereco) usuario.endereco = dados.endereco;
      if (dados.sexo) usuario.sexo = dados.sexo;

      await usuario.save();
      const usuarioPlain = usuario.get({ plain: true });
      const maskedUsuario = {
        ...usuarioPlain,
        cpf: "*****",
        endereco: "*****",
        dataNascimento: "*****",
        password_hash: "*****",
      };

      response.json(maskedUsuario);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to update user",
      });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "User with the given id was not found",
        });
      }

      const locaisCount = await Location.count({ where: { userId: id } });

      if (locaisCount > 0) {
        return response.status(400).json({
          mensagem:
            "User cannot be deleted because they have associated locatios",
        });
      }

      await usuario.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to search for user",
      });
    }
  }

  async searchOne(request, response) {
    const id = request.params.id;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return response.status(404).json({
        mensagem: "Unable to find an user with the given id",
      });
    }
    const usuarioPlain = usuario.get({ plain: true });
    const maskedUsuario = {
      ...usuarioPlain,
      cpf: "*****",
      endereco: "*****",
      dataNascimento: "*****",
      password_hash: "*****",
    };
    response.json(maskedUsuario);
  }
  async searchAllForDashboard() {
    try {
      const usuarios = await Usuario.findAll();
      return usuarios;
    } catch (error) {
      throw new Error("Erro ao buscar usuários");
    }
  }
}

module.exports = new UsuarioController();
