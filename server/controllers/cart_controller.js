const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        const index = cart.findIndex( swag => swag.id == id );

        if ( index === -1 ) {
        const selectedSwag = swag.find( swag => swag.id == id );

        cart.push( selectedSwag );
        req.session.user.total += selectedSwag.price;
        }

        res.status(200).send(req.session.user);
    },

    delete: (req, res, next) => {
        const foundSwag = swag.find(swag => swag.id == req.query.id);

        if (foundSwag) {
            const cartIndex = req.session.user.cart.findIndex( swag => swag.id == req.query.id);
            req.session.user.cart.splice(cartIndex, 1);
            req.session.user.total -= foundSwag.price;
        }

        res.status(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;

        res.status(200).send(req.session.user);
    }
}