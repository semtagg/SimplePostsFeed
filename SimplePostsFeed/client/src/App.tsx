import React, {useEffect, useState} from 'react';
import './App.css';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import ApiSingleton from "./api/ApiSingleton";
import Login from "./components/Login";
import Register from "./components/Register";
import AllPosts from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import CurrentUserPosts from "./components/CurrentUserPosts";
import UpdatePost from "./components/UpdatePost";

interface TokenPayload {
  _id: string;
  _name: string;
  exp: number;
  iss: string;
  aud: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<TokenPayload>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = ApiSingleton.authService.getProfile();

    if (user) {
      if (!ApiSingleton.authService.isLoggedIn()) {
        logOut();
        navigate("/login");
        window.location.reload();
      }

      setCurrentUser(user);
    }
  }, [navigate]);

  const logOut = () => {
    ApiSingleton.authService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              AllPosts
            </Link>
          </li>

          {currentUser && (
            <>
              <li className="nav-item">
                <Link to={"/getCurrentUserPosts"} className="nav-link">
                  MyPosts
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/createPost"} className="nav-link">
                  CreatePost
                </Link>
              </li>
            </>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<AllPosts/>}/>
          <Route path="/getCurrentUserPosts" element={<CurrentUserPosts/>}/>
          <Route path="/createPost" element={<CreatePost/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/updatePost/:id" element={<UpdatePost/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
