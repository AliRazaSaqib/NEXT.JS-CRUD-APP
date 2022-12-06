import AuthLayout from "../components/layout/AuthLayout";
import Link from "next/link";
import { useState, useReducer } from "react";
import { useRouter } from "next/router";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function register() {
  const router = useRouter();
  const [formData, setFormData] = useReducer(formReducer, {});
  const { name, email, password } = formData;
  const [pass, setPass] = useState(false);
  const [cpass, setCPass] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000/login");
      });
  };

  return (
    <AuthLayout>
      <div className="flex rounded-2xl min-w-fit max-w-screen-xl p-5 items-center">
        <div className="w-full md:px-4 lg:px-8 xl:px-8 sm:px-2">
          <h2 className="font-bold text-2xl text-blue-500">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="name"
              placeholder="User Name"
              onChange={setFormData}
            />
            <input
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              onChange={setFormData}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={`${pass ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                onChange={setFormData}
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
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={`${cpass ? "text" : "password"}`}
                name="cpassword"
                placeholder="Confrim Password"
                onChange={setFormData}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
                onClick={() => setCPass(!cpass)}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="button"
              onClick={onSubmit}
            >
              Register
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <Link href={"/auth/register"} as={"/login"}>
              <p>Have an account?</p>
            </Link>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              <Link href={"/login"} as={"/login"}>
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
