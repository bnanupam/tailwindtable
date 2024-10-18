import { useState, useEffect } from "react";

const UserTable = () => {
  const API_URL = `https://jsonplaceholder.typicode.com/users`;
  const [userData, setUserData] = useState([]);

  const getAllUser = async () => {
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      setUserData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addRow = () => {
    const newRow = {
      id: userData.length + 1,
      name: "New User",
      email: "new@example.com",
      website: "newwebsite.com",
    };
    setUserData([...userData, newRow]);
  };

  const removeRow = (id) => {
    const updatedData = userData
      .filter((rowData) => rowData.id !== id)
      .map((rowData, index) => ({ ...rowData, id: index + 1 }));
    setUserData(updatedData);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const TableHead = () => (
    <thead
            className="border-b border-neutral-200 font-medium dark:border-white/10">
      <tr>
        <th scope="col" className="px-6 py-4">
          #
        </th>
        <th scope="col" className="px-6 py-4">
          Name
        </th>
        <th scope="col" className="px-6 py-4">
          Email
        </th>
        <th scope="col" className="px-6 py-4">
          Website
        </th>
        <th scope="col" className="px-6 py-4">
          Actions
        </th>
      </tr>
    </thead>
  );

  const RenderTableData = () => (
    <tbody>
      {userData.map((item) => (
        <tr key={item.id} className="border-b border-neutral-200 dark:border-white/10">
          <th scope="row" className="px-4 py-2">
            {item.id}
          </th>
          <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.website}</td>
          <td className="whitespace-nowrap px-6 py-4">
            <button
              onClick={addRow}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Add Row
            </button>
            <button
              onClick={() => removeRow(item.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove Row
            </button>
          </td>
        </tr>
      ))}
      {userData.length === 0 && (
        <tr>
          <td colSpan={5} className="px-4 py-2 text-center">
            Table data is empty!
          </td>
        </tr>
      )}
    </tbody>
  );

  return (
    <div className=" block mx-auto max-w-4xl">
  <div className="overflow-x-auto max-w-fit sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-left text-sm font-light text-surface dark:text-white">
        <TableHead />
        <RenderTableData />
      </table>
      </div></div></div></div>

  );
};

export default UserTable;
