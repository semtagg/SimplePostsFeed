import React, {useCallback, useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import PostService from "../services/PostService";
import {PostViewModel} from "../models/Models";

const AllPosts = () => {
  const [posts, setPosts] = useState<PostViewModel[]>([]);

  const fetchData = useCallback(async () => {
    const data = await PostService.getAllPosts();
    setPosts(data);
  }, [])

  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData])

  return (
    <div>
      <h3>
        {posts.map((post, index) => (
          <Card className='my-2' key={index} style={{width: 'auto'}}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle>{post.nickName}</Card.Subtitle>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </h3>
    </div>
  );
};

export default AllPosts;