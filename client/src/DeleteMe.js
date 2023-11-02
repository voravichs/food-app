import React, { useEffect, useState } from "react";

// TODO: Feel free to delete this component
const DeleteMe = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/");
      const data = await res.json();
      const { message } = data;
      setData(message);
    })();
  }, []);

  return (
    <div>
      <p>
        You should see "Welcome to "Underground Foodies" below if you are
        successfully connected to the backend
      </p>
      <p>{data}</p>
    </div>
  );
};

export default DeleteMe;
