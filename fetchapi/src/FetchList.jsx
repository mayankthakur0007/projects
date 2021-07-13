import { useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "../node_modules/@material-ui/lab/Pagination";
import Loader from "react-loader-spinner";

const FetchList = () => {
    const [progress,changeProgres] = useState(true)
  const [list, addData] = useState([]);  
  const [totalPages, changePages] = useState(0);  
  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=1`)
      .then((response) => response.json())
      .then((data) => {
          changePages(data.total_pages);
          addData(data.data);
          changeProgres(false);
      });
  }, []);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    changeProgres(true);
    fetch(`https://reqres.in/api/users?page=${value}`)
      .then((response) => response.json())
      .then((data) => {
          changePages(data.total_pages);
          addData(data.data);
          changeProgres(false);
      });
    setPage(value);
  };

  return (
    <div>
        <Loader 
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        visible={progress} />
        <Table data={list} />
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  );

};

export default FetchList;
