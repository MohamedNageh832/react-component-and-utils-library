import { ImageProps } from "./types";
import "./styles.css";

const Image = (props: ImageProps) => {
  const { src, alt, className } = props || {};

  const imgSrc =
    typeof src === "string" ? src : !src ? "" : URL.createObjectURL(src);

  return (
    <div className={`img-wrapper${className ? ` ${className}` : ""}`}>
      <img src={imgSrc} alt={alt} />
    </div>
  );
};

export default Image;
