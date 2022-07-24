import React, {useState} from "react";
import {useNavigate} from "react-router";
import ApiSingleton from "../api/ApiSingleton";
import {SubmitHandler, useForm} from "react-hook-form";
import {AccountViewModel} from "../api";

const defaultValues: AccountViewModel = {
  userName: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState<string>();
  const {register, handleSubmit} = useForm<AccountViewModel>({defaultValues});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AccountViewModel> = async (user) => {
    try {
      await ApiSingleton.authService.login(user);

      navigate("/");
      window.location.reload();
    } catch (err) {
      /*setError(err)*/
      console.log(err)
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                   className="img-fluid"
                   alt="Sample"/>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example3" className="form-control form-control-lg"
                         placeholder="Enter a valid nickname"
                         {...register("userName")}
                  />
                  <label className="form-label" htmlFor="form3Example3">Your Nickname</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="form3Example3" className="form-control form-control-lg"
                         placeholder="Enter a valid nickname"
                         {...register("password")}
                  />
                  <label className="form-label" htmlFor="form3Example3">Your Nickname</label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg px-3"
                  >
                    Login
                  </button>
                  {/*{loginState!.error && (
                                        <p style={{color: "red", marginBottom: "0"}}>
                                            {loginState!.error}
                                        </p>
                                    )}*/}
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                                                                        className="link-danger">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;