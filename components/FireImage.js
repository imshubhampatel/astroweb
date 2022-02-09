import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { getFile} from '../utilities/utils'
const FireImageLoader = ({ src, layout, width, height, alt, objectFit="contain" }) => {
  const storage = getStorage();
  const [imgUrl, setImageUrl] = useState("/images/loading.svg");

  useEffect(() => {
    getFile(src).then((url) => setImageUrl(url)).catch((error) => {});      
  }, [src]);

  if (layout === "fill") {
    return <Image src={imgUrl} alt={alt} layout="fill" />;
  }

  return (
    <Image
      src={imgUrl}
      alt={alt}
      layout={layout}
      width={width}
      height={height}
      objectFit={objectFit}
    />
  );
};

export default FireImageLoader;
