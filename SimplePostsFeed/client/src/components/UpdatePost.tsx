import React, {useCallback, useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreatePostViewModel, PostViewModel, UpdateViewModel} from "../api";
import ApiSingleton from "../api/ApiSingleton";

const defaultValues: UpdateViewModel = {
  id: -1,
  title: "",
  body: "",
  nickName: "",
};

const UpdatePost = () => {
  const [post, setPost] = useState<PostViewModel>();
  const {register, handleSubmit} = useForm<UpdateViewModel>({defaultValues});
  const navigate = useNavigate();
  const {id}=useParams();

  const fetchData = useCallback(async () => {
    const data = await ApiSingleton.postApi.apiPostGetPostByIdIdGet(Number(id));
    setPost(data);
  }, [])

  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData])

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
          {post?.title}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows={3}
                        {...register("body")}
          />
        </Form.Group>
        <Button type="submit" variant="success "
        >
          Отредактировать
        </Button>
      </Form>

    </div>
  )
}

export default UpdatePost;