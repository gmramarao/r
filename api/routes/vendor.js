'use strict';
var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    Vendor = require('../models/vendor'),
    User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    Category = require('../models/category'),
    SubCat = require('../models/sub-category'),
    Business = require('../models/business'),
    List = require('../models/list'),
Item = require('../models/item'),
BusinessStatus = require('../models/business_status'),
BusinessStatusLogs = require('../models/business_status_logs.js'),
    BusinessVisit = require('../models/business-visit'),
    BusinessVisitCount = require('../models/business-visit-count'),
    BusinessOrder = require('../models/business-order');
var moment = require('moment');
const Path = require('path');
const multer = require('multer');
const Order = require('../models/order');
const Rating = require('../models/rating');
const Request = require('request');
const Bcrypt = require('bcryptjs');
const async = require('async');
const Custom_order = require('../models/custom-order');
router.post('/register', function (req, res) {
    var email = req.body.email;
    var mobile = req.body.mobile;
        Vendor.findOne({
            email: email
        }, function (err1, doc1) {
            if (!err1) {
                if (!doc1) {
                    Vendor.findOne({
                        mobile: mobile
                    }, function (err2, doc2) {
                        if (!err2) {
                            if (!doc2) {

                                var j = new Vendor({
                                    name: req.body.name,
                                    email: req.body.email,
                                    mobile: req.body.mobile,
                                    password: req.body.password,
                                    registered_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                    last_login_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                });
                                Vendor.addVendor(j, function (err3, doc3) {
                                    if (err3) {
                                        res.json({
                                            success: false,
                                            msg: err3
                                        });
                                    } else {

                                        res.json({
                                            success: true,
                                            msg: doc3
                                        });
                                    }
                                });

                            } else {
                                res.json({
                                    success: false,
                                    msg: 'Mobile Exists'
                                });
                            }
                        } else {
                            res.json({
                                success: false,
                                msg: err2
                            });
                        }
                    })

                } else {
                    res.json({
                        success: false,
                        msg: 'Email exists'
                    });
                }
            } else {
                res.json({
                    success: false,
                    msg: err1
                });
            }
        })
    // Vendor.find({ email: email }, (er, found) => {
    //     if(er) {
    //         res.json({ success: false, msg: er });
    //     }else {
    //         if(found.length > 0) {
    //             res.json({ success: false, msg: 'Email exists' });
    //         }else {
    //             Vendor.find({ mobile: mobile }, (e, f) => {
    //                 if(e) {
    //                     res.json({ success: false, msg: e });
    //                 }else {
    //                     if (f.length > 0) {
    //                         res.json({ success: false, msg: 'Mobile Exists' });
    //                     }else {
    //                         if(f.length > 0) {
    //                             res.json({ success: true, msg: 'Vendor exists' });
    //                         }else {
    //                             // res.json({ success: true, msg:  });
    //                             // Add Vendor
    //                             var j = new Vendor({
    //                                 name: a.body.name,
    //                                 email: a.body.email,
    //                                 mobile: a.body.mobile,
    //                                 password: a.body.password,
    //                                 registered_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    //                                 last_login_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    //                             });
    //                             Vendor.addVendor(j, function(k, l) {
    //                                 if(k) {
    //                                     b.json({success: false, msg: k});
    //                                 }else{
    //                                     // Creat user
    //                                     // Check if user with same mobile exists
    //                                     b.json({ success: true, msg: l });
    //                                 }
    //                             });

    //                         }
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // })
});

router.get('/find-email/:email', function (a, b) {
    e = a.params.email, Vendor.find({
        email: e
    }, function (d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: 'Vendor Found'
        }) : b.json({
            success: !1,
            msg: 'No Vendor found'
        }) : b.json({
            success: !1,
            msg: 'No Vendor found'
        });
    });
});

router.get('/get-mobile-from-email/:email', function (a, b) {
    e = a.params.email, Vendor.find({
        email: e
    }, function (d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: f[0].mobile
        }) : b.json({
            success: !1,
            msg: 'No Vendor found'
        }) : b.json({
            success: !1,
            msg: 'No Vendor found'
        });
    });
});

