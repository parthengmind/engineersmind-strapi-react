import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `https://emstrapi-website.engineersmind.dev/api`,
});


axiosInstance.interceptors.request.use(
  function (config) {
    try {
      config.headers["Content-Type"] = "application/json";
      // token from env --------------------------------------
      // const token = import.meta.env.VITE_ACCESS_TOKEN
      // live cms token --------------------------------------
      const token = 'd6353d42ea1a72bf7d76bd75c7d66b98dd710421691a93085b87cbda741fcf75b9e2e8e89d744ea21f550c9b1dc97cdd30ae80a2b11f47371e4c3bd5c0e023e7ad72956978accd1882e3dac11575629611aa3e140352d96f43524496b11789dca588599ee077fb67575a1a15c3842a2b100c4ae5d2d3aeeae763db668dedd067'
      // local cms token --------------------------------------
      // const token = '695521dcf28d148e6460d64fcf1c261216ab637202eb1a1a67c919a5f08781e31aa453f8ac85fc8d468db5f91ebca5ceb515921fdcc085b161062b53232d46dec13115cfc63e7c4999bbbc57c9864bfc5a7cc176590c58a962519b91e529f0b3852d059ece8e4d144e458a80a912ccee532a756ec68a244123c5eeaa48b5f128'

      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
        if (config.data instanceof FormData) {
         config.headers["Content-Type"] = "multipart/form-data";
       } 
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


// export const getAllBlogs = async () => {
//   try {
//     const res = await axiosInstance.get(
//       `/blogs?populate[blogContent][on][v1.paragraph][populate][heading][populate]=*&populate[blogContent][on][v1.paragraph][populate][content][populate]=*&populate[blogContent][on][v1.paragraph][populate][image][populate]=src&populate[blogContent][on][v1.content][populate]=*&populate[blogContent][on][v1.image][populate]=src&populate[blogContent][on][v1.code-block][populate]=*&populate[blogContent][on][v1.logo-list-component][populate][logoList][populate]=*&populate[blogContent][on][v1.bulleted-list][populate][listContent][populate]=*&populate[blogContent][on][v1.main-heading-and-content][populate]=*`
//     );
//     return res;
//   } catch (e) {
//     throw e;
//   }
// };

export const getBlogById = async (id) => {
  try {
    const res = await axiosInstance.get(
      // `/blogs?filters[id][$eq]=56&populate=*`
      `/blogs?filters[id][$eq]=${id}&populate[heroImage][populate]=*&populate[blogContent][on][v1.paragraph][populate][heading][populate]=*&populate[blogContent][on][v1.paragraph][populate][content][populate]=*&populate[blogContent][on][v1.paragraph][populate][image][populate]=src&populate[blogContent][on][v1.content][populate]=*&populate[blogContent][on][v1.image][populate]=src&populate[blogContent][on][v1.code-block][populate]=*&populate[blogContent][on][v1.logo-list-component][populate][logoList][populate]=*&populate[blogContent][on][v1.bulleted-list][populate][listContent][populate]=*&populate[blogContent][on][v1.main-heading-and-content][populate]=*`
    );  
    return res;
  } catch (e) {
    throw e;
  }
};

export const getListOfAllBlogs = async () => {
  try {
    const res = await axiosInstance.get(
      `/blogs?populate[thumbnail]=true&fields[0]=title&fields[1]=shortDescription&fields[2]=publishedAt`
    );
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
//   *&populate[blogContent][on][v1.logo-list-component][populate][logoList][populate]=
//   *&populate[blogContent][on][v1.bulleted-list][populate][listContent][populate]=
//   *&populate[blogContent][on][v1.main-heading-and-content][populate]=*
//   `



