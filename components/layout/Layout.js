import Navbar from "../Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      {router?.pathname === "/login" ||
      router?.pathname === "/register" ? null : (
        <Navbar />
      )}

      <div>{children}</div>
    </div>
  );
};

export default Layout;
