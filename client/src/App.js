import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publishRoute, privateRoute } from "@/routes";
import { DefaultLayout } from "@/layout";
import { useSelector } from "react-redux";
import Login from "@/pages/Login";

function App() {
  const user = useSelector((state) => state.login.user);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publishRoute.map((routes, index) => {
            const Page = routes.component;
            let Layout = DefaultLayout;
            if (routes.layout) {
              Layout = routes.layout;
            } else if (routes.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoute.map((routes, index) => {
            const Page = routes.component;
            let Layout = DefaultLayout;
            if (routes.layout) {
              Layout = routes.layout;
            } else if (routes.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={routes.path}
                element={<Layout>{user ? <Page /> : <Login />}</Layout>}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
