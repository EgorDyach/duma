import { RouterProvider } from "react-router-dom";
import { appRoutersConfig } from "@lib/configs/RouterConfig";
import { GlobalStyles } from "@lib/theme/globalStyles";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "@components/Modal/Modal";

function App() {
  return (
    <>
      <Modal />
      <GlobalStyles />
      <RouterProvider router={appRoutersConfig}></RouterProvider>
    </>
  );
}

export default App;
