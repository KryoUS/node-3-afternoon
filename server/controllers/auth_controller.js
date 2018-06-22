const users = require('../models/users');
let id = 1;

module.exports = {
    login: (req, res, next) => {
      const { username, password } = req.body;

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
          req.session.username = user.username;
          res.status(200).send(req.session.user);
      } else {
          res.status(500).send('Something bad happened.');
      }
    },

    register: (req, res, next) => {
        users.push({ id: id, username: req.body.username, password: req.body.password });
        id++;
        req.session.user.username = req.body.username;
        res.status(200).send(req.session.user);
    },

    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session)
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}