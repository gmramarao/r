'use strict';
var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    Admin = require('../models/admin'),
    Terms = require('../models/t-and-c'),
    bcrypt = require('bcryptjs'),
    TotalSiteVisits = require('../models/TotalSiteVisits'),
    Category = require('../models/category'),
    SubCat = require('../models/sub-category'),
    User = require('../models/user'),
    Vendor = require('../models/vendor'),
    Business = require('../models/business'),
    MainCats = require('../models/main-cats'),
    PrivacyPolicy = require('../models/privacy-policy'),
    VendorPolicy = require('../models/vendorPolicy'),
    About = require('../models/about'),
    CareersCMS = require('../models/careers-cms'),
    FeaturedBusinessForHome = require('../models/featured-businesses-for-home');
var Path = require('path');
var multer = require('multer');
var moment = require('moment');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAJOXBOI7BT2GAWNLA";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});


router.post('/register', function(a, b) {
    var j = new Admin({
        email: a.body.email,
        password: a.body.password,
    });
    Admin.addUser(j, function(k, l) {
        k ? b.json({
            success: !1,
            msg: 'Failed to Register'
        }) : b.json({
            success: !0,
            msg: l
        });
    });
});

router.get('/find-email/:email', function(a, b) {
    Admin.findOne({email: a.params.email}, function(err, doc){
        if(err){
            b.json({status: false, msg:'No Admin found'});
        } else {
            if(!doc){
                b.json({status: false, msg:'No Admin found'});
            } else {
                b.json({status: true, msg:'Admin Found'});
            }
        }
    })
    
}); 

router.post('/authenticate', function(a, b) {
    var d = a.body.email,
        f = a.body.password;
        Admin.getUserByEmail(d, (err, admin) =>{
          if (err) throw err;
          if(admin.length === 0) {
            b.json({ success: false, msg: 'Admin not found'});
          }else{
            Admin.comparePassword(f, admin.password, function(i, j) {
              if (i) throw i;
              if (j) {
                  var k = jwt.sign({
                      data: admin
                  }, config.secret, {
                      expiresIn: 604800
                  });
                  b.json({
                      success: !0,
                      token: 'JWT ' + k,
                      admin: {
                          id: admin._id,
                          email: admin.email,
                      }
                  });
              } else b.json({
                  success: !1,
                  msg: 'Wrong Password'
              });
          });
          }
        });
});

// Get Number of users
router.get('/get-num-of-users', function(req, res) {
    User.find((er, users)=>{
        if(er){
            res.json({success: false, msg: er});
        }else{
            res.json({success: true, msg: users.length});
        }
    });
});
// Get Number of businesses
router.get('/get-num-of-buses', function(req, res) {
    Business.find((er, buses) => {
        if(er){
            res.json({success: false, msg: er});
        }else{
            res.json({success: true, msg: buses.length});
        }
    });
});
// Get Number of vendors
router.get('/get-num-of-vendors', function(req, res) {
    Vendor.find((er, vendors) => {
        if(er){
            res.json({success: false, msg: er});
        }else{
            res.json({success: true, msg: vendors.length});
        }
    });
});

// Get Terms
router.get('/get-terms', function(req, res) {
    Terms.find((er, terms)=>{
        if(er){
            res.json({success: false, msg: er});
        }else{
            res.json({success: true, msg: terms});
        }
    });
});
// Changing terms and conditions page text
router.post('/post-terms', function(req, res) {
    
    var dat = req.body.data;
    var terms = new Terms({data: dat});
    Terms.remove({},(err)=>{
        if(err){
            res.json({success: false, msg :err});
        }else{
            // Add data to schema
            terms.save(terms, (er, saved)=>{
                if(err){
                    res.json({success: false, msg :er});
                }else{
                    res.json({success: true, msg : 'posted'});
                }
            });
        }
    });
});

// Changing Privacy page text
router.post('/post-privacy', function(req, res) {
    
    var dat = req.body.data;
    var pp = new PrivacyPolicy({data: dat});
    PrivacyPolicy.remove({},(err)=>{
        if(err){
            res.json({success: false, msg :err});
        }else{
            // Add data to schema
            pp.save((er, saved)=>{
                if(err){
                    res.json({success: false, msg :er});
                }else{
                    res.json({success: true, msg : saved});
                }
            });
        }
    });
});

// Changing Vendor Policy page text
router.post('/post-vendor-policy', function(req, res) {
    
    var dat = req.body.data;
    var vp = new VendorPolicy({data: dat});
    VendorPolicy.remove({},(err)=>{
        if(err){
            res.json({success: false, msg :err});
        }else{
            // Add data to schema
            vp.save((er, saved)=>{
                if(err){
                    res.json({success: false, msg :er});
                }else{
                    res.json({success: true, msg : saved});
                }
            });
        }
    });
});

