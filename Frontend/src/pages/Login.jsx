import React, { useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import Header from "../components/Header";
import { firebaseAuth } from '../utils/firebase.config'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const setErrorAndClearAfterDelay = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000); // 30 seconds in milliseconds
  };
  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    }
    catch (err) {
      setErrorAndClearAfterDelay('Incorrect Password/Email');
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/')
  })
  return (
    <Container >
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              ></input>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              ></input>

              <div>
                {errorMessage && <h2 className="errorMessage">{errorMessage}</h2>}
                {/* Other JSX */}
              </div>

              <button onClick={handleLogin}>Log In</button>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Login;
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .form-container {
      gap: 2rem;
      height: 85vh;

      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;

        .container {
          gap: 2rem;

          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }

          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
.errorMessage{
  font-size:20px;
  color:red;
}
  @media screen and (max-width: 750px) {
    .form-container .form {
      padding: 0.5rem !important;
      width: 65vw !important;
      margin-top: 10px !important;
    }
  }
  @media screen and (min-width: 750px)and (max-width:1250px) {
    .form-container .form {
      padding: 1rem !important;
      width: 35vw !important;
    }
  }
  @media screen and (max-width: 350px) {
    input{
      width: 12rem !important;
     
    }
  }
`;

