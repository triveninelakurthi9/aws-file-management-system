import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

function UploadModal({ open, onClose, onSuccess }) {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const uploadFile = async (file) => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File uploaded successfully");

      onSuccess();

      onClose();

    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[520px] p-8 shadow-2xl">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Upload File
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            uploadFile(e.dataTransfer.files[0]);
          }}
          className="mt-8 border-2 border-dashed border-blue-300 rounded-3xl p-16 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition"
        >

          <Upload
            size={60}
            className="text-blue-600"
          />

          <h3 className="mt-6 text-xl font-semibold">
            Drag & Drop your files
          </h3>

          <p className="mt-2 text-slate-500">
            or click to browse
          </p>

        </div>

        <input
          ref={inputRef}
          hidden
          type="file"
          onChange={(e) =>
            uploadFile(e.target.files[0])
          }
        />

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl border py-3"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default UploadModal;