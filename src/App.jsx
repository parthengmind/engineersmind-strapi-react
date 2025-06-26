import { useEffect, useState } from "react";
import { getAllBlogs, getAllTeamMembers } from "./api";
import './App.css'


// const BlogContentRenderer = ({ blogContent = [] }) => {
//   const renderComponent = (component, index) => {
//     const { __component, heading, headingType, content, alt, codeBlock, listType, linkableContent } = component;

//     switch (__component) {
//       case 'v1.paragraph': {
//         const headingText = component.heading?.heading;
//         const headingType = component.heading?.headingType || 'h3';
//         const HeadingTag = headingType;
//         const contentText = component.content?.content;
//         const imageUrl = component.image?.src?.url
//           ? `${import.meta.env.VITE_API_URL}${component.image.src.url}`
//           : null;
//         const imageAlt = component.image?.alt || 'Image';

//         return (
//           <div key={index} className="my-8 p-6 bg-gray-50 border rounded-lg shadow-sm">
//             {headingText && (
//               <HeadingTag className="text-xl font-semibold text-gray-800 mb-3">
//                 {headingText}
//               </HeadingTag>
//             )}

//             {contentText && (
//               <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
//                 {contentText}
//               </p>
//             )}

//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt={imageAlt}
//                 style={{
//                 maxWidth: '100%',
//                 maxHeight: '500px',
//                 display: 'block',
//                 margin: '20px auto',
//                 objectFit: 'contain',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
//               }}
//                 className="max-w-full max-h-[400px] mx-auto rounded-lg shadow-md object-contain"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   const fallback = e.target.nextElementSibling;
//                   if (fallback) fallback.style.display = 'block';
//                 }}
//               />
//             )}

//             {/* Optional fallback if image fails */}
//             {imageUrl && (
//               <div style={{ display: 'none' }} className="text-center text-red-500 text-sm mt-2">
//                  Failed to load image: {imageAlt}
//               </div>
//             )}
//           </div>
//         );
//       }
//       case 'v1.main-heading-and-content':
//         const HeadingTag = headingType || 'h3';
//         return (
//           <HeadingTag key={index} className="font-bold text-gray-800 mt-6 mb-3">
//             {heading}
//           </HeadingTag>
//         );

//       case 'v1.content':
//         return (
//           <div key={index} className="mb-4">
//             {content && (
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                 {content}
//               </p>
//             )}
//             {linkableContent && (
//               <div className="text-blue-600 hover:text-blue-800">
//                 <a href="#" className="underline">
//                   {linkableContent.replace(/\[([^\]]+)\]\(link\)/g, '$1')}
//                 </a>
//               </div>
//             )}
//           </div>
//         );

//       case 'v1.image': {
//         const alt = component.alt || 'Blog image';

//         const imageUrl = component?.src?.url
//           ? `${import.meta.env.VITE_API_URL}${component.src.url}`
//           : null;

//         if (!imageUrl) {
//           return (
//             <div key={index} className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-center text-gray-500">
//                 Image: {alt} (ID: {component.id})
//               </p>
//               <p className="text-center text-xs text-yellow-500 mt-1">
//                 Image URL not available
//               </p>
//             </div>
//           );
//         }

//         return (
//           <div key={index} className="my-6">
//             <img
//               src={imageUrl}
//               alt={alt}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '500px',
//                 display: 'block',
//                 margin: '20px auto',
//                 objectFit: 'contain',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
//               }}
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 const errorDiv = e.target.nextElementSibling;
//                 if (errorDiv) errorDiv.style.display = 'block';
//               }}
//               onLoad={(e) => {
//                 const errorDiv = e.target.nextElementSibling;
//                 if (errorDiv) errorDiv.style.display = 'none';
//               }}
//             />
//             <div style={{ display: 'none' }} className="p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-center text-red-600">
//                 Failed to load image: {alt}
//               </p>
//               <p className="text-center text-xs text-red-400 mt-1">
//                 URL: {imageUrl}
//               </p>
//             </div>
//           </div>
//         );
//       }
//       case 'v1.code-block':
//         return (
//           <div key={index} className="my-4">
//             <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
//               <code>{codeBlock}</code>
//             </pre>
//           </div>
//         );

//       case 'v1.list':
//         const listContent = content || '';
//         const listItems = listContent.split('\n').filter(item => item.trim());

//         if (listType === 'bulletpoint') {
//           return (
//             <ul key={index} className="list-disc list-inside mb-4 ml-4">
//               {listItems.map((item, itemIndex) => (
//                 <li key={itemIndex} className="text-gray-700 mb-1">
//                   {item.trim()}
//                 </li>
//               ))}
//             </ul>
//           );
//         } else if (listType === 'logoList') {
//           return (
//             <div key={index} className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
//               {heading && (
//                 <h4 className="font-semibold text-blue-800 mb-2">{heading}</h4>
//               )}
//               <p className="text-gray-700">{content}</p>
//             </div>
//           );
//         }
//         return null;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
//       <div className="prose prose-lg max-w-none">
//         {blogContent.map((component, index) => renderComponent(component, index))}
//       </div>
//     </div>
//   );
// };


