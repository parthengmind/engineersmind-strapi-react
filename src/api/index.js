import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});


axiosInstance.interceptors.request.use(
  function (config) {
    try {
      config.headers["Content-Type"] = "application/json";
      // const token = '338ec7eb45e1b41989a249918c365f1d4e1dace21fea35343222a2b5b7667f6fd8e0bc3f4c14d1eb4530ae23ed3ebcc8a5f1012851fd54d9be5644c238321d6fd6fdd7b6a1aca40496f0d58d3005a52dc671f09140256c3d9f32ba4bbaa9bdea4cf66508a9c0a4b0ba8f9bdf930df6267d114c8c97c4cc3bb8442fd7ca0629dc'

      // if (token) {
      //   config.headers["authorization"] = `Bearer ${token}`;
      // }
      /*  if (config.data instanceof FormData) {
         config.headers["Content-Type"] = "multipart/form-data";
       } */
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAllTeamMembers = async () => {
  let result;
  try {
    result = await axiosInstance.get(`/teams?populate=profile_img`);
  } catch (e) {
    result = e;
  }
  return result;
};


export const getAllBlogs = async () => {
  try {
    const res = await axiosInstance.get(
      `/blogs?populate[blogContent][on][v1.paragraph][populate][heading][populate]=*&populate[blogContent][on][v1.paragraph][populate][content][populate]=*&populate[blogContent][on][v1.paragraph][populate][image][populate]=src&populate[blogContent][on][v1.content][populate]=*&populate[blogContent][on][v1.image][populate]=src&populate[blogContent][on][v1.code-block][populate]=*&populate[blogContent][on][v1.list][populate]=*&populate[blogContent][on][v1.main-heading-and-content][populate]=*`
    );
    return res;
  } catch (e) {
    throw e;
  }
};


// export const getAllBlogs = async () => {
//   let result;
//   try{
//     result = await axiosInstance.get(`/blogs?populate=*`);
//   } catch (e) {
//     result = e;
//   }
//   return result;
// }