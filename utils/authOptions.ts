import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // Invoked on successful sign-in
    async signIn({ profile }) {
      // Connect to db
      await connectDB();
      // Check if user exists
      const userExists = await User.findOne({ email: profile?.email });
      // If !user then add user to db
      if (!userExists) {
        // Truncate user name if too long
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        });
      }
      // Return true to allow sign in
      return true;
    },

    // Modify session object
    async session({ session }) {
      // Get user from db
      const user = await User.findOne({ email: session.user?.email });
      //  Assign the user id to the session
      session.user.id = user._id.toString();
      // Return session
      return session;
    },
  },
};
