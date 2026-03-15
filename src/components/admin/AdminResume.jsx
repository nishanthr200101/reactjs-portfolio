import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const AdminResume = () => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [uploadedAt, setUploadedAt] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/settings/public")
      .then((data) => {
        setCurrentUrl(data?.resumeUrl || null);
        setUploadedAt(data?.resumeUploadedAt || null);
      })
      .catch(() => {});
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await api.upload("/resume/upload", formData);
      if (data?.resumeUrl) {
        setCurrentUrl(data.resumeUrl);
        setUploadedAt(new Date().toISOString());
        setMessage("Resume uploaded successfully!");
        setFile(null);
      } else {
        setMessage(data?.message || "Upload failed.");
      }
    } catch {
      setMessage("Upload failed. Check API connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Resume</h1>

      {currentUrl && (
        <div className="bg-gray-900 rounded-xl p-5 mb-6">
          <p className="text-gray-400 text-sm mb-1">Current resume:</p>
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline text-sm break-all"
          >
            {currentUrl}
          </a>
          {uploadedAt && (
            <p className="text-gray-600 text-xs mt-1">
              Uploaded {new Date(uploadedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleUpload} className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
        <label className="text-gray-300 font-medium text-sm">Upload new PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-600 file:text-white file:cursor-pointer"
        />
        <button
          type="submit"
          disabled={!file || uploading}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white py-2 px-6 rounded-lg font-medium transition-colors w-fit"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminResume;
