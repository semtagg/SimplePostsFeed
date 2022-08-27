import AuthService from "./AuthService";
import axios from "axios";
import {CreatePostViewModel, PostViewModel, UpdateViewModel} from "../models/Models";

const basePath = "http://localhost:5000";

const getAllPosts = async () => {
  const response = await axios.get<PostViewModel[]>(
    basePath + "/api/Post/getAllPosts",
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );

  return response.data;
}

const getPostByUserId = async () => {
  const response = await axios.get<PostViewModel[]>(
    basePath + "/api/Post/getCurrentUserPosts",
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );

  return response.data;
};

const getPostById = async (id: number) => {
  const response = await axios.get<PostViewModel>(
    basePath + "/api/Post/getPostById/" + id,
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );

  return response.data;
};

const createPost = async (post: CreatePostViewModel) => {
  await axios.post(
    basePath + "/api/Post/createPosts",
    post,
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );
};

const deletePost = async (id: number) => {
  await axios.delete(
    basePath + "/api/Post/removePost/" + id,
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );
};

const updatePost = async (post: UpdateViewModel) => {
  await axios.post(
    basePath + "/api/Post/updatePost",
    post,
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );
};

const PostService = {
  getAllPosts,
  getPostByUserId,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};

export default PostService;