// Changing Vendor Policy page text
router.post('/post-careers-cms', function(req, res) {
    
    var dat = req.body.data;
    var ccms = new CareersCMS({data: dat});
    CareersCMS.remove({},(err)=>{
        if(err){
            res.json({success: false, msg :err});
        }else{
            // Add data to schema
            ccms.save((er, saved)=>{
                if(err){
                    res.json({success: false, msg :er});
                }else{
                    res.json({success: true, msg : saved});
                }
            });
        }
    });
});

// Changing About
router.post('/post-about', function(req, res) {
    
    var dat = req.body.data;
    var ab = new About({data: dat});
    About.remove({},(err)=>{
        if(err){
            res.json({success: false, msg :err});
        }else{
            // Add data to schema
            ab.save((er, saved)=>{
                if(err){
                    res.json({success: false, msg :er});
                }else{
                    res.json({success: true, msg : saved});
                }
            });
        }
    });
});

// Get total site visits
router.get('/get-total-visits', function(req, res) {
    TotalSiteVisits.find((er, terms)=>{
        if(er){
            res.json({success: false, msg: er});
        }else{
            res.json({success: true, msg: terms});
        }
    });
});

// Get All Categories
router.get('/get-all-categories',(req,res)=>{
    Category.find((err, cats)=> {
        if(err){
            res.json({success: false, msg: err});
        }else{
            res.json({success: true, msg: cats});
        }
    });
});

// Add Category
router.post('/add-category', function(req, res) {
    
    var name = req.body.name;
    var time = req.body.time;
    var cat = new Category({name: name,created_date: time});
    // Add Category t Schema
    cat.save((er, saved)=>{
        if(er){
            res.json({success: false, msg :er});
        }else{
            res.json({success: true, msg : saved});
        }
    });
});

// Delete Category
router.post('/delete-category', function(req, res) {
    
    var id = req.body.cat_id;
    Category.deleteOne({_id:id},(err, deleted)=> {
        if(err) {
            res.json({success: false, msg :err});
        }else{
            if(deleted) {
                res.json({success: true, msg :deleted});
            }else{
                res.json({success: false, msg : 'Something went wrong'});
            }
        }
    });

});

router.get('/get-sub-cats-of-cat/:cat_id', (req,res)=>{
    var cat_id = req.params.cat_id;
    SubCat.find({category_id: cat_id}, (err, subs)=>{
        if(err){
            res.json({success: false, msg: err});
        }else{
            res.json({success: true, msg: subs});
        }
    });
});

// Pause Business
router.get('/pause-business/:b_id', (req,res)=>{
    var business_id = req.params.b_id;
    Business.findByIdAndUpdate({ _id: business_id },{ paused: true }, (err, updated) => {
        if(err) {
            res.json({ success: false, msg: err });
        }else {
            res.json({ success: true, msg: updated });
        }
    });
});

// Pause vendor
router.get('/pause-vendor/:v_id', (req,res)=>{
    var vendor_id = req.params.v_id;
    Business.find({ vendor_id: vendor_id },(err, busses) => {
        if(err) {

        }else {
            busses.forEach(bus => {
                bus.paused = true;
                bus.save((err, bus) => {
                    console.log(err);
                    console.log(bus);
                })
            });
        }
    });
});

router.get('/get-all-users', (req,res)=>{
    User.find((err,users) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: users });
        }
    });
});

router.get('/get-all-vendors', (req,res)=>{
    Vendor.find((err,users) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: users });
        }
    });
});

// Get all superadmins
router.get('/get-all-admins', (req,res)=>{
    Admin.find((err,users) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: users });
        }
    });
});

