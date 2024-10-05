import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@modules/pageNotFound/PageNotFound";
import { RootPage } from "@modules/rootPage/RootPage";
import { MainLayout } from "@layouts/mainLayout/MainLayout";

export const appRoutersConfig = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <MainLayout>
        <PageNotFound />
      </MainLayout>
    ),
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <RootPage />,
      },
    ],
  },
]);
