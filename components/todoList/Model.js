import React from "react";

export default function Model({ setIsModel, isModel, mongoId, listData }) {
  const deleteItem = async () => {
    await fetch("http://localhost:3000/api/todo/deletetodo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: mongoId?._id,
      }),
    }).then((res) => (res.status === 201 ? listData() : null));
  };
  return (
    <div>
      {isModel ? (
        <>
          <div class="flex items-center justify-center h-full"></div>
          <div
            class="fixed z-10 overflow-y-auto top-0 w-full left-0"
            id="modal"
          >
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div
                class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 h-fit">
                  <label>Are you sure you want to delete this item...!</label>
                </div>
                <div class="bg-gray-200 px-4 py-3 text-right">
                  <button
                    type="button"
                    class="py-2 px-4 bg-black text-sm text-white rounded-xl mr-2"
                    onClick={() => setIsModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-white rounded-xl mr-2"
                    onClick={deleteItem}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
