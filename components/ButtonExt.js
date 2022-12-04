
import Image from 'next/image'
const ButtonExt = ({ location, text, image, alt }) => {
  return (
    <a className="button" href={location} target="_blank" rel="noreferrer">
      {text}
     
          {image && <Image className="button--img" src={image} alt={alt} width="350px"
              height="300px" />}
    </a>
  );
};

export default ButtonExt;
