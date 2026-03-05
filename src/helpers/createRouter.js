import React, { Fragment } from "react";
import { Outlet, Route, Routes } from "react-router";

const renderRoutes = (routes = []) =>
  routes.map((route, idx) => {
    const props = route.elementProps || {};
    const Guard = route.guard || Fragment;
    const Element = route.element || Outlet;
    const key = route.path ?? (route.index ? "index" : `route-${idx}`);

    if (route.index) {
      return (
        <Route
          key={key}
          index
          element={
            <Guard>
              <Element {...props} />
            </Guard>
          }
        />
      );
    }

    return "children" in route && route.children?.length > 0 ? (
      <Route
        path={route.path}
        key={key}
        element={
          <Guard>
            <Element {...props} />
          </Guard>
        }
      >
        {renderRoutes(route.children)}
      </Route>
    ) : (
      <Route
        path={route.path}
        key={key}
        element={
          <Guard>
            <Element {...props} />
          </Guard>
        }
      />
    );
  });

const createRouter = (routes = []) => <Routes>{renderRoutes(routes)}</Routes>;

export default createRouter;
