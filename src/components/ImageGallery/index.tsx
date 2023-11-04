import ImageComponent from "../StyledImageList";
import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: React.ComponentProps<typeof ImageComponent>["images"];
  checkedImages: React.ComponentProps<typeof ImageComponent>["checkedImages"];
  moveImage: React.ComponentProps<typeof ImageComponent>["moveImage"];
  toggleCheck: React.ComponentProps<typeof ImageComponent>["toggleCheck"];
  deleteCheckedImages: () => void;
}

export default function ImageGallery({
  images,
  checkedImages,
  moveImage,
  toggleCheck,
}: ImageGalleryProps) {
  return (
    //grid layout
    <motion.div
      initial={{ x: -2500 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 m-auto my-10 justify-center items-center rounded-lg shadow-inner border-2 border-gray-300 w-3/4 h-3/4 md:grid-col-3 sm:grid-cols-5 grid-flow-row-dense gap-x-3 gap-y-3 p-5"
    >
      <ImageComponent
        images={images}
        checkedImages={checkedImages}
        moveImage={moveImage}
        toggleCheck={toggleCheck}
      />

      <div className="aspect-square border-2 border-gray-500 p-20 border-dashed rounded-lg">
        <img src="/images/add-image.png" alt="add image" />
      </div>
    </motion.div>
  );
}
