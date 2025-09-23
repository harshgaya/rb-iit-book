import { setUserSession } from "@/lib/utils/action";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },

  callbacks: {
    async signIn({ user }) {
      try {
        // Call your API to store/fetch DB user
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });

        const data = await res.json();
        if (data.status === 200 && data.data[0]?._id) {
          user.user_id = data.data[0]._id;
          const dbUser = data.data[0];
          console.log("db user", dbUser);
          await setUserSession({
            userId: dbUser._id,
            token: dbUser.token,
            name: dbUser.name,
            email: dbUser.email,
          });
        }
      } catch (err) {
        console.error("Error saving user:", err);
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
