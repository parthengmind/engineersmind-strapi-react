import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeBlock from "./CodeBlock";
import { getBlogById } from "../api";
import Header from "./Header";
import "../styles/BlogContent.scss";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

const BlogContentRenderer = () => {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState([]);
  const [blogMeta, setBlogMeta] = useState({ autherName: "", minutesToRead: "" });

  // const API_BASE_URL = import.meta.env.VITE_API_URL;
  const API_BASE_URL = "https://emstrapi-website.engineersmind.dev";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        console.log("res.data.data ====>", res.data.data);

        if (res.status === 200 && res.data.data.length > 0) {
          const blog = res.data.data[0];

          const heroImage = blog?.heroImage?.formats?.large?.url
            ? `${API_BASE_URL}${blog.heroImage.formats.large.url}`
            : blog?.heroImage?.url
              ? `${API_BASE_URL}${blog.heroImage.url}`
              : null;

          const title = blog?.title || "Blog Title";
          const content = blog?.attributes?.blogContent || blog?.blogContent || [];
          setBlogContent(content);
          setBlogMeta({
            autherName: blog?.autherName || "Unknown Author",
            minutesToRead: blog?.minutesToRead || "N/A",
            heroImage,
            title,
          });
        } else {
          setBlogContent([]);
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
        const headingText = heading?.heading;
        const HeadingTag = heading?.headingType || "h3";
        const contentText = content?.content;
        const imageUrl = component.image?.src?.url
          ? `${API_BASE_URL}${component.image.src.url}`
          : null;
        const imageAlt = component.image?.alt || "Image";
        const layoutType = component.layoutType || "none";

        if (layoutType === "contentLeftImageRight" || layoutType === "contentRightImageLeft") {
          const isReversed = layoutType === "contentRightImageLeft";
          return (
            <section
              key={index}
              className={`blog-section side-by-side ${isReversed ? "reverse" : ""}`}
            >
              <div className="text-block">
                {headingText && (
                  <HeadingTag className="blog-heading">{headingText}</HeadingTag>
                )}
                {contentText && <p className="blog-paragraph">{contentText}</p>}
              </div>
              {imageUrl && (
                <div className="image-block">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="blog-image"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </section>
          );
        }

        return (
          <section key={index} className="blog-section">
            {headingText && <HeadingTag className="blog-heading">{headingText}</HeadingTag>}
            {contentText && <p className="blog-paragraph">{contentText}</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="blog-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </section>
        );
      }

      case "v1.main-heading-and-content": {
        const HeadingTag = headingType || "h3";
        return <HeadingTag key={index} className="blog-heading">{heading}</HeadingTag>;
      }

      case "v1.content":
        return (
          <div key={index} className="blog-content">
            {content && <p className="blog-paragraph">{content}</p>}
            {linkableContent && (
              <a href="#" className="blog-link">
                {linkableContent.replace(/\[([^\]]+)\]\(link\)/g, "$1")}
              </a>
            )}
          </div>
        );

      case "v1.image": {
        const imageUrl = component?.src?.url
          ? `${API_BASE_URL}${component.src.url}`
          : null;
        return (
          <div key={index} className="blog-section">
            {imageUrl && <img src={imageUrl} alt={alt || "Image"} className="blog-image" />}
          </div>
        );
      }

      case "v1.code-block":
        return (
          <div key={index} className="blog-code">
            <CodeBlock code={codeBlock.toString()} language="javascript" />
          </div>
        );

      case "v1.bulleted-list": {
        const items = component.listContent || [];
        return (
          <ul key={index} className="blog-list">
            {items.map((item, i) => (
              <li key={i}>{item?.content}</li>
            ))}
          </ul>
        );
      }

      case "v1.logo-list-component": {
        const items = component.logoList || [];
        return (
          <div key={index} className="blog-logo-list">
            {items.map((item, i) => {
              const HeadingTag = item.listHeading?.headingType || "h4";
              return (
                <div key={i} className="logo-item">
                  <HeadingTag className="blog-heading">{item.listHeading?.heading}</HeadingTag>
                  {item.listContent?.map((contentItem, j) => (
                    <p key={j} className="blog-paragraph">{contentItem.content}</p>
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
    <div className="blog-wrapper">
      <Header />
      <HeroSection heroImage={blogMeta.heroImage} title={blogMeta.title} />
      <div className="blog-body-wrapper">
        <div className="blog-left-sidebar">
          <img
            src="https://engineersmind-websitecontent.s3.amazonaws.com/EM_Logo.webp"
            alt="author"
            className="author-logo"
          />
          <p className="author-name">
            by <a href="#">{blogMeta.autherName}</a>
          </p>
          <hr />
          <p className="read-time">{blogMeta.minutesToRead} minute read</p>
        </div>

        <div className="blog-container">
          {blogContent.map((component, index) => renderComponent(component, index))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogContentRenderer;
