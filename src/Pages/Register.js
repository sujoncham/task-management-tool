import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.init";

const Register = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const navigate = useNavigate();

  if (gError) {
    return <p>Error: {gError.message}</p>;
  }

  if (gLoading) {
    return <p>Loading...</p>;
  }

  if (gUser) {
    navigate("/");
  }

  const handleLoginForm = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const fullname = event.target.name.value;
    const username = event.target.username.value;

    const userSend = {
      email,
      password,
      fullname,
      username,
    };
    fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("inserted data", data);
        toast("User Create successfully");
        event.target.reset();
      });
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Register</h1>
          <form onSubmit={handleLoginForm}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full name </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">User name </span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="user name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link to="/" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>

          <div className="form-control mt-6">
            <p>
              Already have an account? Please,{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>{" "}
              here
            </p>
          </div>

          <div className="divider">OR</div>
          <div>
            <button onClick={() => signInWithGoogle()} className="btn btn-sm">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
