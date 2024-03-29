import React, {useCallback, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import PostService from "../services/PostService";
import {UpdateViewModel} from "../models/Models";

const defaultValues: UpdateViewModel = {
  id: -1,
  title: "",
  body: "",
};

const UpdatePost = () => {
  const {register, handleSubmit, setValue, getValues} = useForm<UpdateViewModel>({defaultValues});
  const navigate = useNavigate();
  const {id} = useParams();

  const fetchData = useCallback(async () => {
    const data = await PostService.getPostById(Number(id));
    setValue('title', data.title);
    setValue("body", data.body);
  }, [])

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [fetchData])

  const onSubmit: SubmitHandler<UpdateViewModel> = async (user) => {
    try {
      const post: UpdateViewModel = {
        id: Number(id),
        title: user.title,
        body: user.body,
      };

      await PostService.updatePost(post);
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
          <Form.Control type="title" placeholder="Title" defaultValue={getValues("title")}
                        {...register("title")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={getValues("body")}
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