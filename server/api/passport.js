module.exports = function (app, port,environment,server,console,models,passport) {
    const GoogleStrategy = require('passport-google-oauth/lib').OAuth2Strategy;
    const appConstants = require('../AppConstants/Constants')
    const util = require("./Utility")(app, port,environment,server,console,models)

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
            clientID: appConstants.AppProperties.GOOGLE_CLIENT_ID,
            clientSecret: appConstants.AppProperties.GOOGLE_CLIENT_SECRET,
            callbackURL: appConstants.AppProperties.googleOAuthcallbackURL,
            proxy:true
        },
        function(accessToken, refreshToken, profile, done) {
            console.info("@passport google accessToken -",accessToken);
            console.info("@passport google refreshToken -",refreshToken);
            console.info("@passport google profile -",profile);
            models.googleUserSchema.findOne({
                'googleId': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from google (all the profile. stuff)
                if (!user) {
                    console.info("@passport new user");
                    user = new models.googleUserSchema({
                        googleId: profile.id,
                        password: Math.random().toString(36).substr(2, 8),
                        provider: appConstants.AppProperties.providerGoogle,
                        appName: appConstants.AppProperties.appName,
                        name: profile._json.name,
                        given_name: profile._json.given_name,
                        family_name: profile._json.family_name,
                        picture: profile._json.picture,
                        locale: profile._json.locale,
                        email: profile._json.email,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                    user.save(function(err) {
                        if (err) {
                            console.error(err);
                        }
                        return done(null, user);
                    });
                } else {
                    //found user. Return
                    console.info("@passport old user");
                    return done(null, user);
                }
            });
        }
    ));

    return {
        googleOAuth:passport.authenticate('google',{
            scope: ['profile','email'],
            session: false
        }),
        googleCallbackHandler:passport.authenticate('google', {
            failureRedirect: '/login',
            session: false
        })
    }
}



