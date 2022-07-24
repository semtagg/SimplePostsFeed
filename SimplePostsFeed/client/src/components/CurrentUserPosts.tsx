import React, {useCallback, useEffect, useState} from "react";
import ApiSingleton from "../api/ApiSingleton";
import {PostViewModel} from "../api";
import {useParams} from "react-router";

const CurrentUserPosts = () => {
  const [currentUserPosts, setCurrentUserPosts] = useState<PostViewModel[]>([]);
  const {id} = useParams();

  const fetchData = useCallback(async () => {
    const data = await ApiSingleton.postApi.apiPostGetCurrentUserPostsGet();
    setCurrentUserPosts(data);
  }, []);

  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  const deletePost = async (postId: number) => {
    try {
      await ApiSingleton.postApi.apiPostRemovePostIdDelete(postId);
      window.location.reload();
    }
    catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <h3>
        {currentUserPosts.map((post) => (
          <div className="card">
            <h5 className="card-header">{post.title}</h5>
            <div className="card-body">
              <h5 className="card-title">{post.nickName}</h5>
              <p className="card-text">{post.body}</p>
              <a href="#" className="btn btn-primary" onClick={() => deletePost(post.id!)}>Удалить пост</a>
            </div>
          </div>
        ))}
      </h3>
    </div>
  );
};

export default CurrentUserPosts;