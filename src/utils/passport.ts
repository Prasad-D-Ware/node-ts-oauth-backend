import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";

export default function passportConfig () {
	passport.use(
		new Strategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID!,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
				callbackURL: process.env.NODE_ENV === 'production' 
                ? "https://hostedurl/auth/google/callback"
                : "/auth/google/callback",
                proxy: true,
			},
			async function (accessToken, refreshToken, profile, done) {
				// This function gets called when the user has been authenticated by Google
				// Here, you would typically:
				// 1. Check if the user exists in your database
				// 2. If not, create a new user
				// 3. Return the user object

				// For simplicity, just returning the profile:
				// console.log(accessToken,"access");
				// console.log(refreshToken, "refresh");
				const newUser = {
                    user_id: uuidv4(),
                    googleId: profile.id,
                    full_name: profile.displayName,
                    email: profile.emails?.[0]?.value || "", // Fallback value for email
                    profile_pic: profile.photos?.[0]?.value || "", // Fallback value for profile picture
					accessToken,
					refreshToken
                };

				try {
                    let user= await User.findOne({ googleId: profile.id })

                    if(user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, user); 
                    }

                } catch (error) {
                    console.error("Error while google login", error);
                }
			}
		)
	);

	// Serialize user into the session
	passport.serializeUser((user: Express.User, done) => {
		done(null, user);
	});

	// Deserialize user from the session
	passport.deserializeUser((user: Express.User, done) => {
		done(null, user);
	});
}
