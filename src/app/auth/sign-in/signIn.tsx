"use client";
import Image from 'next/image';
import { SignInForm } from './SignInForm';
import GoogleSignInButton from "@/app/components/GoogleSignInButton";

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Brand section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-between h-full text-white">
          <div>
            <Image
              src="/next.svg"
              alt="Logo"
              width={120}
              height={30}
              className="invert"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-white/80">
              Sign in to continue your journey with us.
            </p>
          </div>
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Login form section */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="md:hidden mb-6">
              <Image
                src="/next.svg"
                alt="Logo"
                width={80}
                height={20}
                priority
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <a
                href="/auth/sign-up"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Add Google Sign In */}
          <div className="mb-6">
            <GoogleSignInButton />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  );
}
export default SignIn;