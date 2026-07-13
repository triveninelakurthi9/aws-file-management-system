import { FolderOpen } from "lucide-react";

function EmptyState() {
  return (
    <div className="py-24 flex flex-col items-center">

      <FolderOpen
        size={90}
        className="text-blue-500"
      />

      <h2 className="mt-8 text-3xl font-bold">
        No Files Yet
      </h2>

      <p className="mt-3 text-slate-500">
        Upload your first file to CloudDrive.
      </p>

      <button
        className="
        mt-8
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-8
        py-3
        rounded-xl
        font-semibold
        transition"
      >
        Upload File
      </button>

    </div>
  );
}

export default EmptyState;