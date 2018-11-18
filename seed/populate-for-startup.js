var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');
var fs          = require("fs");

mongoose.connect('mongodb://localhost/shoppingApp');

var products = [
    new Product({
        imagePath   : 'https://stockx.imgix.net/Adidas-Yeezy-Boost-350-V2-Semi-Frozen-Yellow-2.jpg?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Adidas Yeezy 350 Boost V2',
        description : 'Adidas Yeezy 350 Boost V2 Semi-Frozen Yellow',
        price       : 339.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Adidas-Human-Race-NMD-Pharrell-Oreo.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Adidas Human Race NMD',
        description : 'Adidas Human Race Pharrell Williams Oreo',
        price       : 339.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Adidas-NMD-R1-Core-Black-Carbon.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Adidas NMD R1',
        description : 'Adidas NMD R1 Core Black',
        price       : 179.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Adidas-Yeezy-Boost-350-V2-Beluga-2pt0.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Adidas Yeezy 350 Boost V2',
        description : 'Adidas Yeezy 350 Boost V2 Beluga 2.0',
        price       : 339.99
    }),
    new Product({
        imagePath   : 'https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/2/0/201484_1.jpg',
        title       : 'Adidas Yeezy 750 Boost',
        description : 'Adidas Yeezy 750 Boost Chocolate',
        price       : 449.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Air-Jordan-3-Retro-Black-Cement-2018-1.jpg?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Nike Air Jordan 3',
        description : 'Nike Air Jordan 3 Black Cement',
        price       : 259.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Nike-Air-Force-1-Mid-Black-2016.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Nike Air Force 1',
        description : 'Nike Air Force 1 Black (2016)',
        price       : 119.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Nike-Air-Max-1-Air-Max-Day-2017-GS.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Nike Air Max 1',
        description : 'Nike Air Max 1 Air Max Day Red 2017',
        price       : 119.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Nike-Blazer-Mid-Off-White.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Nike Blazer Mid',
        description : 'Nike Blaze Mid Off-White',
        price       : 179.99
    }),
    new Product({
        imagePath   : 'https://stockx.imgix.net/Adidas-Ultra-Boost-4-Oreo.png?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40',
        title       : 'Adidas Ultra Boost 4.0',
        description : 'Adidas Ultra Boost 4.0 Cookies and Cream',
        price       : 279.99
    })
];
Product.remove({},function(err){
  if(err){
    console.log("ERROR:Remove Prouduct failed");
    return
  }
  console.log("Old Prouduct data was removed sucessfully")
  for (var i = 0; i < products.length; i++){
      products[i].save(function(err, result) {
          if (i === products.length - 1){
              mongoose.disconnect();
          }
      });
  }
})

var users =[
new User({
    username    : 'Cadmin@admin.com',
    password    : 'admin',
    fullname    : 'Cuneyt Celebican',
    admin       : true
}),

new User({
    username    : 'd-pierre90@hotmail.com',
    password    : '1234',
    fullname    : 'Darren Pierre',
    admin       : true
}),

new User({
    username    : 'ta@testing.com',
    password    : 'carleton18',
    fullname    : 'TA',
    admin       : true
}),


 new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Sam Daly',
    admin       : true
})

]




User.remove({},function(err){
  if(err){
    console.log("ERROR:Remove User failed");
    return
  }
  console.log("Old User data was removed sucessfully")
  for (var i = 0; i < users.length; i++){


    User.createUser(users[i], function(err, user){
        if(err) throw err;
        console.log(user);
        mongoose.disconnect();


    });


  }




})
