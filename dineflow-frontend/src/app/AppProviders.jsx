import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "./store";
import { restoreSession } from "../features/auth/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(restoreSession());
    }
  }, [dispatch]);

  return children;
};

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};

export default AppProviders;
