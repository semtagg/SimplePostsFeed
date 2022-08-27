import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import AuthService from "../services/AuthService";
import PostService from "../services/PostService";
import {CreatePostViewModel} from "../models/Models";

const defaultValues: CreatePostViewModel = {
  title: "",
  body: "",
  nickName: "",
};

const CreatePost = () => {
  const [error, setError] = useState<string>();
  const {register, handleSubmit} = useForm<CreatePostViewModel>({defaultValues});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreatePostViewModel> = async (user) => {
    try {
      const post: CreatePostViewModel = {
        title: user.title,
        body: user.body,
        nickName: AuthService.getUserName(),
      };

      console.log(post);
      await PostService.createPost(post);

      navigate("/");
      window.location.reload();
    } catch (err) {
      /*setError(err)*/
      console.log(err)
      console.log(123)
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="title" placeholder="Title"
                        {...register("title")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows={3}
                        {...register("body")}
          />
        </Form.Group>
        <Button type="submit" variant="primary"
        >
          Create
        </Button>
      </Form>

    </div>
  )
}

export default CreatePost;