import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../action/action";
import Spinner from "./Spinner";

const MainHome = () => {
  // Define the state of component
  const [filter, setFilter] = useState("");
  const [filterdata, setFilterData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Define getData function getting the data from API
  const getData = async () => {
    const data = await getPosts();
    setFilterData(data);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // Function filtering the data
  const onFilter = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "") {
      setFilterData(posts);
    } else {
      setFilterData(
        posts.filter((item) => item.title.indexOf(e.target.value) > -1)
      );
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h2>Post Feed</h2>
      </div>

      {posts.length > 0 ? (
        <div className="col-md-4">
          <input
            type="text"
            value={filter}
            className="form-control"
            placeholder="Search..."
            onChange={onFilter}
          />
        </div>
      ) : (
        <div className="col-md-4" />
      )}

      {isLoading && <Spinner />}
      {!isLoading &&
        (filterdata.length > 0 ? (
          filterdata.map((item, key) => (
            <div className="col-sm-6 col-md-4 col-lg-2 pt-3" key={key}>
              <Link
                to={`/post/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h5 className="card-title">No.{key + 1}</h5>
                    <p className="card-text">{item.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col">
            <h3 className="text-center">There is no data.</h3>
          </div>
        ))}
    </div>
  );
};

export default MainHome;
