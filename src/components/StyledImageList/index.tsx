import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ImageProps {
  id: number;
  image: string;
  index: number;
  isChecked: boolean;
  toggleCheck: (index: number) => void;
  moveImage: (fromIndex: number, toIndex: number) => void;
}

//react dnd drag and drop context
const DraggableImage: React.FC<ImageProps> = ({
  id,
  image,
  index,
  isChecked,
  toggleCheck,
  moveImage,
}) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (
      item: { id: number; index: number },
      monitor: DropTargetMonitor
    ) => {
      if (!item || item.index === undefined || index === undefined) return;
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });
  //featured image styling
  const classNames =
    index === 0 ? "col-span-2 row-span-2 border-4 border-double" : "";
  const highlightClass = isChecked
    ? "border-2 border-red-500 bg-gray-100 brightness-50"
    : "";

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`group hover:scale-105 transition-hover duration-150 hover:opacity-70 aspect-square border-2 border-gray-300 rounded-lg shadow-xl ${classNames} ${highlightClass}`}
    >
      <img
        src={image}
        alt={`Image ${id}`}
        className="w-full h-full object-cover rounded-lg"
      />
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleCheck(index)}
        className="absolute top-0 left-0 mt-4 ml-4 opacity-0 w-6 h-6 rounded-md group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};

interface Image {
  id: number;
  image: string;
}

interface ImageComponentProps {
  images: Image[];
  checkedImages: number[];
  moveImage: (fromIndex: number, toIndex: number) => void;
  toggleCheck: (index: number) => void;
}
//mapping images to list to make a list of stylized image objects with dragging property
const ImageComponent: React.FC<ImageComponentProps> = ({
  images,
  checkedImages,
  moveImage,
  toggleCheck,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {images.map((item, index) => (
        <DraggableImage
          key={item.id}
          id={item.id}
          image={item.image}
          index={index}
          isChecked={checkedImages.includes(index)}
          toggleCheck={toggleCheck}
          moveImage={moveImage}
        />
      ))}
    </DndProvider>
  );
};

export default ImageComponent;
