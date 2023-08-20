import { Suspense, lazy } from "react";
import { AuthProvider } from "./components/Firebase/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Admin/PrivateRoute";
import Navbar from "./components/nav";
import Spinner from "./Spiner";

const Editor = lazy(() => import("./components/Editors/Editor"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const UpdatePost = lazy(() => import("./components/Editors/UpdatePost"));
const Login = lazy(() => import("./components/Admin/Login"));

function App() {
  return (
    <Router>
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/edit"
            element={
              <Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <Editor />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/UpdatePost/:docID"
            element={
              <Suspense fallback={<Spinner />}>
                <PrivateRoute>
                  <UpdatePost />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
