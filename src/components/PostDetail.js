import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getComments, getPost, getUserInfo } from "../action/action";
import Spinner from "./Spinner";

const PostDetail = (props) => {
  // Define the state of component
  const [filter, setFilter] = useState("");
  const [filterdata, setFilterData] = useState([]);
  const [post, setPost] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Define getData function getting the data from API
  const getData = async () => {
    // Get the post data by postId from API
    const postData = await getPost(props.match.params.postId);
    if (postData.error) {
      setError(postData.error);
    } else {
      setPost(postData);
    }

    // Get the author data by useId from API
    const userData = await getUserInfo(postData.userId);
    if (postData.error) {
      setError(postData.error);
    } else {
      setUserInfo(userData);
    }

    // Get the comments by postId from API
    const commentData = await getComments(props.match.params.postId);
    if (postData.error) {
      setError(postData.error);
    } else {
      setComments(commentData);
      setFilterData(commentData);
    }

    setLoading(false);
  };

  // Function filtering the data
  const onFilter = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "") {
      setFilterData(comments);
    } else {
      setFilterData(
        comments.filter(
          (item) =>
            item.body.indexOf(e.target.value) > -1 ||
            item.name.indexOf(e.target.value) > -1
        )
      );
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className="col-md-12">
            <Link to="/">
              <button className="btn btn-primary">Back to feed</button>
            </Link>
          </div>
          {!error ? (
            <>
              <div className="col-md-4">
                <div className="card mt-3">
                  <div className="card-body">
                    <h4 className="card-title">Title: {post?.title}</h4>
                    <p className="card-text">{post?.body}</p>
                    {userInfo && (
                      <>
                        <h5 className="card-title">Author</h5>
                        <div className="card-text">Name : {userInfo?.name}</div>
                        <div className="card-text">
                          Email : {userInfo?.email}
                        </div>
                        <div className="card-text">
                          Phone Number : {userInfo?.phone}
                        </div>
                        <div className="card-text">
                          Website : {userInfo?.website}
                        </div>
                        <div className="card-text">
                          Company : {userInfo?.company?.name}
                        </div>
                        <div className="card-text">
                          City : {userInfo?.address?.city}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="mt-3">
                  <input
                    type="text"
                    value={filter}
                    className="form-control"
                    placeholder="Search..."
                    onChange={onFilter}
                  />
                </div>
                {filterdata.length > 0 &&
                  filterdata.map((item, key) => (
                    <div className="card mt-3" key={key}>
                      <div className="card-body">
                        <h6 className="card-title">
                          No.{key + 1} : {item.name} : {item.email}
                        </h6>
                        <p className="card-text">{item.body}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="col">
              <h3 className="text-center">{error}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default withRouter(PostDetail);
