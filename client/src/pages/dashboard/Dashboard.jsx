import { useEffect, useState } from "react";
import { Folder, HardDrive, Upload } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import SearchBar from "../../components/dashboard/SearchBar";
import EmptyState from "../../components/dashboard/EmptyState";
import RecentFiles from "../../components/dashboard/RecentFiles";
import UploadModal from "../../components/dashboard/UploadModal";

import {
  getFiles,
  getStorage,
  searchFiles,
} from "../../services/fileService";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  const [storage, setStorage] = useState({
    totalFiles: 0,
    storageUsedMB: 0,
  });

  const [search, setSearch] = useState("");
  const [openUpload, setOpenUpload] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
  const delay = setTimeout(async () => {
    try {
      if (search.trim() === "") {
        setFilteredFiles(files);
        return;
      }

      const result = await searchFiles(search);

      setFilteredFiles(result.files);
    } catch (err) {
      console.log(err);
    }
  }, 400);

  return () => clearTimeout(delay);
}, [search, files]);

  async function loadDashboard() {
    try {
      const storageData = await getStorage();
      const filesData = await getFiles();

      setStorage(storageData);
      setFiles(filesData.files);
      setFilteredFiles(filesData.files);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainLayout>

      <UploadModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onSuccess={loadDashboard}
      />

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your files securely with CloudDrive.
          </p>

        </div>

        <button
          onClick={() => setOpenUpload(true)}
          className="
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold"
        >
          <Upload size={20} />
          Upload File
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <StatCard
          title="Total Files"
          value={storage.totalFiles}
          icon={<Folder size={26} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Storage Used"
          value={`${storage.storageUsedMB} MB`}
          icon={<HardDrive size={26} />}
          color="bg-green-600"
        />

        <StatCard
          title="Recent Uploads"
          value={filteredFiles.length}
          icon={<Upload size={26} />}
          color="bg-purple-600"
        />

      </div>

      <div className="mt-8">

        <SearchBar
  value={search}
  onChange={(e) => {
    console.log("Typing:", e.target.value);
    setSearch(e.target.value);
  }}
/>

      </div>

      {filteredFiles.length === 0 ? (
        <EmptyState />
      ) : (
        <RecentFiles files={filteredFiles} />
      )}

    </MainLayout>
  );
}

export default Dashboard;