const BlogContentRenderer = ({ blogContent = [] }) => {
  const renderComponent = (component, index) => {
    const { __component, heading, headingType, content, alt, codeBlock, linkableContent } = component;

    switch (__component) {
      case 'v1.paragraph': {
        const headingText = component.heading?.heading;
        const headingType = component.heading?.headingType || 'h3';
        const HeadingTag = headingType;
        const contentText = component.content?.content;
        const imageUrl = component.image?.src?.url
          ? `${import.meta.env.VITE_API_URL}${component.image.src.url}`
          : null;
        const imageAlt = component.image?.alt || 'Image';

        return (
          <div key={index} className="my-8 p-6 bg-gray-50 border rounded-lg shadow-sm">
            {headingText && (
              <HeadingTag className="text-xl font-semibold text-gray-800 mb-3">
                {headingText}
              </HeadingTag>
            )}

            {contentText && (
              <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                {contentText}
              </p>
            )}

            {imageUrl && (
              <img
                src={imageUrl}
                alt={imageAlt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  display: 'block',
                  margin: '20px auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                className="max-w-full max-h-[400px] mx-auto rounded-lg shadow-md object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextElementSibling;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
            )}

            {imageUrl && (
              <div style={{ display: 'none' }} className="text-center text-red-500 text-sm mt-2">
                Failed to load image: {imageAlt}
              </div>
            )}
          </div>
        );
      }

      case 'v1.main-heading-and-content': {
        const HeadingTag = headingType || 'h3';
        return (
          <HeadingTag key={index} className="font-bold text-gray-800 mt-6 mb-3">
            {heading}
          </HeadingTag>
        );
      }

      case 'v1.content':
        return (
          <div key={index} className="mb-4">
            {content && (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            )}
            {linkableContent && (
              <div className="text-blue-600 hover:text-blue-800">
                <a href="#" className="underline">
                  {linkableContent.replace(/\[([^\]]+)\]\(link\)/g, '$1')}
                </a>
              </div>
            )}
          </div>
        );

      case 'v1.image': {
        const alt = component.alt || 'Blog image';
        const imageUrl = component?.src?.url
          ? `${import.meta.env.VITE_API_URL}${component.src.url}`
          : null;

        return (
          <div key={index} className="my-6">
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '500px',
                    display: 'block',
                    margin: '20px auto',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const errorDiv = e.target.nextElementSibling;
                    if (errorDiv) errorDiv.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none' }} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-center text-red-600">Failed to load image: {alt}</p>
                  <p className="text-center text-xs text-red-400 mt-1">URL: {imageUrl}</p>
                </div>
              </>
            ) : (
              <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-center text-gray-500">Image: {alt}</p>
                <p className="text-center text-xs text-yellow-500 mt-1">Image URL not available</p>
              </div>
            )}
          </div>
        );
      }

      case 'v1.code-block':
        return (
          <div key={index} className="my-4">
            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
              <code>{codeBlock}</code>
            </pre>
          </div>
        );

      case 'v1.bulleted-list': {
        const items = component.listContent || [];
        return (
          <ul key={index} className="list-disc list-inside mb-4 ml-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700 mb-1">
                {item?.content}
              </li>
            ))}
          </ul>
        );
      }

      case 'v1.logo-list-component': {
        const items = component.logoList || [];

        return (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
            {items.map((item, i) => {
              const headingText = item.listHeading?.heading || '';
              const headingType = item.listHeading?.headingType || 'h4';
              const HeadingTag = headingType;

              return (
                <div key={i} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                  {headingText && (
                    <HeadingTag className="text-gray-800 font-semibold mb-2">
                      {headingText}
                    </HeadingTag>
                  )}

                  {item.listContent?.map((contentItem, j) => (
                    <div key={j} className="text-gray-700 mb-2">
                      {contentItem.content && (
                        <p className="whitespace-pre-line">{contentItem.content}</p>
                      )}
                      {contentItem.linkableContent && (
                        <a
                          href="#"
                          className="text-blue-600 underline hover:text-blue-800"
                          dangerouslySetInnerHTML={{
                            __html: contentItem.linkableContent.replace(
                              /\[([^\]]+)\]\(([^)]+)\)/g,
                              '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
                            ),
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      }


      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="prose prose-lg max-w-none">
        {blogContent.map((component, index) => renderComponent(component, index))}
      </div>
    </div>
  );
};


const App = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [blog, setBlog] = useState([]);

  // const fetchAllTeam = async () => {
  //   await getAllTeamMembers()
  //     .then((res) => {
  //       if(res.status === 200){
  //         setTeamMembers(res.data.data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // };

  // const fetchAllBlog = async () => {
  //   await getAllBlogs()
  //     .then((res) => {
  //       if(res.status === 200) {
  //         setBlog(res.data.data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // };

  const fetchAllBlog = async () => {
    try {
      const res = await getAllBlogs();
      if (res.status === 200) {
        setBlog(res.data?.data?.[0]?.blogContent);
      }
    } catch (e) {
      console.error("Error in fetchAllBlog:", e);
    }
  };


  useEffect(() => {
    // fetchAllTeam();
    fetchAllBlog();
  }, []);

  // console.log(teamMembers)
  //   useEffect(() => {
  //   console.log("Updated Blog:", blog);
  // }, [blog]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* <h1 className="text-xl  text-center mb-8 text-gray-800">
          Blog Content Display
        </h1> */}
        <BlogContentRenderer blogContent={blog} />
      </div>
    </div>
  );
};


//   return <div className="container">
//     {/* {teamMembers?.map((item, index) => {
//       return (
//         <div key={index} className="team-card">
//           <img src={`${import.meta.env.VITE_API_URL}${item.profile_img.formats.thumbnail?.url}`} />
//           <span className="name">{item.name}</span>
//           <span className="designation">{item.designation}</span>
//         </div>
//       )
//     })} */}
//     <h1>Welcome</h1>
//   </div>;
// };

export default App;
