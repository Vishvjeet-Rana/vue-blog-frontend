import api from "./api";

export const createPost = async (formData: FormData) => {
  const res = await api.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// public route
export const getAllPosts = async () => {
  const res = await api.get("/post");
  return res.data;
};

// public route
export const getPostById = async (id: string) => {
  const res = await api.get(`/post/${id}`);
  return res.data;
};

export const updatePost = async (id: string, formData: FormData) => {
  const res = await api.put(`/post/${id}`, formData);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await api.delete(`/post/${id}`);
  return res.data;
};
