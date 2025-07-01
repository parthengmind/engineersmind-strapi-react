import React from "react";
import CodeBlock from "./CodeBlock";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogById } from "../api";
import '../App.scss'

const BlogContentRenderer = () => {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
  const fetchBlog = async () => {
    try {
      const res = await getBlogById(id); 

      if (res.status === 200 && res.data.data.length > 0) {
        const blog = res.data.data[0];
        setBlogContent(blog?.attributes?.blogContent || blog?.blogContent || []);
        console.log("Loaded blog:", blog.title);
      } else {
        setBlogContent([]); // reset if no match
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setBlogContent([]);
    }
  };

  fetchBlog();
}, [id]);



  const renderComponent = (component, index) => {
    const {
      __component,
      heading,
      headingType,
      content,
      alt,
      codeBlock,
      linkableContent,
    } = component;

    switch (__component) {
      case "v1.paragraph": {
        const headingText = component.heading?.heading;
        const HeadingTag = component.heading?.headingType || "h3";
        const contentText = component.content?.content;
        const imageUrl = component.image?.src?.url
          ? `${import.meta.env.VITE_API_URL}${component.image.src.url}`
          : null;
        const imageAlt = component.image?.alt || "Image";

        return (
          <div
            key={index}
            className="my-8 p-6 bg-gray-50 border rounded-lg shadow-sm"
          >
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
              <>
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    display: "block",
                    margin: "20px auto",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  className="max-w-full max-h-[400px] mx-auto rounded-lg shadow-md object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = "block";
                  }}
                />
                <div
                  style={{ display: "none" }}
                  className="text-center text-red-500 text-sm mt-2"
                >
                  Failed to load image: {imageAlt}
                </div>
              </>
            )}
          </div>
        );
      }

      case "v1.main-heading-and-content": {
        const HeadingTag = headingType || "h3";
        return (
          <HeadingTag key={index} className="font-bold text-gray-800 mt-6 mb-3">
            {heading}
          </HeadingTag>
        );
      }

      case "v1.content":
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
                  {linkableContent.replace(/\[([^\]]+)\]\(link\)/g, "$1")}
                </a>
              </div>
            )}
          </div>
        );

      case "v1.image": {
        const imageAlt = alt || "Blog image";
        const imageUrl = component?.src?.url
          ? `${import.meta.env.VITE_API_URL}${component.src.url}`
          : null;

        return (
          <div key={index} className="my-6">
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    display: "block",
                    margin: "20px auto",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    const errorDiv = e.target.nextElementSibling;
                    if (errorDiv) errorDiv.style.display = "block";
                  }}
                />
                <div
                  style={{ display: "none" }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-center text-red-600">
                    Failed to load image: {imageAlt}
                  </p>
                  <p className="text-center text-xs text-red-400 mt-1">
                    URL: {imageUrl}
                  </p>
                </div>
              </>
            ) : (
              <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-center text-gray-500">Image: {imageAlt}</p>
                <p className="text-center text-xs text-yellow-500 mt-1">
                  Image URL not available
                </p>
              </div>
            )}
          </div>
        );
      }

      case "v1.code-block":
        console.log(codeBlock)
        return (
          <div key={index} className="my-4">
            {/* <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
              <code>{codeBlock}</code>
            </pre> */}
            <CodeBlock code={codeBlock.toString()} language="javascript" />
          </div>
        );

      case "v1.bulleted-list": {
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

      case "v1.logo-list-component": {
        const items = component.logoList || [];

        return (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6"
          >
            {items.map((item, i) => {
              const headingText = item.listHeading?.heading || "";
              const HeadingTag = item.listHeading?.headingType || "h4";

              return (
                <div
                  key={i}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  {headingText && (
                    <HeadingTag className="text-gray-800 font-semibold mb-2">
                      {headingText}
                    </HeadingTag>
                  )}

                  {item.listContent?.map((contentItem, j) => (
                    <div key={j} className="text-gray-700 mb-2">
                      {contentItem.content && (
                        <p className="whitespace-pre-line">
                          {contentItem.content}
                        </p>
                      )}
                      {contentItem.linkableContent && (
                        <span
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
      <div className="prose prose-lg max-w-none" style={{ paddingInline: '200px' }}>
        {blogContent.map((component, index) =>
          renderComponent(component, index)
        )}
      </div>
    </div>
  );
};

export default BlogContentRenderer;
