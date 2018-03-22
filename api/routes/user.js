'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const PrivacyPolicy = require('../models/privacy-policy');
const VendorPolicy = require('../models/vendorPolicy');
// Models
const User = require('../models/user');
const Terms = require('../models/t-and-c');
const TotalSiteVisits = require('../models/TotalSiteVisits');
const Business = require('../models/business');
const BusinessStatus = require('../models/business_status');
const About = require('../models/about');
const CareersCMS = require('../models/careers-cms');
const Category = require('../models/category');
const SubCategory = require('../models/sub-category');
const BusinessVisit = require('../models/business-visit');
const BusinessVisitCount = require('../models/business-visit-count');
const BusinessWishlist = require('../models/busienss-wishlist');
const ItemsWishlist = require('../models/items-wishlist');
const List = require('../models/list');
const Item = require('../models/item');
const Order = require('../models/order');
const Rating = require('../models/rating');
const FeaturedBusinessForHome = require('../models/featured-businesses-for-home');
const UserCart = require('../models/user-cart');
const Path = require('path');
const multer = require('multer');
const shortid = require('shortid');
const async = require('async');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const Custom_order = require('../models/custom-order');
const config_fields = require('../config/config.js');
// Get requests
// example.com/user/parameter1/parameter2/...

// Post requests
// You must pass an json object to a post url as you might have done in postman
// { key: value, key: value } 


const custom_order_storage = multer.diskStorage({
    destination: "./public/custom-orders/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + Path.extname(file.originalname));
    }
});

const custom_order_upload = multer({
    storage: custom_order_storage
}).any("image");


router.post('/register', function (a, b) {

    var mobile = a.body.mobile;
    var email = a.body.email;

    User.find({
        mobile: mobile
    }, (err, found) => {
        if (err) {
            b.json({
                success: false,
                msg: err
            });
        } else {
            if (found.length > 0) {
                b.json({
                    success: false,
                    msg: 'Mobile already exists'
                });
            } else {
                // find email
                User.find({
                    email: email
                }, (er, f) => {
                    if (er) {
                        b.json({
                            success: false,
                            msg: e
                        });
                    } else {
                        if (f.length > 0) {
                            b.json({
                                success: false,
                                msg: 'Email already exists'
                            });
                        } else {
                            var j = new User({
                                name: a.body.name,
                                email: a.body.email,
                                mobile: a.body.mobile,
                                password: a.body.password,
                                registered_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                last_login_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                            });
                            User.addUser(j, function (k, l) {
                                k ? b.json({
                                    success: !1,
                                    msg: 'Failed to Register'
                                }) : b.json({
                                    success: !0,
                                    msg: l
                                })
                            });
                        }
                    }
                });
            }
        }
    })



});


router.get('/find-email/:email', function (a, b) {
    User.findOne({
        email: a.params.email
    }, function (err, doc) {
        if (doc) {
            b.json({
                success: true,
                msg: 'User Found'
            });
        } else {
            b.json({
                success: false,
                msg: 'No user found'
            });
        }
    });
});
router.get('/get-mobile-from-email/:email', function (a, b) {
    e = a.params.email, User.find({
        email: e
    }, function (d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: f[0].mobile
        }) : b.json({
            success: !1,
            msg: 'No user found'
        }) : b.json({
            success: !1,
            msg: 'No user found'
        })
    })
});
router.get('/find-mobile/:mobile', function (a, b) {
    User.findOne({
        mobile: a.params.mobile
    }, function (err, doc) {
        if (doc) {
            b.json({
                success: true,
                msg: 'User Found'
            })
        } else {
            b.json({
                success: false,
                msg: 'No user found'
            })
        }
    })

});
router.post('/authenticate', function (a, b) {
    var d = a.body.mobile,
        f = a.body.password;

    User.getUserByMobile(d, function (g, h) {
        if (g) throw g;
        h || b.json({
            success: !1,
            msg: 'User not found'
        }), User.comparePassword(f, h.password, function (i, j) {
            if (i) throw i;
            if (j) {
                var k = jwt.sign({
                    data: h
                }, config.secret, {
                    expiresIn: 604800
                });
                b.json({
                    success: !0,
                    token: 'JWT ' + k,
                    user: {
                        id: h._id,
                        name: h.name,
                        username: h.username,
                        email: h.email,
                        mobile: h.mobile
                    }
                })
            } else b.json({
                success: !1,
                msg: 'Wrong Password'
            })
        })
    });
});

