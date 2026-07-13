import {
  Download,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

import api from "../../services/api";
import toast from "react-hot-toast";

function RecentFiles({ files }) {
  const handleDownload = async (id, name) => {
    try {
      const response = await api.get(`/files/download/${id}`);

      window.open(response.data.downloadUrl, "_blank");

      toast.success(`${name} downloaded`);
    } catch (err) {
      console.log(err);
      toast.error("Download failed");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Files
      </h2>

      <div className="space-y-4">

        {files.map((file) => (
          <div
            key={file._id}
            className="flex justify-between items-center border rounded-2xl p-5 hover:bg-slate-50 transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">

                <FileText className="text-blue-600"/>

              </div>

              <div>

                <h3 className="font-semibold">
                  {file.originalName}
                </h3>

                <p className="text-sm text-slate-500">

                  {(file.fileSize/1024).toFixed(2)} KB

                </p>

              </div>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  handleDownload(file._id,file.originalName)
                }
                className="p-2 rounded-lg hover:bg-blue-100"
              >
                <Download size={18}/>
              </button>

              <button
                className="p-2 rounded-lg hover:bg-yellow-100"
              >
                <Pencil size={18}/>
              </button>

              <button
                className="p-2 rounded-lg hover:bg-red-100"
              >
                <Trash2 size={18}/>
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentFiles;