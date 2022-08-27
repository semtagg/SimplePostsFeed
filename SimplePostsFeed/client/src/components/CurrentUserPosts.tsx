import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import PostService from "../services/PostService";
import {PostViewModel} from "../models/Models";

const CurrentUserPosts = () => {
  const [currentUserPosts, setCurrentUserPosts] = useState<PostViewModel[]>([]);
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const data = await PostService.getPostByUserId();
    setCurrentUserPosts(data);
  }, []);

  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  const deletePost = async (postId: number) => {
    try {
      await PostService.deletePost(postId);
      window.location.reload();
    } catch (e) {
      console.log(e)
    }
  };

  const navigateHome = (id : number) => {
    navigate('/updatePost/' + id);
  };

  return (
    <div>
      <h3>
        {currentUserPosts.map((post, index) => (
          <div className="card" key={index}>
            <h5 className="card-header">{post.title}</h5>
            <div className="card-body">
              <h5 className="card-title">{post.nickName}</h5>
              <p className="card-text">{post.body}</p>
              <button className="btn btn-secondary me-1" onClick={() => navigateHome(post.id!)}>Редактировать</button>
              <button className="btn btn-danger" onClick={() => deletePost(post.id!)}>Удалить</button>
            </div>
          </div>
        ))}
      </h3>
    </div>
  );
};

export default CurrentUserPosts;