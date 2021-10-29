import axios from "axios";

export const getPosts = async () => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Failed Connection !" };
    });
};

export const getPost = async (postId) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Failed Connection !" };
    });
};

export const getUserInfo = async (userId) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Failed Connection !" };
    });
};

export const getComments = async (postId) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: "Failed Connection !" };
    });
};
