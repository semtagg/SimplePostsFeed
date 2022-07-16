import React, {useState, useEffect, useCallback} from "react";
import {Card} from "react-bootstrap";
import ApiSingleton from "../api/ApiSingleton";
import {PostViewModelDto} from "../api";

const AllPosts = () => {
    const [posts, setPosts] = useState<PostViewModelDto[]>([]);

    const fetchData = useCallback(async () => {
        const data = await ApiSingleton.postApi.apiPostGet();
        setPosts(data);
    }, [])

    useEffect(() => {
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [fetchData])

    return (
        <div>
            <h3>
                {posts.map((post, index) => (
                    <Card className='my-2' key={index} style={{ width: 'auto' }}>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle>{post.userId}</Card.Subtitle>
                            <Card.Text>{post.body}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </h3>
        </div>
    );
};

export default AllPosts;