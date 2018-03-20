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
    List = require('../models/list');
Item = require('../models/item');
BusinessStatus = require('../models/business_status'),
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
    email = req.body.email,
        mobile = req.body.mobile,
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
    vendor_id = req.params.vendor_id;
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
    id = req.params.id;
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
    ven_id = req.params.vendor_id;
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
    Category.find((err, cats) => {
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
    cat_id = req.params.cat_id;
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
    business = req.body.business;
    vendor_id = req.body.vendor_id;
    plan = req.body.plan;
    type = req.body.type;
    coords = req.body.coords;
    console.log(type);
    var b = new Business({
        business: business,
        vendor_id: vendor_id,
        plan: plan,
        type: type,
        coords: coords,
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
    id = req.body.b_id;
    status = req.body.status;

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

router.get('/get-business-status/:id', (req, res) => {
    id = req.params.id;
    BusinessStatus.find({
        business_id: id
    }, (er, found) => {
        if (er) {
            res.json({
                success: false,
                msg: er
            });
        } else {
            res.json({
                success: true,
                msg: found
            });
        }
    });
});

// Post list
router.post('/post-list', (req, res) => {
    vendor_id = req.body.vendor_id;
    list_name = req.body.list_name;
    list_data = req.body.list_data;
    business_id = req.body.business_id;

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
    vendor_id = req.body.vendor_id;
    business_id = req.body.business_id;
    item_data = req.body.item_data;
    item_name = req.body.item_name;
    item_price = req.body.item_price;
    item_quality = req.body.item_quality;
    list_id = req.body.list_id;

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
    list_id = req.params.list_id;
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
    list_id = req.params.list_id;
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
    id = req.params.vendor_id;
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
    id = req.params.b_id;
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
    id = req.params.b_id;
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
    id = req.params.b_id;
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
    id = req.body.id;
    edited_name = req.body.name;
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
    b_id = req.params.b_id;
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
    id = req.params.b_id;
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
    Order.find({}, function (err, doc) {
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
        confirmation: req.params.status
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
    console.log(req.body);
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
    console.log(req.body);
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
    Vendor.pwd_encrypt(req.body.pwd, function (err1, hash) {
        if (!err1) {
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
            }, function (err2, doc) {
                if (!err2) {
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
                        msg: err2
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

router.put('/change-pwd', function (req, res) {
    Vendor.getVendorByMobile(req.body.mobile, function (err1, doc1) {
        if (!err1) {
            Vendor.comparePassword(req.body.old_pwd, doc1.password, function (err2, doc2) {
                console.log(doc2);
                if (!err2) {
                    if (doc2) {
                        Vendor.pwd_encrypt(req.body.new_pwd, function (err3, encrypt_new_pwd) {
                            if (!err3) {
                                Vendor.update({
                                    mobile: req.body.mobile
                                }, {
                                    $set: {
                                        password: encrypt_new_pwd
                                    }
                                }, function (err4, doc4) {
                                    if (!err4) {
                                        res.json({
                                            success: true,
                                            msg: 'Password changed'
                                        });
                                    } else {
                                        res.json({
                                            success: false,
                                            msg: err4
                                        });
                                    }
                                })
                            } else {
                                res.json({
                                    success: false,
                                    msg: err3
                                });
                            }
                        })
                    } else {
                        res.json({
                            success: false,
                            msg: 'Invalid old password'
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
                msg: err1
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
    // Vendor.findOne({
    //     mobile: req.body.vendor_mobile,
    //     email: req.body.vendor_email
    // }, function (err1, doc1) {
    //     if (!err1) {
    //         if (doc1) {
    //             Vendor.update({
    //                 mobile: req.body.vendor_mobile,
    //                 email: req.body.vendor_email
    //             }, {
    //                 $set: {
    //                     address: req.body.vendor_address,
    //                     name: req.body.vendor_name
    //                 }
    //             }, {
    //                 multi: true
    //             }, function (err, doc) {
    //                 if (!err) {
    //                     if (doc.nModified) {
    //                         res.json({
    //                             success: true,
    //                             msg: 'updated succesfully'
    //                         });
    //                     } else {
    //                         res.json({
    //                             success: false,
    //                             msg: 'Profile data not updated'
    //                         });
    //                     }
    //                 } else {
    //                     res.json({
    //                         success: false,
    //                         msg: err
    //                     });
    //                 }
    //             })
    //         } else {
    //             res.json({
    //                 success: false,
    //                 msg: 'Please enter valid mobile number and amail'
    //             });
    //         }
    //     } else {
    //         res.json({
    //             success: false,
    //             msg: err1
    //         });
    //     }

    // })

})
router.get('/get-present-cash/:id', function(req, res){
    res.json({status: true, msg:{balance:1000}});
})

router.get('/get-payment-history/:id', function(req, res){
    res.json({status: true, msg:{balance:1000}});
})

router.get('/get-balance-details/:id', function(req, res){
    res.json({status: true, msg:{balance:10000}});

})

router.get('/get-offers/:id', function(req, res){
    res.json({status: true, msg:{offers:100}});

})

router.get('/get-all-products/:id', function(req, res){
    res.json({status: true, msg:{products:100}});

})

router.get('/get-selected-group-items/:id', function(req, res){
    res.json({status: true, msg:{items:100}});

})

router.get('/get-current-orders/:id', function(req, res){
    Order.find({}, function(err, doc){
        if(!err){
            res.json({status: true, msg:doc});
        } else {
            res.json({status: false, msg:err});
        }
    })
    
})

router.get('/get-old-orders/:id', function(req, res){
    Order.find({}, function(err, doc){
        if(!err){
            res.json({status: true, msg:doc});
        } else {
            res.json({status: false, msg:err});
        }
    })
    
})

router.get('/get-custom-orders/:id', function(req, res){
    Custom_order.find({}, function(err, doc){
        if(!err){
            res.json({status: true, msg:doc});
        } else {
            res.json({status: false, msg:err});
        }
    })
    
})

module.exports = router;