const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Product = require('../models/Product')
const Basket = require('../models/Basket')
const BasketProduct = require('../models/BasketProduct')
const User = require('../models/User')
const Review = require('../models/Review')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')


router.post(
  '/addproduct',
  // authMiddleware,
  async (req, res) => {
    try {

      const { name, size, material, manufacture, steel, handle, guardback, gilding, trademark, serie, price, description, onsale } = req.body

      const product = new Product({ name, size, material, manufacture, steel, handle, guardback, gilding, trademark, serie, price, description, onsale })

      await product.save()

      res.status(201).json({ message: 'Продукт добавлен' })

    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.get(
  '/',
  // authMiddleware,
  async (req, res) => {
    // const match = {}
    // console.log(req.query.onSale)

    // if (req.query.onSale) {
    //   match.onSale = req.query.onSale === "true"
    // }

    try {

      const products = await Product.find()
      // const products = await Product.find().populate({
      //   path: 'onsale',
      //   match
      // }).exec()

      return res.json({ products })

    } catch (e) {
      console.log(e)
      res.status(503).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.get(
  '/onsale',
  // authMiddleware,
  async (req, res) => {
    try {

      const products = await Product.find({ onsale: true })

      return res.json({ products })

    } catch (e) {
      res.status(500).json({ message: e })
    }
  })

router.get(
  '/:id',
  // authMiddleware,
  async (req, res) => {
    try {

      let id = req.params.id.slice(1);

      const product = await Product.findOne({ _id: id }).populate('reviews')

      return res.json({ product })

    } catch (e) {
      res.status(500).json({ message: e })
    }
  })


router.patch(
  '/addtobasket/:id',
  // authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.body;

      console.log(id)

      const candidate = await Product.findOne({ _id: id });

      if (!candidate) {
        return res.status(400).json({ message: 'Такого продукта не существует' })
      };

      let theId = req.params.id.slice(1);

      const basket = await Basket.findOne({ owner: theId })

      const candProduct = await BasketProduct.findOne({ owner: basket._id, _id: id })

      if (candProduct) {
        candProduct.count = candProduct.count + 1
        await candProduct.save();
        return res.status(201).json({ message: 'Продукт +1', product: candProduct })
      };

      const product = new BasketProduct({ _id: candidate._id, name: candidate.name, price: candidate.price, owner: basket._id });

      basket.products.push(product)

      await basket.save();

      await product.save();

      return res.status(201).json({ message: 'Продукт добавлен до корзины', product })


    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.delete(
  "/removeproduct",
  // authMiddleware,
  async (req, res) => {
    try {
      const { userId, productId } = req.query

      // console.log(2, userId, productId)

      const basket = await Basket.findOne({ owner: userId })

      let outBasket = basket.products.filter(itemId => {
        let out = itemId.toString().replace(/new ObjectId\("(.*)"\)/, "$1")

        return out !== productId
      })


      basket.products = outBasket
      await basket.save()

      const baskProduct = await BasketProduct.findOne({ owner: basket._id, _id: productId });
      await baskProduct.delete()

      res.status(204).json({ id: productId })


    } catch (e) {
      res.status(404)
      console.log(e)
      res.send({ error: "Product doesn't exist!" })
    }
  })

// router.get(
//   '/filter',
//   //  authMiddleware,
//   async (req, res) => {
//     try {
//       let filter = req.query;

//       console.log(filter)

//       // let id = req.params.id.slice(1);


//       // const product = await Product.findOne({ id })

//       // return res.json({ product })

//     } catch (e) {
//       res.status(500).json({ message: e })
//     }
//   })

router.patch(
  '/addreview',
  // authMiddleware,
  async (req, res) => {
    try {
      const { text, productId, userName, rate } = req.body;

      const review = new Review({ text, author: userName, rate, owner: productId })

      const product = await Product.findOne({ _id: productId })

      product.reviews.push(review)

      await product.save();

      await review.save();

      return res.status(201).json({ message: 'Отзыв отправлен', review })


    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.delete(
  "/removereview",
  // authMiddleware,
  async (req, res) => {
    try {
      const { productId } = req.body;

      const product = await Product.findOne({ _id: productId })

      product.reviews = []

      await product.save();

      return res.status(201).json({ message: 'Отзыв удален' })

    } catch (e) {
      res.status(404)
      console.log(e)
      res.send({ error: "Product doesn't exist!" })
    }
  })

module.exports = router