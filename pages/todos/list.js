import React, { useCallback, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import TodoForm from "../../components/todoList/TodoForm";
import Model from "../../components/todoList/Model";

export default function list() {
  const [toogle, setToogle] = useState(false);
  const [todoList, setTodoList] = useState();
  const [isModel, setIsModel] = useState(false);
  const [mongoId, setMongoId] = useState();
  const [isEditEnable, setIsEditEnable] = useState(false);

  // fet todolist data from database
  const listData = async () => {
    setIsModel(false);
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("http://localhost:3000/api/todo/gettodo", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTodoList(data);
        }
      });
  };
  useEffect(() => {
    listData();
  }, []);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  return (
    <div className="m-auto flex justify-center flex-col items-center mt-10 mb-14">
      <div className="w-full max-w-7xl flex flex-col">
        <button
          className="float-right bg-gradient-to-r from-cyan-500 to-blue-500 text-xl text-white rounded-xl px-10 py-2 ml-auto"
          onClick={() => {
            setToogle(!toogle);
          }}
        >
          Add Todos
        </button>

        <TodoForm
          toogle={toogle}
          listData={listData}
          isEditEnable={isEditEnable}
          mongoId={mongoId}
          setToogle={setToogle}
        />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full max-w-7xl mt-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md text-white uppercase bg-gradient-to-r from-cyan-500 to-blue-500">
            <tr>
              <th scope="col" className="py-3 px-6">
                Subject
              </th>
              <th scope="col" className="py-3 px-6">
                Message
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoList?.todo?.map((elem, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {elem?.subject}
                </th>
                <td className="py-4 px-6">{elem?.message}</td>

                <td className="py-4 px-6">
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => {
                      setMongoId(elem);
                      setIsModel(true);
                    }}
                  >
                    Delete
                  </a>
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-6 cursor-pointer"
                    onClick={() => {
                      setMongoId(elem);
                      setIsEditEnable(!isEditEnable);
                    }}
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* model delete */}
      <Model
        setIsModel={setIsModel}
        isModel={isModel}
        mongoId={mongoId}
        listData={listData}
      />
    </div>
  );
}

// check session expire or not
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
