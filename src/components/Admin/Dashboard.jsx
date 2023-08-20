import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Firebase/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const EditorModel = () => {
  return (
    <div className="flex flex-col px-4 w-full rounded-t-xl py-11">
      <div className="border-2 mx-1 py-6 bg-white rounded-xl">
        <p className="mx-3" style={{ fontSize: "5px" }}>
          Heading
        </p>
        <div className="border-2 w-1/12 h-1 rounded-sm ml-3" />
        <p className="mx-3 mt-1" style={{ fontSize: "5px" }}>
          Contents
        </p>
        <div className="border-2 w-11/12 h-7 rounded-sm ml-3" />
        <div className="flex space-x-1 mx-3 my-1 flex-row">
          <div className="h-1 w-8 bg-gray-100" />
          <div className="h-1 w-4 bg-gray-100" />
          <div className="h-1 w-4 bg-gray-100" />
          <div className="h-1 w-6 bg-gray-100" />
          <div className="h-1 w-8 bg-gray-100" />
          <div className="h-1 w-2 bg-gray-100" />
          <div className="flex w-full justify-end">
            <div className="mr-6 sm:mr-6 lg:mr-0 md:mr-0">
              <p className=" mr-4" style={{ fontSize: "2px" }}>
                Auther
              </p>
              <div className="border-2 w-7/12" />
            </div>
          </div>
        </div>
        <div
          className="flex rounded-b-md w-11/12 mx-3 sm:mx-3 lg:mx-auto md:mx-auto justify-end bg-gray-100"
          style={{ paddingTop: "2px", paddingBottom: "2px" }}
        >
          <p
            className="mr-2 bg-indigo-200 rounded-sm"
            style={{
              fontSize: "3px",
              paddingRight: "2px",
              paddingLeft: "2px",
              paddingTop: "1px",
              paddingBottom: "1px",
            }}
          >
            Save
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [error, setError] = useState("");
  const history = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { EmailVerification, User, signup, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [admin, setAdmin] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setState(false);
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setState(true);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  }

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }
  const Admins = ["q0lk85FOVZahqDz6TAhlO9XVZ6d2", "Vm4LdeGygvORSlbAt5ZLNueerTB3"]
  useEffect(() => {
    async function emailver() {
      try {
        if (User.emailVerified !== true) {
          auth.signOut();
          history("/");
        }
        Admins.map((val) => {
          if (User.uid == val) {
            setAdmin(true);
          }
          console.log(val)
        })
      } catch {}
    }
    emailver();
  }, [history]);
  return (
    <>
      <div className="bg-gray-500 h-full w-full py-32 min-h-screen">
        <Helmet>
          <title>Admin Dashboard</title>
        </Helmet>
        <div className="max-w-3xl space-y-3 lg:mx-auto md:mx-auto grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:space-x-4 md:space-x-2 mx-2 md:space-y-0 sm:space-y-3">
            <If condition={admin}>
              <section className="shadow-lg rounded-xl bg-gray-200">
                <div className="h-full rounded-xl bg-gray-200">
                  <div className="bg-gray-400 px-4 py-6 rounded-xl">
                    <Choose>
                      <When condition={state}>
                        <div className="flex flex-col bg-gray-800 rounded-xl my-12">
                          <h1 className="px-5 py-3 rounded-t-xl text-white">
                            Verfy email
                          </h1>
                          <p className="bg-gray-500 px-5 py-3 text-white">
                            Pls Go to inbox and comfirm email. Unless confirmed
                            the account will be deleted
                          </p>
                          <div className="flex justify-between rounded-b-xl">
                            <Link
                              to="/login"
                              className="focus:bg-gray-900 bg-gray-300 focus:text-white py-2 px-3 rounded-bl-lg w-full text-center"
                            >
                              Resend Verfy Link
                            </Link>
                            <button
                              className="focus:bg-gray-700 bg-gray-100 focus:text-white py-2 px-3 rounded-br-lg w-full text-center"
                              onClick={() =>
                                EmailVerification(User)
                              }
                            >
                              Resend Verfy Link
                            </button>
                          </div>
                        </div>
                      </When>
                      <Otherwise>
                        <form
                          className="flex flex-col bg-gray-300 rounded-xl"
                          onSubmit={(e) => handleSubmit(e)}
                        >
                          {error && (
                            <div className="bg-red-400 rounded-t-xl text-white text-center py-2">
                              {error}
                            </div>
                          )}
                          <label className="mt-5 mx-auto">
                            <h1 className="px-2 py-1">Email</h1>
                            <input
                              type="email"
                              placeholder="Enter email"
                              className="rounded-md px-5 lg:px-8 py-1 w-11/12"
                              ref={emailRef}
                              required
                            />
                          </label>
                          <label className="mt-2 mx-auto">
                            <h1 className="px-2 py-1">Password</h1>
                            <input
                              type="password"
                              placeholder="Password"
                              className="rounded-md py-1 px-5 lg:px-8 w-11/12"
                              ref={passwordRef}
                              required
                            />
                          </label>
                          <label className="mt-1 mx-auto">
                            <h1 className="px-2 py-1">Comfirm Password</h1>
                            <input
                              type="password"
                              placeholder="Comfirm Password"
                              className="rounded-md py-1 px-5 lg:px-8 w-11/12"
                              ref={passwordConfirmRef}
                              required
                            />
                          </label>
                          <button
                            className="px-4 py-2 my-6 bg-indigo-500 text-white w-3/4 rounded-b-lg mx-auto sm:w-72 md:w-10/12 lg:w-10/12"
                            onClick="submit"
                            disabled={loading}
                          >
                            Submit
                          </button>
                        </form>
                      </Otherwise>
                    </Choose>
                  </div>
                </div>
              </section>
            </If>
          <section className="flex rounded-lg md:rounded-t-lg sm:rounded-t-lg sm:rounded-b-lg lg:rounded-t-lg md:rounded-b-none lg:rounded-b-none md:h-4/6 bg-blue-200 flex-col lg:h-3/5">
            <EditorModel />
            <Link
              to="/edit"
              className="flex bg-gray-800 py-1.5 rounded-b-lg text-white focus:bg-gray-100 focus:text-black"
            >
              <p className="py-1.5 mx-auto">Editor</p>
            </Link>
            <button
              className="invisible h-0 lg:visible lg:h-full lg:my-5 lg:py-3 md:visible md:h-full md:my-5 md:py-3 rounded-lg bg-gray-300 text-xl"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          </section>
          <button
            className="flex mx-auto py-3 w-6/12 visible lg:invisible lg:h-0 md:h-0 md:invisible rounded-lg bg-gray-300 text-xl"
            onClick={() => handleLogout()}
          >
            <p className="mx-auto">Log out</p>
          </button>
        </div>
      </div>
    </>
  );
}
