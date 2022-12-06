import styles from "../../styles/AuthLayout.module.css";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 shadow-2xl">
        <div
          className={`${styles.imgStyle} md:hidden sm:hidden lg:flex rounded-l-lg`}
        >
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly bg-slate-50">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