router.get('/find-mobile/:mobile', function (req, res) {
    // m = a.params.mobile, Vendor.find({
    //     mobile: m
    // }, function(d, f) {
    //     f ? 0 < f.length ? b.json({
    //         success: !0,
    //         msg: 'Vendor Found'
    //     }) : b.json({
    //         success: !1,
    //         msg: 'No Vendor found'
    //     }) : b.json({
    //         success: !1,
    //         msg: 'No Vendor found'
    //     });
    // });
    Vendor.findOne({
        mobile: req.params.mobile
    }, function (err, doc) {
        if (doc) {
            res.json({
                success: true,
                msg: 'Vendor Found'
            });
        } else {
            res.json({
                success: false,
                msg: 'No Vendor found'
            });
        }
    })
});

// Get vendor by Id
router.get('/get-vendor-by-id/:vendor_id', function (req, res) {
    var vendor_id = req.params.vendor_id;
    Vendor.find({
        _id: vendor_id
    }, (err, vendor) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (vendor.length > 0) {
                res.json({
                    success: true,
                    msg: vendor
                });
            } else {
                res.json({
                    success: false,
                    msg: 'vendor_not_found'
                });
            }
        }
    });
});

// Get business by Id
router.get('/get-business-by-id/:id', function (req, res) {
    var id = req.params.id;
    Business.find({
        _id: id
    }, (err, business) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (business.length > 0) {
                res.json({
                    success: true,
                    msg: business
                });
            } else {
                res.json({
                    success: false,
                    msg: 'business_not_found'
                });
            }
        }
    });
});

router.post('/authenticate', function (a, b) {
    var d = a.body.mobile,
        f = a.body.password;

    Vendor.getVendorByMobile(d, function (g, h) {
        if (g) throw g;
        h || b.json({
            success: !1,
            msg: 'Vendor not found'
        }), Vendor.comparePassword(f, h.password, function (i, j) {
            if (i) throw i;
            if (j) {
                var k = jwt.sign({
                    data: h
                }, config.secret, {
                    expiresIn: 604800
                });
                // Update last login
                Vendor.findOneAndUpdate({
                    mobile: d
                }, {
                    last_login_time: moment().format('MMMM Do YYYY, h:mm:ss a')
                }, (err, updated) => {
                    if (updated) {
                        b.json({
                            success: !0,
                            token: 'JWT ' + k,
                            vendor: {
                                id: h._id,
                                name: h.name,
                                email: h.email,
                                mobile: h.mobile
                            }
                        });
                    } else {
                        b.json({
                            success: !0,
                            token: 'JWT ' + k,
                            vendor: {
                                id: h._id,
                                name: h.name,
                                email: h.email,
                                mobile: h.mobile
                            },
                            msg: 'login_time_not_updated'
                        });
                    }
                });

            } else b.json({
                success: !1,
                msg: 'Wrong Password'
            });
        });
    });
});

// Get vendor businesses
router.get('/get-vendor-businesses/:vendor_id', function (req, res) {
    var ven_id = req.params.vendor_id;
    Business.find({
        vendor_id: ven_id
    }, (err, busses) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (busses) {
                res.json({
                    success: true,
                    msg: busses
                });
            } else {
                res.json({
                    success: false,
                    msg: 'No businesses returned'
                });
            }
        }
    });
});

// Get All Categories
router.get('/get-all-categories', (req, res) => {
    Category.find({}, (err, cats) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: cats
            });
        }
    });
});

router.get('/get-sub-cats-of-cat/:cat_id', (req, res) => {
    var cat_id = req.params.cat_id;
    SubCat.find({
        category_id: cat_id
    }, (err, subs) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: subs
            });
        }
    });
});

