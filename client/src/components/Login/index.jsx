import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "https://www.hyperiondev.com/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login}>
      <header>
        <h1>
          Login <span>or Enrol now</span>
        </h1>
      </header>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        {error && <div className={styles.error_msg}>{error}</div>}
        <input
          type="email"
          placeholder="hmmkk@123"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Log in
        </button>
      </form>
      <div className={styles.right}>
    				<h1>New Here ?</h1>
    				<Link to="/signup">
    					<button type="button" className={styles.white_btn}>
    						Sign Up
    					</button>
    				</Link>
    			</div>
    </div>
  );
};

export default Login;
