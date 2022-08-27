import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import AuthService from "../services/AuthService";
import {AccountViewModel} from "../models/Models";

const defaultValues: AccountViewModel = {
  userName: "",
  password: "",
};

const Register = () => {
  const [error, setError] = useState<string>();
  const {register, handleSubmit} = useForm<AccountViewModel>({defaultValues});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AccountViewModel> = async (user) => {
    try {
      await AuthService.register(user);

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
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-0">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                                   placeholder="Enter a valid nickname"
                                   {...register("userName")}
                            />
                            <label className="form-label" htmlFor="form3Example1c">Your Nickname</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example3" className="form-control form-control-lg"
                                   placeholder="Enter a valid password"
                                   {...register("password")}
                            />
                            <label className="form-label" htmlFor="form3Example1c">Your Nickname</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-left mx-3 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg px-3"
                          >
                            Register
                          </button>
                        </div>
                        {/*{nickname.error && (
                                                    <p style={{color: "red", marginBottom: "0"}}>
                                                        {nickname.error}
                                                    </p>
                                                )}*/}
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                           className="img-fluid" alt="Sample"/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;