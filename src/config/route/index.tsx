import { createBrowserRouter } from "react-router";
import { layouts } from "../layout";
import { routes } from "./routes";

const routeObj = Object.values(layouts).map((Layout) => ({
  element: <Layout />,
  children: routes
    .filter((r) => layouts[r.layout?.toLowerCase()] === Layout)
    .map((route) => ({
      path: route.path,
      index: route.path === '/',
      element: <route.element />,
      handle: {
        layout: route.layout,
      },
    })),
}));

const Router = createBrowserRouter(routeObj);
export default Router;