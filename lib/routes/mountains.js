const Router = require('hapi').Router;
const router = Router();
const Mountain = require('../models/mountain');

router
  .get('/', (req, res, next) => {
    Mountain.find()
      .then(mountain => res.send(mountains))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Mountain.findById(id)
      .then(mountain => {
        if (!mountain) res.status(404).statusMessage(`${id} not found`);
        else res.send(mountain);
      })
      .catch(next);
  })
  
  .post('/', (req, res, next) => {
    new Mountain(req.body)
      .save()
      .then(mountain => res.send(mountain))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Mountain.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(mountain => res.send(mountain))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Mountain.findByIdAndRemove(req.params.id)
      .then(response => {
        res.send({removed: response ? true : false });
      })
      .catch(next);
  });


module.exports = router;