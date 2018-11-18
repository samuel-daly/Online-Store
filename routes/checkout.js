var express                 = require('express');
var paypal                  = require('paypal-rest-sdk')
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');

// Paypal configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AY95JiVsKZzvyLwHL4Jjo3jP9apIYlgoM-tVOIYmc6quV4O3COyVpCjdoWheVdAT79gCxCrOaQrlt0CN',
  'client_secret': 'EB4sgOLYE2sR_qmHw4fFE7WFmDV8_5V0Voo63-wdyZVB-YK9Biw063fD51bvjHT6WseNB8Phj59u9PZN'
});

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var cartArray = cart.generateArray();
    var items = [];
    for (var item in cartArray){
      items.push({"name": cartArray[item].item.title,
                 "sku": cartArray[item]._id,
                 "price": cartArray[item].item.price,
                 "currency": "CAD",
                 "quantity": cartArray[item].qty})
    }

    var totalPrice = cart.totalPrice;
    var totalPriceString = totalPrice.toString();
    var didPaymentSucceed = Math.random();

    var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/checkout/checkout-success",
        "cancel_url": "http://localhost:3000/checkout/checkout-cancel"
    },
    "transactions": [{
        "item_list": {
            "items": items
        },
        "amount": {
            "currency": "CAD",
            "total": totalPriceString
        },
        "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0; i < payment.links.length; i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
    });

});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
    var totalPriceString = totalPrice.toString();
    var payerID = req.query.PayerID;
    var paymentId = req.query.paymentId;



    var execute_payment_json = {
    "payer_id": payerID,
    "transactions": [{
        "amount": {
            "currency": "CAD",
            "total": totalPriceString
        }
    }]
};

paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Get Payment Response");
        //console.log(JSON.stringify(payment));
        var newOrder = new Order({
                        orderID             : payment.id,
                        username            : req.user.username,
                        address             : payment.payer.payer_info.shipping_address.line1 + " " + payment.payer.payer_info.shipping_address.city + " " + payment.payer.payer_info.shipping_address.state + " " + payment.payer.payer_info.shipping_address.postal_code,
                        orderDate           : payment.create_time,
                        shipping            : true
                      });
                    newOrder.save();
                    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});



    }
});
    //This clears the shopping bag once the payment goes through
    req.session.cart.items = {};
    req.session.cart.totalQty = 0;
    req.session.cart.totalPrice = 0;

});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;
