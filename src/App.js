import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[900],
      },
      secondary: {
        main: indigo[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {" "}
       
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>{" "}

        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