// Posting user's visit to business'
router.post('/post-vendor-visit-by-user', (req, res) => {
    user_id = req.body.user_id;
    business_id = req.body.business_id;
});

// Posting user location
router.post('/post-user-location', (req, res) => {

});

// Update user details
router.post('/update-user', (req, res) => {

});

// Change password
router.post('/change-password', (req, res) => {

});

// Updating total site visit count
router.get('/update-site-visits', (req, res) => {
    TotalSiteVisits.find((err, visits) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            // res.json({success: true, msg: ''})
            var vsts;
            if (visits['0']) {
                var vs = visits[0].visits;
                if (visits.length < 1) {
                    vsts = 1;
                    TotalSiteVisits.remove((e) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Removing document failed'
                            });
                        } else {
                            var v = new TotalSiteVisits({
                                visits: vsts
                            });
                            v.save((er, v_saved) => {
                                if (er) {
                                    res.json({
                                        success: false,
                                        msg: er
                                    });
                                } else {
                                    res.json({
                                        success: true,
                                        msg: v_saved,
                                        visit_number: visits
                                    });
                                }
                            });
                        }
                    });
                } else {
                    vsts = vs + 1;
                    TotalSiteVisits.remove((e) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Removing document failed'
                            });
                        } else {
                            var v = new TotalSiteVisits({
                                visits: vsts
                            });
                            v.save((er, v_saved) => {
                                if (er) {
                                    res.json({
                                        success: false,
                                        msg: er
                                    });
                                } else {
                                    res.json({
                                        success: true,
                                        msg: v_saved,
                                        visit_number: visits
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    });
});
router.get('/get-terms', function (req, res) {
    Terms.find((er, terms) => {
        if (er) {
            res.json({
                success: false,
                msg: er
            });
        } else {
            res.json({
                success: true,
                msg: terms
            });
        }
    });
});
router.get('/privacy-policy', function (req, res) {
    PrivacyPolicy.find((er, terms) => {
        if (er) {
            res.json({
                success: false,
                msg: er
            });
        } else {
            res.json({
                success: true,
                msg: terms
            });
        }
    });
});
router.get('/vendor-policy', function (req, res) {
    VendorPolicy.find((er, terms) => {
        if (er) {
            res.json({
                success: false,
                msg: er
            });
        } else {
            res.json({
                success: true,
                msg: terms
            });
        }
    });
});

router.get('/careers-cms', function (req, res) {
    CareersCMS.find((er, terms) => {
        if (er) {
            res.json({
                success: false,
                msg: er
            });
        } else {
            res.json({
                success: true,
                msg: terms
            });
        }
    });
});

router.get('/get-about', function (req, res) {
    About.find((er, terms) => {
        if (er) {
            res.json({
                success: false,
                msg: er
            });
        } else {
            res.json({
                success: true,
                msg: terms
            });
        }
    });
});

// Getting all businesses
router.get('/get-all-businesses', (req, res) => {
    Business.find((err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});

// Getting business status by id
router.get('/get-business-status/:id', (req, res) => {
    var id = req.params.id;
    BusinessStatus.find({
        business_id: id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});

// Getting Category by id
router.get('/get-cat-from-id/:cat_id', (req, res) => {
    var id = req.params.cat_id;
    Category.find({
        _id: id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});

// Getting Category by name
router.get('/get-cat-from-name/:name', (req, res) => {
    var name = req.params.name;
    Category.find({
        name: name
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});
// Getting subs of cat
router.get('/get-sub-cats-of-cat/:id', (req, res) => {
    var id = req.params.cat_id;
    SubCategory.find({
        category_id: id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});

// Getting Business by id
router.get('/get-business-by-id/:b_id', (req, res) => {
    var id = req.params.b_id;
    Business.find({
        _id: id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});

router.get('/get-main-cats', (req, res) => {

});

var s3 = new aws.S3({
    accessKeyId: config_fields.accessKeyId,
    secretAccessKey: config_fields.secretAccessKey
});
var storage = multerS3({
    s3: s3,
    bucket: config_fields.bucket+'/custome',
    metadata: function (req, file, cb) {

        cb(null, {
            fieldName: file.originalname
        });
    },
    key: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 90000) + 10000 + file.originalname)
    }
})

var upload = multer({
    storage: storage
});
// var uploads = function(id){
//     retunr console.log(id);
//     callback(id);
// }

router.post('/post-custom-order', upload.array('uploads[]', 12), (req, res) => {
    var order_id = shortid.generate();
    const data = {
        business_id: req.body.business_id,
        user_id: req.body.user_id,
        file_name: req.files[0].key,
        order_id: order_id,
        confirmation: 'pending'
    };
    Custom_order.insertMany(data, function (err, doc) {
        if (!err) {
            res.json({
                status: true,
                msg: doc
            });
        } else {
            res.json({
                status: false,
                msg: err
            });
        }
    })
});


router.post('/post-visit-to-business', (req, res) => {
    var user_id = req.body.user_id;
    var user_ip = req.body.user_ip;
    var business_id = req.body.business_id;
    var visited_time = moment().format('MMMM Do YYYY, h:mm:ss a');
    // Increase business visit count
    BusinessVisitCount.find({
        business_id: business_id
    }, (error, f) => {
        if (error) {

        } else {
            if (f.length > 0) {
                var num = parseInt(f[0].number_of_visits) + 1;
                BusinessVisitCount.findOneAndUpdate({
                    business_id: business_id
                }, {
                    number_of_visits: num,
                    last_visited_time: visited_time
                }, (errr, upd) => {
                    if (errr) {

                    } else {
                        // Updated
                    }
                });
            } else {
                let bc = new BusinessVisitCount({
                    business_id: business_id,
                    number_of_visits: 1,
                    last_visited_time: visited_time
                });
                bc.save((rre, sv) => {
                    if (rre) {
                        console.log(rre);
                    } else {
                        console.log(sv);
                    }
                });
            }
        }
    });
    BusinessVisit.find({
        user_id: user_id,
        business_id: business_id
    }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            if (found.length < 1) {
                // Create new document
                let bv = new BusinessVisit({
                    user_id: user_id,
                    user_ip: user_ip,
                    business_id: business_id,
                    number_of_visits: 1,
                    last_visited_time: visited_time
                });
                bv.save((e, saved) => {
                    if (e) {
                        res.json({
                            success: false,
                            msg: e
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: saved
                        });
                    }
                })
            } else {
                var num = parseInt(found[0].number_of_visits) + 1;
                // Update the number of visits
                BusinessVisit.findOneAndUpdate({
                    user_id: user_id,
                    business_id: business_id
                }, {
                    number_of_visits: num,
                    last_visited_time: visited_time
                }, (er, updated) => {
                    if (er) {
                        res.json({
                            success: false,
                            msg: er
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: updated
                        });
                    }
                });
            }
        }
    });
});

// Add business to wishlist
router.post('/add-business-to-wishlist', (req, res) => {
    user_id = req.body.user_id;
    business_id = req.body.business_id;
    time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var bw = BusinessWishlist({
        user_id: user_id,
        business_id: business_id,
        added_time: time
    });
    bw.save((err, saved) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: saved
            });
        }
    });
});

// Check business to wishlist
router.post('/check-business-in-wishlist', (req, res) => {
    var user_id = req.body.user_id;
    var business_id = req.body.business_id;
    BusinessWishlist.find({
        user_id: user_id,
        business_id: business_id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    });
});

// Check item to wishlist
router.post('/check-item-in-wishlist', (req, res) => {
    user_id = req.body.user_id;
    item_id = req.body.item_id;
    ItemsWishlist.find({
        user_id: user_id,
        item_id: item_id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    });
});

// Remove business to wishlist
router.post('/remove-business-in-wishlist', (req, res) => {
    user_id = req.body.user_id;
    business_id = req.body.business_id;
    BusinessWishlist.remove({
        user_id: user_id,
        business_id: business_id
    }, (err, removed) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: removed
            });
        }
    });
});

// Remove item to wishlist
router.post('/remove-item-in-wishlist', (req, res) => {
    user_id = req.body.user_id;
    item_id = req.body.item_id;
    BusinessWishlist.remove({
        user_id: user_id,
        business_id: business_id
    }, (err, removed) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: removed
            });
        }
    });
});

