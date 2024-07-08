import userModel from './../models/user.model.js';


//!aad to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cart = await userData.cart;
        if (!cart[req.body.itemId]) {
            cart[req.body.itemId] = 1;
        }
        else {
            cart[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cart })
        res.json({ success: true, message: "adding to cart!" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error adding to cart!" })
    }
}

//!remover from cart
const removeFromCart = async (req, res) => {

}

//!fetch user cart data
const getCart = async (req, res) => {

}

export { addToCart, removeFromCart, getCart };