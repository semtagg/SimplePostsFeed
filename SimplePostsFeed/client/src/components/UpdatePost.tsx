import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreatePostViewModel} from "../api";
import ApiSingleton from "../api/ApiSingleton";

const defaultValues: CreatePostViewModel = {
  title: "",
  body: "",
  nickName: "",
};

const UpdatePost = () => {
  const [error, setError] = useState<string>();
  const {register, handleSubmit} = useForm<CreatePostViewModel>({defaultValues});
  const navigate = useNavigate();
  const {id}=useParams();

  const onSubmit: SubmitHandler<CreatePostViewModel> = async (user) => {

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
          {id}
        </Button>
      </Form>

    </div>
  )
}

export default UpdatePost;