// Get user business wishlist
router.post('/get-user-business-wishlist/:user_id', (req, res) => {
    console.log('heyy');
    user_id = req.params.user_id;
    BusinessWishlist.find({
        user_id: user_id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    });
});

// Get all lists of business
router.get('/get-lists-of-business/:b_id', (req, res) => {
    var id = req.params.b_id;
    List.find({
        business_id: id
    }, (err, items) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (items.length === 0) {
                res.json({
                    success: false,
                    msg: 'No List found'
                });
            } else {
                res.json({
                    success: true,
                    msg: items
                });
            }
        }
    });
});

// Get all items from business
router.get('/get-items-of-business/:b_id', (req, res) => {
    var id = req.params.b_id;
    Item.find({
        business_id: id
    }, (err, items) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (items.length === 0) {
                res.json({
                    success: false,
                    msg: 'No items found'
                });
            } else {
                res.json({
                    success: true,
                    msg: items
                });
            }
        }
    });
});

// Get items from a list
router.get('/get-items-of-list/:list_id', (req, res) => {
    var list_id = req.params.list_id;
    Item.find({
        list_id: list_id
    }, (err, items) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (items.length === 0) {
                res.json({
                    success: false,
                    msg: 'No items found'
                });
            } else {
                res.json({
                    success: true,
                    msg: items
                });
            }
        }
    });
});

