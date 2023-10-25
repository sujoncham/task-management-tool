import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/Firebase.init";

const Register = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, uError] = useUpdateProfile(auth);

  const navigate = useNavigate();

  if (error || gError || uError) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || gLoading || updating) {
    return <p>Loading...</p>;
  }

  if (user || gUser) {
    navigate("/");
  }

  const handleLoginForm = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    toast("Updated profile");
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h1 className="text-3xl font-bold">Register</h1>
          <form onSubmit={handleLoginForm}>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                class="input input-bordered"
              />
              <label class="label">
                <Link to="/" class="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Register</button>
            </div>
          </form>

          <div class="form-control mt-6">
            <p>
              Already have an account? Please,{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>{" "}
              here
            </p>
          </div>

          <div class="divider">OR</div>
          <div>
            <button onClick={() => signInWithGoogle()} class="btn btn-sm">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
