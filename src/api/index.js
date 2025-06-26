import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});


axiosInstance.interceptors.request.use(
  function (config) {
    try {
      config.headers["Content-Type"] = "application/json";
      const token = '84ac8d3ff9eeccb28e22ffb1dad43fed206bdedbade6e9d1c7ff8e37f0b8498d90c0eeb665dfd0f030aaa8cf0f66d964b4d7dac9820986cf7e39b62cc6fd7e6a524078df938a1a2cead3394d87d68d087cc7de2cee2400821565f7d7775db36394f2a1d95ad5d3a65a7e8a1930d7566fba275fec2af486acd1f2644c6763751b'

      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
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
      `/blogs?populate[blogContent][on][v1.paragraph][populate][heading][populate]=*&populate[blogContent][on][v1.paragraph][populate][content][populate]=*&populate[blogContent][on][v1.paragraph][populate][image][populate]=src&populate[blogContent][on][v1.content][populate]=*&populate[blogContent][on][v1.image][populate]=src&populate[blogContent][on][v1.code-block][populate]=*&populate[blogContent][on][v1.logo-list-component][populate][logoList][populate]=*&populate[blogContent][on][v1.bulleted-list][populate][listContent][populate]=*&populate[blogContent][on][v1.main-heading-and-content][populate]=*`
    );
      // `/blogs?populate[blogContent][on][v1.paragraph][populate][heading][populate]=*&populate[blogContent][on][v1.paragraph][populate][content][populate]=*&populate[blogContent][on][v1.paragraph][populate][image][populate]=src&populate[blogContent][on][v1.content][populate]=*&populate[blogContent][on][v1.image][populate]=src&populate[blogContent][on][v1.code-block][populate]=*&populate[blogContent][on][v1.list][populate]=*&populate[blogContent][on][v1.main-heading-and-content][populate]=*`
      
// `
// /blogs?
//   populate[blogContent][on][v1.paragraph][populate][heading][populate]=
//   *&populate[blogContent][on][v1.paragraph][populate][content][populate]=
//   *&populate[blogContent][on][v1.paragraph][populate][image][populate]=src
//   &populate[blogContent][on][v1.content][populate]=
//   *&populate[blogContent][on][v1.image][populate]=src
//   &populate[blogContent][on][v1.code-block][populate]=
//   *&populate[blogContent][on][v1.logo-list-component][populate][logoList][populate]=
//   *&populate[blogContent][on][v1.bulleted-list][populate][listContent][populate]=
//   *&populate[blogContent][on][v1.main-heading-and-content][populate]=*
//   `




  // *&populate[blogContent][on][v1.list][populate]=
// );
    return res;
  } catch (e) {
    throw e;
  }
};

// `
// /blogs?
//   populate[blogContent][on][v1.paragraph][populate][heading][populate]=
//   *&populate[blogContent][on][v1.paragraph][populate][content][populate]=
//   *&populate[blogContent][on][v1.paragraph][populate][image][populate]=src
//   &populate[blogContent][on][v1.content][populate]=
//   *&populate[blogContent][on][v1.image][populate]=src
//   &populate[blogContent][on][v1.code-block][populate]=
//   *&populate[blogContent][on][v1.list][populate]=
//   *&populate[blogContent][on][v1.logo-list-component][populate]=
//   *&populate[blogContent][on][v1.main-heading-and-content][populate]=*
// `




// export const getAllBlogs = async () => {
//   let result;
//   try{
//     result = await axiosInstance.get(`/blogs?populate=*`);
//   } catch (e) {
//     result = e;
//   }
//   return result;
// }