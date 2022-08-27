import React, {useEffect, useState} from 'react';
import './App.css';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AllPosts from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import CurrentUserPosts from "./components/CurrentUserPosts";
import UpdatePost from "./components/UpdatePost";
import AuthService from "./services/AuthService";
import {TokenPayload} from "./models/Models";


function App() {
  const [currentUser, setCurrentUser] = useState<TokenPayload>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getProfile();

    if (user) {
      if (!AuthService.isLoggedIn()) {
        logout();
        navigate("/login");
        window.location.reload();
      }

      setCurrentUser(user);
    }
  }, [navigate]);

  const logout = () => {
    AuthService.logout();
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
              <a href="/login" className="nav-link" onClick={logout}>
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
