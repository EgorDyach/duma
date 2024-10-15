import { RouterProvider } from "react-router-dom";
import { appRoutersConfig } from "@lib/configs/RouterConfig";
import { GlobalStyles } from "@lib/theme/globalStyles";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: 15 } }}
      />
      <GlobalStyles />
      <RouterProvider router={appRoutersConfig}></RouterProvider>
    </>
  );
}

export default App;
