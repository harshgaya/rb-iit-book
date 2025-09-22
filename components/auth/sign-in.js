import Image from "next/image";
import GoogleSignInButton from "./google-sign-in-button";
export default function SignInPage({ handleGoogleSignIn }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col pt-20 px-10 w-full max-w-lg bg-white shadow-lg">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-600 mb-8">Access your account to continue</p>
          <GoogleSignInButton />

          {/* Optional divider if you add more providers later */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Future additional buttons */}
          <div className="space-y-3">
            {/* Example placeholder for GitHub / Email later */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-gray-500 cursor-not-allowed">
              Other sign-in options
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (Image / Illustration) */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
        <Image
          src="/home/login-img.svg" // place an illustration in /public/login-side.png
          alt="Sign in illustration"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>
    </div>
  );
}
