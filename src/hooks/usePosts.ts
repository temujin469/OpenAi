import React, { useState } from "react";
import { baseUrl } from "../utils";

function usePosts() {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await baseUrl.get("/posts");
      setPosts(data.data);
    } catch (err) {
      console.log("get post err==>", err);
      setError("aldaa garlaa");
    } finally {
      setLoading(false);
    }
  };
  return {
    getPosts,
    loading,
    error,
    posts,
  };
}

export default usePosts;
