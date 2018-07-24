// models
const shortId = require('shortid')

const snacks = [{
  id: "1",
  name: "Khanom Buang",
  origin: "Thailand",
  description: "Kanom Bueang is an ancient Thai dessert known as crispy pancakes in English. It is a popular form of street food in Thailand. These crepes look a bit like tacos. Khanom bueang are usually first topped or filled with coconut cream, followed by sweet or salty toppings such as shredded coconut, Foi Thong (strips of fried eggs or egg yolks), or chopped scallions",
  rating: 5
}, {
  id: "2",
  name: "Bonda",
  origin: "India",
  description: "Various sweet and spicy versions of exist different regions. The process of making a spicy bonda involves deep-frying potato (or other vegetables) filling dipped in gram flour batter.",
  rating: 3
}, {
  id: "3",
  name: "Croquette",
  origin: "France",
  description: "A French invention with worldwide popularity, a croquette is a small breadcrumbed fried food roll containing, usually as main ingredients, mashed potatoes and/or ground meat (veal, beef, chicken, or turkey), shellfish, fish, cheese, vegetables and mixed with béchamel or brown sauce,[3] and soaked white bread, egg, onion, spices and herbs, wine, milk, beer or any of the combination thereof, sometimes with a filling, e.g. sauteed onions or mushrooms, boiled eggs (Scotch eggs).",
  rating: 4
}]

function getAll() {
  return snacks
}

function getOne(id) {
  const errors = []
  let response;
  const getSnack = snacks.find(snack => snack.id === id)
  if (!getSnack) {
    errors.push(`Could not find snack with ID of ${id}`)
    response = {
      errors
    }
    return response
  }
  return getSnack
}

function create(body) {
  const errors = []
  const name = body.name
  const origin = body.origin
  const description = body.description
  const rating = body.rating

  let response
  if (!name || !origin || !description || !rating) {
    errors.push(`Name, origin, description, and rating are required`)
    response = {
      errors
    }
    return response
  }

  const newSnack = {
    id: shortId(),
    name,
    origin,
    description,
    rating
  }
  snacks.push(newSnack)
  return newSnack
}

function update(id, body) {
  const errors = []
  const name = body.name
  const origin = body.origin
  const description = body.description
  const rating = body.rating
  const updateSnack = snacks.find(snack => snack.id === id)
  let response;

  if (!updateSnack) {
    errors.push(`Could not find snack with ID of ${id}`)
    response = {
      errors
    }
    return response
  }

  if (!name || !origin || !description || !rating) {
    errors.push(`Name, origin, description, and rating are required`)
    response = {
      errors
    }
    return response
  }

  updateSnack.name = name
  updateSnack.origin = origin
  updateSnack.description = description
  updateSnack.rating = rating
  return updateSnack
}

function remove(id) {
  const errors = []
  const deleteSnack = snacks.find(snack => snack.id === id)
  let response;

  if (!deleteSnack) {
    errors.push(`Could not find snack with ID of ${id}`)
    response = {
      errors
    }
  }

  const index = snacks.indexOf(deleteSnack)
  snacks.splice(index, 1)
  return deleteSnack
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
