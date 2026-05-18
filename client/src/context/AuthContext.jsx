import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

const AuthContext = createContext(null);

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token || state.token };
    case "LOGOUT":
      return { ...state, user: null, token: null, loading: false };
    case "STOP":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMe = async () => {
      if (!state.token) return;
      try {
        const { data } = await api.get("/auth/me");
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "SUCCESS", payload: { user: data.user } });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    };
    fetchMe();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: "START" });
    try {
      const { data } = await api.post("/auth/login", credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "SUCCESS", payload: data });
      toast.success("Welcome back");
      return true;
    } catch (error) {
      console.error("Login error", error);
      const message = error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      dispatch({ type: "STOP" });
      return false;
    }
  };

  const signup = async (payload) => {
    dispatch({ type: "START" });
    try {
      const { data } = await api.post("/auth/register", payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "SUCCESS", payload: data });
      toast.success("Account created");
      return true;
    } catch (error) {
      console.error("Signup error", error);
      const message = error.response?.data?.message || error.message || "Signup failed";
      toast.error(message);
      dispatch({ type: "STOP" });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, isAuthenticated: Boolean(state.token) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