// Add business
router.post('/add-business', function (req, res) {
    var business = req.body.business;
    var vendor_id = req.body.vendor_id;
    var plan = req.body.plan;
    var type = req.body.type;
    var coords = req.body.coords;
    console.log(req.body);
    var b = new Business({
        business: business,
        vendor_id: vendor_id,
        plan: plan,
        type: type,
        coords: coords,
        active: true,
        created_date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        last_updated: moment().format('MMMM Do YYYY, h:mm:ss a')
    });
    b.save((err, saved) => {
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
// Post business status
router.post('/post-business-status', (req, res) => {
    var id = req.body.b_id;
    var status = req.body.status;
    var b_stat;

    BusinessStatus.find({
        business_id: id
    }, (err, b) => {
        if (err) {
            // error occured
        } else {
            if (b.length > 0) {
                BusinessStatus.remove({
                    business_id: id
                }, (er, removed) => {
                    if (er) {
                        // Error
                        res.json({
                            success: false,
                            msg: er
                        });
                    } else {
                        b_stat = new BusinessStatus({
                            business_id: id,
                            status: status,
                            updated_date: moment().format('MMMM Do YYYY, h:mm:ss a')
                        });
                        b_stat.save((e, saved) => {
                            if (e) {
                                // error
                                res.json({
                                    success: false,
                                    msg: e
                                });
                            } else {
                                // Saved
                                res.json({
                                    success: true,
                                    msg: saved
                                });
                            }
                        });
                    }
                });
            } else {
                b_stat = new BusinessStatus({
                    business_id: id,
                    status: status,
                    updated_date: moment().format('MMMM Do YYYY, h:mm:ss a')
                });
                b_stat.save((e, saved) => {
                    if (e) {
                        // error
                        res.json({
                            success: false,
                            msg: e
                        });
                    } else {
                        // Saved
                        res.json({
                            success: true,
                            msg: saved
                        });
                    }
                });
            }
        }
    });
});



// Post list
router.post('/post-list', (req, res) => {
    var vendor_id = req.body.vendor_id;
    var list_name = req.body.list_name;
    var list_data = req.body.list_data;
    var business_id = req.body.business_id;

    var list = new List({
        list_name: list_name,
        list: list_data,
        business_id: business_id,
        vendor_id: vendor_id,
        created_date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        last_updated: moment().format('MMMM Do YYYY, h:mm:ss a')
    });

    list.save((err, saved) => {
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
    })
});

// Post Item
router.post('/post-item', (req, res) => {
    var vendor_id = req.body.vendor_id;
    var business_id = req.body.business_id;
    var item_data = req.body.item_data;
    var item_name = req.body.item_name;
    var item_price = req.body.item_price;
    var item_quality = req.body.item_quality;
    var list_id = req.body.list_id;

    var item = new Item({
        item_name: item_name,
        item_data: item_data,
        item_price: item_price,
        item_quality: item_quality,
        item_img: "https://asteriisc.com/hosted/product.png",
        business_id: business_id,
        vendor_id: vendor_id,
        list_id: list_id,
        created_date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        last_updated: moment().format('MMMM Do YYYY, h:mm:ss a')
    });

    item.save((err, saved) => {
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
    })
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

// Get list details
router.get('/get-list-details/:list_id', (req, res) => {
    var list_id = req.params.list_id;
    List.find({
        _id: list_id
    }, (err, list) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (list.length === 0) {
                res.json({
                    success: false,
                    msg: 'No items found'
                });
            } else {
                res.json({
                    success: true,
                    msg: list
                });
            }
        }
    });
});

// Get all items from vendor
router.get('/get-items-of-vendor/:vendor_id', (req, res) => {
    var id = req.params.vendor_id;
    Item.find({
        vendor_id: id
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

// Get number of items from business
router.get('/get-number-of-items-of-business/:b_id', (req, res) => {
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
            res.json({
                success: true,
                msg: items.length
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

//  Edit list
router.post('/edit-list', (req, res) => {
    var id = req.body.id;
    var edited_name = req.body.name;
    List.findOneAndUpdate({
        _id: id
    }, {
        list_name: edited_name,
        last_updated: moment().format('MMMM Do YYYY, h:mm:ss a')
    }, (err, updated) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: updated
            });
        }
    })
});

//  Edit item


// Get total visits of business
router.get('/get-total-business-visits/:b_id', (req, res) => {
    var b_id = req.params.b_id;
    BusinessVisitCount.find({
        business_id: b_id
    }, (err, bc) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: bc
            });
        }
    });
});

// Get total orders of business
router.get('/get-total-business-orders/:b_id', (req, res) => {
    var id = req.params.b_id;
    BusinessOrder.find({
        business_id: id
    }, (err, business) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: business.length
            });
        }
    });
});
router.get('/get-notification/:b_id', function (req, res) {
    Order.find({
        confirmation: 'pending'
    }, function (err, orders) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: orders
            });
        }
    })
})
router.put('/confirmation', function (req, res) {
    Order.update({
        _id: req.body.id,
        confirmation: 'pending'
    }, {
        $set: {
            confirmation: req.body.confirmation
        }
    }, function (err, confirmation) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: confirmation
            });
        }
    })
})

