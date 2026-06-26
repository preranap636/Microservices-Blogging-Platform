"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export const user_service = "http://localhost:5000";
export const blog_service = "http://localhost:5002";
export const author_service = "http://localhost:5001";


export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  blogcontent: string;
  image: string;
  category: string;
  author: string;
  created_at: string;
}
interface SavedBlogType {
  id: string;
  userid: string;
  blogid: string;
  create_at: string;
}


interface AppContextType {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  logoutUser: () => void;
  blogs: Blog[];
  blogLoading: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  fetchBlogs: ()=> Promise<void>;
  savedBlogs: SavedBlogType[] | null;
  getSavedBlogs: ()=> Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [blogLoading, setBlogLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  /* 🔐 RESTORE AUTH FROM LOCAL STORAGE */
  function restoreAuth() {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuth(true);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }

  /* FETCH BLOGS */
  async function fetchBlogs() {
  setBlogLoading(true);
  try {
    const { data } = await axios.get(
      `http://localhost:5002/api/v1/blog/all?searchQuery=${searchQuery}&category=${category}`
    );

    // ✅ FORCE array safety
    if (Array.isArray(data)) {
      setBlogs(data);
    } else {
      setBlogs([]);
    }
  } catch (error) {
    console.log(error);
    setBlogs([]); // ✅ always fallback to array
  } finally {
    setBlogLoading(false);
  }
}
const [savedBlogs, setSavedBlogs] = useState<SavedBlogType[] | null>(null);
 async function getSavedBlogs() {
    const token = Cookies.get("token");
    try {
      const { data } = await axios.get(
        `${blog_service}/api/v1/blog/saved/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedBlogs(data);
    } catch (error) {
      console.log(error);
    }
  }
  /* 🚪 LOGOUT */
  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");

    setUser(null);
    setIsAuth(false);

    toast.success("User Logged Out");
  }
 



  /* 🔁 RESTORE AUTH ON APP LOAD */
  useEffect(() => {
    
    getSavedBlogs();
    restoreAuth();
  }, []);

  /* 🔁 FETCH BLOGS ON FILTER CHANGE */
  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, category]);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuth,
        loading,
        setUser,
        setIsAuth,
        setLoading,
        logoutUser,
        blogs,
        blogLoading,
        setCategory,
        setSearchQuery,
        searchQuery,
        fetchBlogs,
        savedBlogs,
        getSavedBlogs,
      }}
    >
      <GoogleOAuthProvider clientId="394621616772-500fdb4rtv1284f71qgpspd89mck89gi.apps.googleusercontent.com">
        {children}
        <Toaster />
      </GoogleOAuthProvider>
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};
