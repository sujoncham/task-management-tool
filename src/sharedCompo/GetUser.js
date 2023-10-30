import axios from "axios";
import { useEffect, useState } from "react";

const GetUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/api/users")
        .then((data) => {
          console.log(data.data);
          setUsers(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  return [users, setUsers];
};

export default GetUser;
