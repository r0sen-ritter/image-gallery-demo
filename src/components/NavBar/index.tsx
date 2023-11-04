import { motion } from "framer-motion";

interface NavBarProps {
  deleteCheckedImages: () => void;
  selectedItemCount: number;
}

export default function NavBar({
  deleteCheckedImages,
  selectedItemCount,
}: NavBarProps) {
  const isItemSelected = selectedItemCount > 0;
  return (
    <div className="flex items-center justify-between m-auto my-5 bg-white sticky top-0 p-2 rounded-lg shadow-inner border-2 border-gray-300 w-3/4 h-auto">
      <motion.span
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          color: isItemSelected ? "#3498db" : "black",
        }}
        className="text-lg ml-4 font-bold text-black font-sans "
      >
        {" "}
        {/*conditional change of item select*/}
        {selectedItemCount > 0
          ? `${selectedItemCount} item${
              selectedItemCount > 1 ? "s" : ""
            } selected`
          : "Gallery"}
      </motion.span>

      <motion.button
        onClick={deleteCheckedImages}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ml-4 mr-4 my-1 font-sans hover:brightness-200 bg-red-600 hover:outline-4 text-white px-4 py-2 rounded-full hover:shadow-lg"
      >
        Delete
      </motion.button>
    </div>
  );
}