// Get user cart
router.get('/get-cart/:user_id', (req, res) => {
    var user_id = req.params.user_id;
    UserCart.find({
        user_id: user_id
    }, (err, cart) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: cart
            });
        }
    });
});

// Add to cart
router.post('/add-to-user-cart', (req, res) => {
    var user_id = req.body.user_id;
    var item_id = req.body.item_id;
    UserCart.find({
        user_id: user_id
    }, (err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            // res.json({ success: true,  })
            if (found.length > 0) {
                // Insert into cart
                UserCart.findOneAndUpdate({
                    user_id: user_id
                }, {
                    $push: {
                        cart: item_id
                    },
                    last_updated: moment().format('MMMM Do YYYY, h:mm:ss a')
                }, (er, updated) => {
                    if (er) {
                        if (er) {
                            res.json({
                                success: false,
                                msg: er
                            });
                        } else {
                            res.json({
                                success: true,
                                msg: updated
                            });
                        }
                    } else {

                    }
                });
            } else {
                // Create cart
                let cart = new UserCart({
                    user_id: user_id,
                    cart: [item_id],
                    last_updated: moment().format('MMMM Do YYYY, h:mm:ss a')
                });
                cart.save((e, saved) => {
                    if (e) {
                        res.json({
                            success: false,
                            msg: e
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: saved
                        });
                    }
                })
            }
        }
    });
});
//  remove from cart
router.post('/remove-from-cart', (req, res) => {
    var user_id = req.body.user_id;
    var item_id = req.body.item_id;
    var cart_status = req.body.cart_status;
    console.log(cart_status);
    console.log(req.body.id);
    // res.json({ msg: 'hi' });
    UserCart.update({
        user_id: user_id
    }, {
        $pullAll: {
            cart: [item_id]
        }
    }, (err, stat) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                msg: err
            });
        } else {
            Item.update({
                _id: item_id
            }, {
                cart_status: cart_status
            }, {
                upsert: true
            }, function (err, doc) {
                res.json({
                    success: true,
                    msg: stat
                });
            })
        }
    });
});
//  get featured businesses
router.get('/get-featured-businesses', (req, res) => {
    FeaturedBusinessForHome.find((err, found) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    })
});

