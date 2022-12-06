import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar() {
  const ref = useRef();
  const [toggle, setToggle] = useState(false);
  // const [stickyclassName, setStickyclassName] = useState("");

  // handle logout
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  // sticky navbar

  // useEffect(() => {
  //   window.addEventListener("scroll", stickNavbar);
  //   return () => window.removeEventListener("scroll", stickNavbar);
  // }, []);

  // const stickNavbar = () => {
  //   if (window !== undefined) {
  //     let windowHeight = window.scrollY;
  //     windowHeight > 0
  //       ? setStickyclassName(
  //           "fixed w-full !text-white bg-gradient-to-r from-cyan-500 to-blue-500 top-0"
  //         )
  //       : setStickyclassName("");
  //   }
  // };

  // detect outside click
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (toggle && ref.current && !ref.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [toggle]);
  return (
    <div className="relative">
      <nav className={`bg-white shadow-xl py-[12px] px-[24px] z-10`}>
        <div className="max-w-screen-2xl m-auto flex items-center justify-between">
          <ul className="text-white p-0 m-0 flex gap-8 ">
            <Link href="/" className={` text-[#3A83F5] font-semibold text-lg`}>
              Home
            </Link>
            <Link
              href="/todos/list"
              className={`text-[#3A83F5] font-semibold text-lg`}
            >
              Todo List
            </Link>
          </ul>

          {/* profile dropdown */}
          <div
            className={`relative rounded-full drop-shadow-[rgb(202 16 51) 0px 0px 4px] w-10 h-10 flex justify-center items-center cursor-pointer bg-[#3A83F5]`}
            ref={ref}
          >
            <div
              className="flex justify-center items-center text-black font-bold text-xl"
              onClick={() => setToggle(!toggle)}
            >
              <img
                src={"/assets/avatar.png"}
                alt="not found"
                height={28}
                width={28}
              />
            </div>
            {toggle ? (
              <div className="bg-black p-4 absolute mt-[6rem] mr-[2.5rem]">
                <ul>
                  <li className="text-white" onClick={handleSignOut}>
                    Logout
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
