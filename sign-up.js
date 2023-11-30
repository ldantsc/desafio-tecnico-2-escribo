const express = require('express');
const Usuario = require('./models/user');
const { usersData, findUserEmail, userViewer } = require('./models/data');
const app = express.Router();

// SIGN UP

app.get('/signup', (req, res) => {
  res.json({test: "test"})
});

// método POST
app.post('/signup', (req, res) => {
  // Criando usuario...
  try {
    let { nome, email, senha, telefones } = req.body;
    //verificar se email existe no array de dados usuarios
    const isEmailExist = findUserEmail(email);
    //se usuario não existir, criar novo usuario
    if (!isEmailExist) {
      const newUser = new Usuario(
        usersData.length,
        nome,
        email,
        senha,
        telefones,
      );
      usersData.push(newUser);
      res.status(201).json(userViewer(newUser))
    } else {
      // se existir, retornar mensagem
      res.send({ mensagem: 'E-mail já existente' });
    }
  } catch (err) {
    res.send({ mensagem: 'mensagem de erro' });
  }
});

module.exports = app;