// Get all businesses
router.get('/get-all-businesses', (req,res)=>{
    Business.find((err,bus) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: bus});
        }
    });
});
// Add admin
router.post('/add-admin', (req,res)=>{
    var email = req.body.email;
    password = req.body.password,
    vendor_page = req.body.vendors_page,
    business_page = req.body.business_page,
    users_page = req.body.users_page,
    orders_page = req.body.orders_page,
    main_menu_page = req.body.main_menu_page,
    add_cats_page = req.body.add_categories_page,
    add_sub_cats_page = req.body.add_subs_page,
    edit_cats_page = req.body.edit_cats_page,
    cms_page = req.body.cms_page,
    emp_page = req.body.emp_page,
    delivery_tracking_page = req.body.delivery_tracking_page,
    add_super_admin_page = req.body.add_super_admin_page,
    add_sub_admin_page = req.body.add_sub_admin_page;
    let admin = new Admin({
        email: email,
        password: password,
        permissions: {
            vendors_page: vendor_page,
            business_page: business_page,
            users_page: users_page,
            orders_page: orders_page,
            main_menu_page: main_menu_page,
            add_cats_page: add_cats_page,
            add_sub_cats_page: add_sub_cats_page,
            edit_cats_page: edit_cats_page,
            cms_page: cms_page,
            emp_page: emp_page,
            delivery_tracking_page: delivery_tracking_page,
            add_super_admin_page: add_super_admin_page,
            add_sub_admin_page: add_sub_admin_page
        }
    });
    Admin.addUser(admin, (er, ad) => {
        if(er){
            res.json({ success: false, msg: er });
        }else {
            res.json({ success: true, msg: ad });
        }
    });
});

// Get businesses by type
router.get('/get-business-by-type/:type', (req,res)=>{
    var type = req.params.type;
    Business.find({ type: type } ,(err,bus) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: bus});
        }
    });
});

router.get('/get-admin/:id', (req,res)=>{
    var id = req.params.id;
    Admin.find({ _id: id } ,(err,admin) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: admin});
        }
    });
});

// Get businesses by type
router.get('/get-business-by-id/:id', (req,res)=>{
    var id = req.params.id;
    Business.find({ _id: id } ,(err,bus) => {
        if(err) {
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: bus});
        }
    });
});

// Add Sub Category
router.post('/add-sub-category', function(req, res) {
    var cat_id = req.body.cat_id;
    var subName = req.body.subName;
    var c_time = req.body.created_date;
    var sub = new SubCat({
        name: subName,
        category_id: cat_id,
        created_date : c_time
    });
    sub.save((err, saved)=>{
        if(err) {
            res.json({success: false, msg: err});
        }else{
            res.json({success: true, msg: saved});
        }
    });
});
router.post('/edit-category', (req,res) => {
    var cat_id = req.body.cat_id;
    var name = req.body.name;
    console.log(cat_id);

    Category.findOneAndUpdate({_id: cat_id}, { name: name, updated_date: moment().format('MMMM Do YYYY, h:mm:ss a') }, (err, upd) => {
        if(err) {
            res.json({ success: false, msg: err });
        }else {
            res.json({ success: true, msg: upd });
        }
    });
});

// Get main categories
router.get('/get-main-cats', (req, res) => {
    MainCats.find((err,found) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success : true, msg: found });
        }
    });
});


// Get vendor by sub category
router.get('/get-vendor-by-sub/:sub_id', (req,res)=>{
    var sub_id = req.params.sub_id;
    Business.find({'business.sub_category' : sub_id }, (err, buses)=>{
        if(err){
            res.json({success: false, msg: err});
        }else{
            res.json({success: true, msg: buses});
        }
    });
});

// Get vendor by id
router.get('/get-vendor-by-id/:id', (req,res)=>{
    var v_id = req.params.id;
    Vendor.find({_id : v_id }, (err, vendor)=>{
        if(err){
            res.json({success: false, msg: err});
        }else{
            res.json({success: true, msg: vendor});
        }
    });
});
// Get user by id
router.get('/get-user-by-id/:id', (req,res)=>{
    var u_id = req.params.id;
    User.find({_id : u_id }, (err, user)=>{
        if(err){
            res.json({success: false, msg: err});
        }else{
            if(user.length > 0) {
                res.json({success: true, msg: user});
            }else {
                res.json({success: false, msg: 'User not found'});
            }
        }
    });
});
// Check if featured Businesses
router.get('/check-if-featured/:b_id', (req,res) => {
    var b_id = req.params.b_id;
    FeaturedBusinessForHome.find({ business_id: b_id }, (err, found) => {
        if (err) {
            res.json({ success: false, msg: err });
        }else {
            res.json({ success: true, msg: found });
        }
    });
});
// Add featured Business
router.get('/add-featured/:b_id', (req,res) => {
    var b_id = req.params.b_id;
    let fb = new FeaturedBusinessForHome({
        business_id : b_id,
        added_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
    fb.save((err, saved) => {
        if (err) {
            res.json({ success: false, msg: saved });
        }else {
            res.json({ success: true, msg: saved });
        }
    });
});
// Remove featured Business
router.get('/remove-featured/:b_id', (req,res) => {
    var b_id = req.params.b_id;
    FeaturedBusinessForHome.remove({ business_id: b_id }, (err, removed) => {
        if (err) {
            res.json({ success: false, msg: err });
        }else {
            res.json({ success: true, msg: removed });
        }
    });
});

module.exports = router;