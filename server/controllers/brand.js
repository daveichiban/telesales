const Brand = require('../models').Brand;

module.exports = {
  create(req, res) {
    return Brand
      .create({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        imageUrl: req.body.imageUrl
      })
      .then(brand => res.status(201).send(brand))
      .catch(error => res.status(400).send(error));
  },
};