router.get('/get-orders/:b_id', function (req, res) {
    Order.find({b_id:req.params.b_id}, function (err, doc) {
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

router.get('/get-orders-status/:status/:b_id', function (req, res) {
    Order.find({
        confirmation: req.params.status, b_id: req.params.b_id
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
router.post('/rating', function (req, res) {
    Rating.insertMany(req.body, function (err, doc) {
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


router.get('/request-verification/:mobile', function (req, res) {
    Vendor.findOne({
        mobile: req.params.mobile
    }, function (err1, doc1) {
        if (!err1) {
            if (doc1) {
                var otp = Math.floor((Math.random() * 10000) + 1);
                var options = {
                    method: 'GET',
                    url: 'http://enterprise.smsgatewaycenter.com/SMSApi/rest/send',
                    qs: {
                        userId: 'reatchall',
                        password: 'Reatchall2030',
                        senderId: 'smsgate',
                        sendMethod: 'simpleMsg',
                        msgType: 'text',
                        mobile: req.params.mobile,
                        msg: 'Hi your verification code is ' + otp,
                        duplicateCheck: 'true',
                        format: 'json'
                    },
                    headers: { 'cache-control': 'no-cache' }
                };

                
                Request(options, function (err2, response, body) {
                    if (err2) {
                        console.log(err2);
                        res.json({
                            success: false,
                            msg: err2
                        });
                    } else {
                        console.log(body);
                        Vendor.update({
                            mobile: req.params.mobile
                        }, {
                            $set: {
                                otp: otp
                            }
                        }, function (err3, doc3) {
                            if (err3) {
                                res.json({
                                    success: false,
                                    msg: err3
                                });
                            } else {
                                res.json({
                                    success: true,
                                    msg: {
                                        otp: otp
                                    }
                                });
                            }
                        })
                    }
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Mobile number Not Registered'
                });
            }
        } else {
            res.json({
                success: false,
                msg: err1
            });
        }
    })

})

router.put('/verify-code', function (req, res) {
    Vendor.findOne({
        mobile: req.body.mobile,
        otp: req.body.otp
    }, function (err, doc) {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (doc) {
                res.json({
                    success: true,
                    msg: 'otp verified'
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Invalid verification code'
                });
            }

        }
    })
})

router.put('/reset-pwd', function (req, res) {
    async.waterfall([
        function(callback){
            Vendor.pwd_encrypt(req.body.pwd, callback);
        },
        function(hash, callback){
            Vendor.update({
                mobile: req.body.mobile,
                otp: req.body.otp
            }, {
                $set: {
                    password: hash,
                    otp: null
                }
            }, {
                multi: true
            },callback);
        }
    ], function(err, doc){
        if (!err) {
            if (doc.nModified) {
                res.json({
                    success: true,
                    msg: doc
                });
            } else {
                res.json({
                    success: false,
                    msg: 'password not updated'
                });
            }
        } else {
            res.json({
                success: false,
                msg: err
            });
        }

    })
    
})

router.put('/change-pwd', function (req, res) {
    async.waterfall([
        function(callback){
            Vendor.getVendorByMobile(req.body.mobile, callback);
        },
        function(text, callback){
            Vendor.comparePassword(req.body.old_pwd, text.password, callback);
        },
        function(text, callback){
            if(text){
                Vendor.pwd_encrypt(req.body.new_pwd, callback);
            } else {
                res.json({
                    success: false,
                    msg: 'Invalid old password'
                });
            }
        },
        function(encrypt_new_pwd, callback){
            Vendor.update({
                mobile: req.body.mobile
            }, {
                $set: {
                    password: encrypt_new_pwd
                }
            }, callback);
        }
    ], function(err, doc){
        if(err){
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: 'Password changed'
            });
        }

    })
})

router.put('/profile-setting', function (req, res) {
    async.waterfall([
        function(callback){
            Vendor.findOne({
                mobile: req.body.vendor_mobile,
                email: req.body.vendor_email
            },callback);
        },
        function(text, callback){
            if(text){
                Vendor.update({
                    mobile: req.body.vendor_mobile,
                    email: req.body.vendor_email
                }, {
                    $set: {
                        address: req.body.vendor_address,
                        name: req.body.vendor_name
                    }
                }, {
                    multi: true
                },callback);
            } else {
                res.json({
                    success: false,
                    msg: 'Please enter valid mobile number and amail'
                });
            }
        }
    ], function(err, doc){
        if(err){
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: 'updated succesfully'
            });
        }

    })

})
router.get('/get-present-cash/:id', function(req, res){
    res.json({success: true, msg:{balance:1000}});
})

router.get('/get-payment-history/:id', function(req, res){
    res.json({success: true, msg:{balance:1000}});
})

router.get('/get-balance-details/:id', function(req, res){
    res.json({success: true, msg:{balance:10000}});

})

router.get('/get-offers/:id', function(req, res){
    res.json({success: true, msg:{offers:100}});

})

router.get('/get-all-products/:id', function(req, res){
    res.json({success: true, msg:{products:100}});

})

router.get('/get-selected-group-items/:id', function(req, res){
    res.json({success: true, msg:{items:100}});

})

router.get('/get-current-orders/:id', function(req, res){
    Order.find({}, function(err, doc){
        if(!err){
            res.json({success: true, msg:doc});
        } else {
            res.json({success: false, msg:err});
        }
    })
    
})

router.get('/get-old-orders/:id', function(req, res){
    Order.find({}, function(err, doc){
        if(!err){
            res.json({success: true, msg:doc});
        } else {
            res.json({success: false, msg:err});
        }
    })
    
})

router.get('/get-custom-orders/:id', function(req, res){
    Custom_order.find({}, function(err, doc){
        if(!err){
            res.json({success: true, msg:doc});
        } else {
            res.json({success: false, msg:err});
        }
    })
    
})

router.get('/get-businesses/:b_id', function (req, res) {
    var b_id = req.params.b_id;
    status_find(req.params.b_id, function(err1, doc1){
        if(!err1){
            async.parallel([
                function(callback){
                    BusinessStatus.findOne({business_id: b_id}, callback);
                }, 
                function(callback){
                    Business.findOne({_id: b_id}, callback);
                }
            ], function(err, doc){
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
        } else {
            res.json({
                success: false,
                msg: err1
            });
        }
        
    })
    
    

})
    
    //     Business.findOne({
    //     _id: b_id
    //     }, (err, busses) => {
    //     if (err) {
    //         res.json({
    //             success: false,
    //             msg: err
    //         });
    //     } else {
    //         if (busses) {
    //             res.json({
    //                 success: true,
    //                 msg: busses
    //             });
    //         } else {
    //             res.json({
    //                 success: false,
    //                 msg: 'No businesses returned'
    //             });
    //         }
    //     }
    // });
          
    

router.put('/change-business-status', function(req, res){
    console.log(req.body);
    async.waterfall([
        function(callback){
            BusinessStatus.findOne({business_id:req.body.business_id}, callback);
        },
        function(text, callback){
            if(text){
                delete text._id;
                delete text.__v;
                console.log(text);
                const data = {
                    business_id: text.business_id,
                    status: text.status,
                    updated_date: text.updated_date
                }
                BusinessStatusLogs.insertMany(data, function(err, doc){
                    if(err){
                        callback(err, null);
                    } else {
                        BusinessStatus.remove({business_id:req.body.business_id}, callback);
                    }
                });
            } else {
                 callback(null, true);
            }
        },
        function(text, callback){
            delete req.body._id;
            console.log(req.body);
            const data = {
                business_id: req.body.business_id,
                status: req.body.status,
                updated_date: req.body.updated_date
            }
            BusinessStatus.insertMany(data, callback);
        }
    ], function(err, doc){
        if(err){
            res.json({success: false, msg: err});
        } else {
            res.json({success: true, msg:doc});
        }
    })
    
})




router.get('/get-visitor/analysis/:b_id', function(req, res){
    res.json({success: true, msg:{
        vistors_today: 10,
        visitors_past_30: 25,
        overall_visitors: 45
    }});
})

router.put('/change-business-settings', function(req, res){
    Business.update({_id: req.body.id}, {$set:{'business.name': req.body.name, 'business.contact_number': req.body.contact_number, 'business.address': req.body.address }}, {multi: true}, function(err, doc){
        if(err){
            res.json({ success: false, msg : err});
        } else {
            res.json({success: true, msg: doc});
        }
    })
})


router.get('/get-categorieson-onsection/:section', function(req, res){
    Category.find({section: req.params.section}, function(err, doc){
        if(err){
            res.json({success: false, msg: err});
        } else {
            res.json({success: true, msg: doc});
        }
    })
})


// Business status 
router.get('/get-business-status/:b_id', (req, res) => {
    var b_id = req.params.b_id;
    status_find(b_id, function(err, doc){
        if(!err){
            if(doc){
                res.json({success: true, msg:{status: doc.status}});
            } else {
                staus_find_on_dates(b_id, function(err1, doc1){
                    if(!err1){
                        res.json({success: true, msg:{status: doc1.status}});
                    } else {
                        res.json({success: false, msg:err1});
                    }
                })
            }
        } else {
            res.json({success: false, msg:err});
        }
    })
    // BusinessStatus.find({
    //     business_id: id
    // }, (er, found) => {
    //     if (er) {
    //         res.json({
    //             success: false,
    //             msg: er
    //         });
    //     } else {
    //         res.json({
    //             success: true,
    //             msg: found
    //         });
    //     }
    // });
});

function status_find(b_id, callback){
    BusinessStatus.findOne({business_id:b_id}, function(err1, doc1){
        if(err1){
            callback(err1, null);
        } else {
            console.log('doc1'+doc1);
            // console.log(moment(moment(new Date())).isAfter(moment(doc1.updated_date, 'MMMM Do YYYY, h:mm:ss a')))
            if(doc1){
                if(moment(moment(new Date())).isAfter(moment(doc1.updated_date, 'MMMM Do YYYY, h:mm:ss a'))){
                    delete doc1._id;
                    BusinessStatusLogs.insertMany(doc1, function(err2, doc2){
                        if(!err2){
                            BusinessStatus.remove({business_id:b_id}, function(err3, doc){
                                if(!err3){
                                    callback(null, false);
                                } else {
                                    callback(err3, null);
                                }
                            })
                        } else {
                            callback(err2, null);
                        }
                    })
                } else {
                    callback(null, doc1);
                }
                
            } else {
                callback(null, false);
            }
        }
    })
}

function staus_find_on_dates(b_id, callback){
    var today = moment();
    today = today.format("dddd");
    Business.findOne({_id: b_id}, function(err, doc){
        if(!err){
            if(doc.business.days && doc.business.days[today]){
                const opening_time = doc.business.timings[today].opening;
                const closing_time = doc.business.timings[today].closing;
                const open = moment(opening_time, 'h:mma');
                const close = moment(closing_time, 'h:mma');
                const cur_time = moment(new Date());
                console.log('current_time'+ cur_time);
                if (cur_time.isAfter(open)) {
                  if (cur_time.isBefore(close)) {
                    callback(null, {status: 'open'});
                  } else {
                      callback(null, {status: 'close'});
                  }
                } else {
                  callback(null, {status: 'close'});
                }
                
              }else {
                callback(null, {status: 'close'});
              }
            
        } else {
            callback(err, null);
        }
    })
}
module.exports = router;