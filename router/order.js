const express = require('express')
const orderModel = require('../model/order')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

// total get order
router.get('/', checkAuth, (req, res) => {

    orderModel
        .find()
        .then(orders => {
            res.json({
                msg : "get orders",
                count : orders.length,
                orderInfo : orders.map(order => {
                    return{
                        id : order._id,
                        product : order.product,
                        quantity : order.quantity,
                        date : order.createdAt
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

// detail get order
router.get('/:orderId', checkAuth, (req, res) => {

    const id = req.params.orderId

    orderModel
        .findById(id)
        .then(order => {
            if(!order){
                return res.status(400).json({
                    msg : "no order id"
                })
            }
            res.json({
                msg : "get order",
                orderInfo : {
                    id : order._id,
                    product : order.product,
                    quantity : order.quantity,
                    date : order.createdAt
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

// register order
router.post('/', checkAuth, (req, res) => {

    const {product, quantity} = req.body

    const newOrder = new orderModel(
        {
            product,
            quantity
        }
    )

    newOrder
        .save()
        .then(order => {
            res.json({
                msg : "register order",
                orderInfo : {
                    id : order._id,
                    product : order.product,
                    quantity : order.quantity,
                    date : order.createdAt
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

// update order
router.patch("/:orderId", checkAuth, (req, res) => {

    const id = req.params.orderId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(id, {$set : updateOps})
        .then(order => {
            if(!order){
                return res.status(400).json({
                    msg : "no order id"
                })
            }
            res.json({
                msg : "update order by " + id
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
} )

// total delete order
router.delete('/', checkAuth, (req, res) => {

    orderModel
        .remove()
        .then(() => {
            res.json({
                msg : "delete orders"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })

        })
})

// detail delete order
router.delete('/:orderId', checkAuth, (req, res) => {

    const id = req.params.orderId

    orderModel
        .findByIdAndRemove(id)
        .then(order => {
            if(!order){
                return res.status(400).json({
                    msg : "no order id"
                })
            }
            res.json({
                msg : "delete order by " + id
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

module.exports = router