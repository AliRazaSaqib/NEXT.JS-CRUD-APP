import { CSSTransition } from "react-transition-group";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function TodoForm({
  toogle,
  listData,
  isEditEnable,
  mongoId,
  setToogle,
}) {
  const duration = 2000;
  const router = useRouter();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { subject, message } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (subject?.length && message?.length) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject,
          message: message,
        }),
      };

      await fetch("http://localhost:3000/api/todo/addtodo", options)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setIsLoading(false);
            listData();
            setToogle(false);
          }
        });
    } else {
      setErr("Form fields are empty...!");
      setIsLoading(false);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (subject?.length && message?.length) {
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: mongoId?._id,
          subject: subject,
          message: message,
        }),
      };

      await fetch("http://localhost:3000/api/todo/updatetodo", options)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setIsLoading(false);
            listData();
            setToogle(false);
          }
        });
    } else {
      setErr("Form fields are empty...!");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CSSTransition
        in={toogle || isEditEnable}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <div className="shadow-2xl rounded-md mt-2 px-8 py-4">
          <form className="w-full max-w-lg">
            <div>
              <label className="text-sm pl-1">Subject</label>
              <input
                onChange={setFormData}
                onFocus={() => setErr("")}
                type="text"
                name="subject"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    "
              />
            </div>
            <div className="mt-6">
              <label className="text-sm pl-1">Message</label>
              <textarea
                onChange={setFormData}
                onFocus={() => setErr("")}
                type="text"
                name="message"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              />
            </div>

            {err?.length ? (
              <div className="text-red-600 text-sm pt-1 pl-1">{err}</div>
            ) : null}

            {isEditEnable ? (
              <button
                className=" mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-xl text-white rounded-xl px-10 py-2 flex items-center"
                onClick={onUpdate}
              >
                {isLoading ? (
                  <svg
                    role="status"
                    class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                ) : null}
                Update
              </button>
            ) : (
              <button
                className=" mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-xl text-white rounded-xl px-10 py-2 flex items-center"
                onClick={onSubmit}
              >
                {isLoading ? (
                  <svg
                    role="status"
                    class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                ) : null}
                Add
              </button>
            )}
          </form>
        </div>
      </CSSTransition>
    </div>
  );
}
