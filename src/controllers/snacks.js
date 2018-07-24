// controllers
const model = require('../models/snacks')

function getAll(req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function getOne(req, res, next) {
  const id = req.params.id
  const result = model.getOne(id)

  if (result.errors) {
    return next({
      status: 404,
      message: result.errors
    })
  }
  res.status(200).json({ data: result })
}

function create(req, res, next) {
  const body = req.body
  const result = model.create(body)

  if(result.errors){
    return next({
      status: 400,
      message: result.erros
    })
    return result
  }
  res.status(201).json({ data: result })
}

function update(req, res, next) {
  const id = req.params.id
  const body = req.body

  if(!body){
    return next({
      status: 400,
      message: `Bad Request`
    })
  }

  const result = model.update(id, body)

  if(result.errors){
    return next({
      status: 404,
      message: result.errors
    })
  }
  res.status(200).json({ data: result })
}

function remove(req, res, next) {
  const id = req.params.id
  const data = model.remove(id)

  if (data.errors) {
    return next({
      status: 404,
      message: data.errors
    })
  }
  res.status(200).json({ data })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
