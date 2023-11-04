import { useState } from "react";
import ImageGallery from "./components/ImageGallery";
import NavBar from "./components/NavBar";
import imageList from "./imageList.json";

function App() {
  const [images, setImages] = useState(imageList);
  const [checkedImages, setCheckedImages] = useState<number[]>([]);

  const selectedItemCount = checkedImages.length;

  //image positioning logic
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };
  //maintaing checked or selected images
  const toggleCheck = (index: number) => {
    const updatedCheckedImages = [...checkedImages];
    if (updatedCheckedImages.includes(index)) {
      updatedCheckedImages.splice(updatedCheckedImages.indexOf(index), 1);
    } else {
      updatedCheckedImages.push(index);
    }
    setCheckedImages(updatedCheckedImages);
  };
  //image deletion logic
  const deleteCheckedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !checkedImages.includes(index)
    );
    setImages(updatedImages);
    setCheckedImages([]);
  };

  return (
    <div>
      <NavBar
        deleteCheckedImages={deleteCheckedImages}
        selectedItemCount={selectedItemCount}
      />
      <ImageGallery
        images={images}
        checkedImages={checkedImages}
        moveImage={moveImage}
        toggleCheck={toggleCheck}
        deleteCheckedImages={deleteCheckedImages}
      />
    </div>
  );
}

export default App;
