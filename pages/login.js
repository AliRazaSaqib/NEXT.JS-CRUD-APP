import AuthLayout from "../components/layout/AuthLayout";
import Link from "next/link";
import { useState, useRef, useReducer, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function login() {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const router = useRouter();
  const [pass, setPass] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [error, setError] = useState(false);
  const { email, password } = formData;

  // handle onSubmit event
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email?.length && password?.length) {
        const status = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
          callbackUrl: "/",
        });

        if (status.ok) router.push(status.url);
        if (status.error) {
          setError(status.error);
        }
      } else {
        setError("Your form are empty");
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // Google Handler function
  async function handleGitHubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  //detect outside click
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setEmailFocus(false);
    }
    if (ref1.current && !ref1.current.contains(event.target)) {
      setPasswordFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <AuthLayout>
      <div className="flex rounded-2xl min-w-fit max-w-screen-xl p-5 items-center">
        <div className="w-full md:px-4 lg:px-8 xl:px-8 sm:px-2">
          <h2 className="font-bold text-2xl text-blue-500">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form className="flex flex-col gap-4">
            <input
              className={`p-2 mt-8 rounded-xl border focus:outline-none ${
                emailFocus && email?.length === 0 ? "border-red-600" : ""
              }`}
              type="email"
              name="email"
              placeholder="Email"
              onFocus={() => setEmailFocus(true)}
              onChange={setFormData}
              ref={ref}
            />

            <div className="relative">
              <input
                className={`p-2 rounded-xl border focus:outline-none w-full ${
                  passwordFocus && password?.length === 0
                    ? "border-red-600"
                    : ""
                }`}
                type={`${pass ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                onFocus={() => setPasswordFocus(true)}
                onChange={setFormData}
                ref={ref1}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
                onClick={() => setPass(!pass)}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            {error?.length ? (
              <div className="text-sm text-red-500 text-start pl-2 -mt-3">
                {error}
              </div>
            ) : null}
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="button"
              onClick={onSubmit}
            >
              Login
            </button>

            <div>
              <button
                type="button"
                className="bg-white drop-shadow-md w-full rounded-xl flex justify-center items-center gap-4 py-2 hover:scale-105 duration-300"
                onClick={handleGoogleSignin}
              >
                <span>
                  <FcGoogle />
                </span>
                Login with google
              </button>
            </div>
            <div>
              <button
                type="button"
                className="bg-white drop-shadow-md w-full rounded-xl flex justify-center items-center gap-4 py-2 hover:scale-105 duration-300"
                onClick={handleGitHubSignin}
              >
                <span>
                  <GoMarkGithub />
                </span>
                Login with github
              </button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <Link href={"/register"} as={"/register"}>
              <p>Don't have an account?</p>
            </Link>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              <Link href={"/register"} as={"/register"}>
                Register
              </Link>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
