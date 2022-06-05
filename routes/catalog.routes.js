const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Product = require('../models/Product')
const BasketProduct = require('../models/BasketProduct')
const User = require('../models/User')
const Basket = require('../models/Basket')
const LikesList = require('../models/LikesList')
const Like = require('../models/Like')
const Review = require('../models/Review')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')

router.post(
    '/addproduct',
    // authMiddleware,
    async (req, res) => {

        try {
            const product = req.body

            const newProduct = new Product(product)

            await newProduct.save()

            res.status(201).json({ message: 'Продукт добавлен', product: newProduct })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.delete(
    '/delete/:id',
    // authMiddleware,
    async (req, res) => {
        try {
            const id = req.params.id.slice(1);

            await Product.findByIdAndDelete(id)

            res.status(201).json({ message: 'Продукт удален' })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.get(
    '/',
    async (req, res) => {
        try {
            let query = req.query;
            const perPage = 12;
            const total = await Product.count();
            let pagesCount = Math.ceil(total / perPage);
            const page = parseInt(query.page) || 1;
            let startFrom = (page - 1) * perPage;
            let sort;

            if (query.sample) {
                let match = {};
                match.inStock = true;

                if (query.onsale) match.onsale = true;

                const products = await Product.aggregate([
                    {
                        $match: match
                    },
                    {
                        $project: { name: 1, category: 1, catalogImg: 1, size: 1, material: 1, manufacture: 1, rate: 1, discount: 1, inStock: 1, onsale: 1, price: 1, reviews: 1 }
                    },
                    {
                        $sample: { size: 8 }
                    }
                ])

                return res.json({ c: products.length, products })
            }




            if (query.sort === "byprice") {
                sort = { inStock: -1, price: -1 }
            } else if (query.sort === "byreviews") {
                sort = { inStock: -1, reviews: -1 }
            } else {
                sort = { inStock: -1 }
            }

            let params = new Object;

            if (query.category) params.category = query.category;

            for (let i in query) {
                if (i !== "sort" || i !== "name" || i !== "price") {
                    let results = query[i].split(",");

                    params[i] = {
                        $in: results
                    }
                }
            }

            if (query.name) params.name = { $regex: new RegExp(query.name), $options: "i" }
            if (query.category) params.category = { $regex: new RegExp(query.category), $options: "i" }
            if (query.price) {
                let price = query.price.split(",")

                params.price = {
                    "$gte": price[0],
                    "$lte": price[1]
                }
            }

            const products = await Product.find(params, { name: 1, category: 1, catalogImg: 1, size: 1, material: 1, manufacture: 1, rate: 1, discount: 1, inStock: 1, onsale: 1, price: 1, reviews: 1 })
                .skip(startFrom)
                .limit(perPage)
                .sort(sort)
                .lean()

            // if (!Object.keys(params).length == 0) {
            //     pagesCount = Math.ceil(products.length / perPage);
            // } else {
            //     pagesCount = Math.ceil(total / perPage);
            // }

            return res.json({ l: products.length, count: pagesCount, products })

        } catch (e) {
            console.log(e)
            res.status(503).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.get(
    '/getFilters',

    async (req, res) => {
        try {

            const filters = await Product.find({}, { material: 1, manufacture: 1, steel: 1, handle: 1, guardback: 1, price: 1 })

            const makeUniq = (arr, name, way) => {
                return {
                    name: name,
                    data: [...new Set(arr)],
                    way: way
                }
            };

            let price = filters.map(filter => filter.price)
            let material = filters.map(filter => filter.material)
            let manufacture = filters.map(filter => filter.manufacture)
            let steel = filters.map(filter => filter.steel)
            let handle = filters.map(filter => filter.handle)
            let guardback = filters.map(filter => filter.guardback)

            const min = Math.min.apply(null, price);
            const max = Math.max.apply(null, price);

            return res.json({ min, max, filtersList: [makeUniq(material, "Материалы", "material"), makeUniq(manufacture, "Производство", "manufacture"), makeUniq(steel, "Сталь", "steel"), makeUniq(handle, "Рукоять", "handle"), makeUniq(guardback, "Гарда и тыльник", "guardback")] })

        } catch (e) {
            console.log(e)
            res.status(503).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })




router.patch(
    '/edit/:id',
    async (req, res) => {
        try {

            const { updates } = req.body

            const id = req.params.id.slice(1);
            const options = { new: true }

            const product = await Product.findByIdAndUpdate(id, updates, options)

            return res.json({ product })

        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
)

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

            const candidate = await Product.findOne({ _id: id }, { productImg: 0 });

            if (!candidate) {
                return res.status(400).json({ message: 'Такого продукта не существует' })
            };

            let theId = req.params.id.slice(1);

            const basket = await Basket.findOne({ owner: theId }).populate('products')
                .populate({
                    path: 'products',
                    populate: {
                        path: 'data'
                    }
                })

            const candProduct = await BasketProduct.findOne({ data: candidate, owner: basket._id }).populate('data')

            if (candProduct) {
                candProduct.count = candProduct.count + 1
                await candProduct.save();
                return res.status(201).json({ message: 'Продукт +1', product: candProduct })
            };

            const product = new BasketProduct({ data: candidate, owner: basket._id });

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

            const basket = await Basket.findOne({ owner: userId }, { productImg: 0 }).populate('products')

            basket.products = basket.products.filter(product => product.data._id.toString().replace(/new ObjectId\("(.*)"\)/, "$1") !== productId);

            await basket.save()

            await BasketProduct.findOneAndDelete({ data: productId, owner: basket._id });

            return res.status(204).json({ id: productId })

        } catch (e) {
            res.status(404)
            console.log(e)
            res.send({ error: "Product doesn't exist!" })
        }
    })

router.patch(
    "/removeoneproduct",
    // authMiddleware,
    async (req, res) => {
        try {
            const { userId, productId } = req.query;

            const basket = await Basket.findOne({ owner: userId }).populate('products')

            const candProduct = await BasketProduct.findOne({ data: productId, owner: basket._id })

            if (candProduct.count < 2) {
                basket.products = basket.products.filter(product => product.data._id.toString().replace(/new ObjectId\("(.*)"\)/, "$1") !== productId);

                await basket.save()

                await candProduct.delete();

                return res.status(204).json({ id: productId, isDeleted: true })
            }

            candProduct.count = candProduct.count - 1

            await candProduct.save()

            return res.status(205).json({ id: productId, isDeleted: false })

        } catch (e) {
            res.status(404)
            console.log(e)
            res.send({ error: "Product doesn't exist!" })
        }
    })

router.patch(
    "/clearbasket",
    // authMiddleware,
    async (req, res) => {
        try {
            const { userId } = req.query;

            const basket = await Basket.findOne({ owner: userId }).populate('products')

            basket.products = [];

            await basket.save()

            return res.status(200).json({ message: "Ok" })

        } catch (e) {
            res.status(404)
            console.log(e)
            res.send({ error: "Product doesn't exist!" })
        }
    })

router.patch(
    '/like/:id',
    // authMiddleware,
    async (req, res) => {
        try {
            const { id } = req.body;

            const candidate = await Product.findOne({ _id: id }, { productImg: 0 });

            if (!candidate) {
                return res.status(400).json({ message: 'Такого продукта не существует' })
            };

            let theId = req.params.id.slice(1);

            const likesList = await LikesList.findOne({ owner: theId }).populate('likes')
                .populate({
                    path: 'likes',
                    populate: {
                        path: 'data'
                    }
                })

            const candProduct = await Like.findOne({ data: candidate }).populate('data')


            if (candProduct) {
                likesList.likes = likesList.likes.filter(like => like._id.toString().replace(/new ObjectId\("(.*)"\)/, "$1") !== candProduct._id.toString().replace(/new ObjectId\("(.*)"\)/, "$1"));
                await likesList.save();

                await Like.findOneAndDelete({ _id: candProduct._id });

                return res.status(201).json({ message: 'Лайк удален', likeId: candProduct._id, delete: true }) // , product: candProduct
            };

            const like = new Like({ data: candidate });

            likesList.likes.push(like)

            await likesList.save();

            await like.save();

            return res.status(201).json({ message: 'Продукт лайкнут', like, delete: false })


        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


router.patch(
    '/addreview',
    // authMiddleware,
    async (req, res) => {
        try {
            const { text, productId, userId, rate } = req.body;

            const user = await User.findOne({ _id: userId })

            const review = new Review({ text, author: user.name, authorId: userId, rate, owner: productId })

            const product = await Product.findOne({ _id: productId }).populate('reviews')

            product.reviews.push(review)

            let allRate = 0;

            product.reviews.forEach(review => {
                allRate += review.rate;
            })

            product.rate = allRate / product.reviews.length;

            await product.save();

            await review.save();

            return res.status(201).json({ message: 'Отзыв отправлен', review })


        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


router.patch(
    "/removereview",
    // authMiddleware,
    async (req, res) => {
        try {
            const { productId, reviewId } = req.body;

            const product = await Product.findOne({ _id: productId }, { productImg: 0, catalogImg: 0 }).populate('reviews')

            await Review.findOneAndDelete({ _id: reviewId, owner: productId })

            product.reviews = product.reviews.filter(review => review._id.toString().replace(/new ObjectId\("(.*)"\)/, "$1") !== reviewId)

            await product.save();

            return res.status(201).json({ message: 'Отзыв удален', review: reviewId })

        } catch (e) {
            res.status(404)
            console.log(e)
            res.send({ error: "Product doesn't exist!" })
        }
    })



module.exports = router