// post order

router.post('/post-order', function (req, res) {
    console.log(req.body);
    var order_id = shortid.generate();
    Order.insertMany({
        user_id: req.body.user_id,
        order_id: order_id,
        orders: req.body.orders,
        confirmation: 'pending'
    }, function (err, doc) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            Item.update({
                _id: {
                    $in: req.body.id
                },
                cart_status: true
            }, {
                $set: {
                    cart_status: false
                }
            }, {
                multi: true
            }, function (err, doc1) {
                console.log(doc1);
                res.json({
                    success: true,
                    msg: doc
                });
            });
        }
    })
})

router.get('/get-confirmation/:id', function (req, res) {
    Order.findOne({
        _id: req.params.id
    }, function (err, confr) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: confr
            });
        }
    })
})
router.put('/set-vendorRes', function (req, res) {
    Order.update({
        _id: req.body.id,
        confirmation: req.body.current_status
    }, {
        $set: {
            confirmation: req.body.modify_status
        }
    }, function (err, doc) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: doc
            });
        }
    })
})

router.put('/profile-setting', function (req, res) {
    async.waterfall([
        function (callback) {
            User.findOne({
                mobile: req.body.mobile,
                email: req.body.email
            }, callback)
        },
        function (text, callback) {
            if (text) {
                User.update({
                    mobile: req.body.mobile,
                    email: req.body.email
                }, {
                    $set: {
                        dob: req.body.dob,
                        address: req.body.address,
                        gender: req.body.gender,
                        name: req.body.name
                    }
                }, {
                    multi: true
                }, callback)
            } else {
                res.json({
                    status: false,
                    msg: 'Please enter valid email and mobile number'
                });
            }
        }
    ], function (err, doc) {
        if (err) {
            res.json({
                status: false,
                msg: err1
            });
        } else {
            res.json({
                status: true,
                msg: doc
            });
        }

    })
    
})

router.put('/change-pwd', function (req, res) {
    async.waterfall([
        function (callback) {
            User.findOne({
                mobile: req.body.mobile
            }, callback);
        },
        function (text, callback) {
            if (text) {
                User.comparePassword(req.body.opwd, text.password, callback);
            } else {
                res.json({
                    success: false,
                    msg: 'something wrong'
                });
            }
        },
        function (text, callback) {
            if (text) {
                User.pwd_encrypt(req.body.npwd, callback);
            } else {
                res.json({
                    success: false,
                    msg: 'Invalid old password'
                });
            }
        },
        function (hash, callback) {
            User.update({
                mobile: req.body.mobile
            }, {
                $set: {
                    password: hash
                }
            }, callback);
        }
    ], function (err, doc) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: 'password changed succesfully'
            });
        }
    })
    
})

router.get('/get-orders/:id', function (req, res) {
    Order.find({
        user_id: req.params.id
    }, function (err, doc) {
        if (!err) {
            res.json({
                status: true,
                msg: doc
            });
        } else {
            res.json({
                status: false,
                msg: err
            });
        }
    })
})

router.post('/rating', function (req, res) {
    Rating.insertMany(req.body, function (err, doc) {
        if (err) {
            res.json({
                status: false,
                msg: err
            });
        } else {
            res.json({
                status: true,
                msg: doc
            });
        }
    })
})


// Get user items wishlist
module.exports = router;