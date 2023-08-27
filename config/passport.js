// const keys = require("./keys.env");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const OutlookStrategy = require('passport-outlook/lib').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/User.model')
// require('dotenv').config();





passport.serializeUser((user, done) => {
    // //console.log(user.id);
    // done(null, user);
    done(null, user.googleId);
});
passport.deserializeUser((id, done) => {
    //console.log("id is",id)
    User.findOne({googleId: id}).then((man) => {
        
        done(null,man );
    });
});





// passport.deserializeUser((user, done) => {
//     // //console.log(user.id);
//     done(null, user);
// });

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLECLIENTID,
        clientSecret: process.env.GOOGLECLIENTSECRET,
        callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                //console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    image: profile.photos[0].value,
                    isAdmin: profile.id === process.env.ADMIN_ID
                }).save().then((newUser) => {
                    //console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
        // done(null, profile);
    })
);
// passport.use(
//     new OutlookStrategy({
//         clientID: keys.outlook.clientID,
//         clientSecret: keys.outlook.clientSECRET,
//         // tenantID: '850aa78d-94e1-4bc6-9cf3-8c11b530701c',
//         callbackURL: "/auth/outlook/callback",
//         passReqToCallback: true,
//     }, (accessToken, refreshToken, profile, done) => {
//         // check if user already exists in our own db
//         User.findOne({googleId: profile.id}).then((currentUser) => {
//             //console.log("user", currentUser)
//             // if(currentUser){
//             //     // already have this user
//             //     //console.log('user is: ', currentUser);
//             //     done(null, currentUser);
//             // } else {
//             //     // if not, create user in our db
//             //     new User({
//             //         googleId: profile.id,
//             //         username: profile.displayName,
//             //         image: profile.photos[0].value,
//             //     }).save().then((newUser) => {
//             //         //console.log('created new user: ', newUser);
//             //         done(null, newUser);
//             //     });
//             // }
//         });
//         // done(null, profile);
//     })
// );


// passport.use(
//     new MicrosoftStrategy({
//         clientID: keys.outlook.clientID,
//         clientSecret: keys.outlook.clientSECRET,
//         // tenantID: '850aa78d-94e1-4bc6-9cf3-8c11b530701c',
//         callbackURL: "http://localhost:5000/auth/outlook/callback",
//         scope: ['User.Read'],
//         tenant: '850aa78d-94e1-4bc6-9cf3-8c11b530701c',
//     }, (accessToken, refreshToken, profile, done) => {
//         // check if user already exists in our own db
//         User.findOne({googleId: profile.id}).then((currentUser) => {
//             //console.log("user profile", profile)
//             if(currentUser){
//                 // already have this user
//                 //console.log('user is: ', currentUser);
//                 done(null, currentUser);
//             } else {
//                 // if not, create user in our db
//                 new User({
//                     googleId: profile.id,
//                     username: profile.displayName,
//                     // image: profile.photos[0].value,
//                 }).save().then((newUser) => {
//                     //console.log('created new user: ', newUser);
//                     done(null, newUser);
//                 });
//             }
        
//     });
//         // done(null, profile);
//     })
// );

