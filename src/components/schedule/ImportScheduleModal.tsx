import { useState, useRef } from "react";
import Modal from "@/components/ui/Modal/Modal";
import { AccentButton } from "@/components/ui/AccentButton/AccentButton";
import SubtleButton from "@/components/ui/SubtleButton/SubtleButton";
import { Upload, FileText, Check, X, Loader2 } from "lucide-react";
import { uploadSchedulePDF, type ScheduleParseResponse } from "@/api/schedule";

interface ImportScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ImportScheduleModal({
  isOpen,
  onClose,
  onSuccess,
}: ImportScheduleModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ScheduleParseResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const result = await uploadSchedulePDF(file);
      setResponse(result);
      setSuccess(true);

      // Показываем успех 2 секунды, затем закрываем и обновляем
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload PDF");
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setUploading(false);
    setSuccess(false);
    setError(null);
    setResponse(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Import Schedule from PDF"
      width="min(600px, 90vw)"
      height="auto"
      footer={
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <SubtleButton onClick={handleClose} disabled={uploading}>
            <X className="size-4" />
            Cancel
          </SubtleButton>
          <AccentButton
            onClick={handleUpload}
            disabled={!file || uploading || success}
          >
            {uploading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </>
            ) : success ? (
              <>
                <Check className="size-4" />
                Success!
              </>
            ) : (
              <>
                <Upload className="size-4" />
                Upload
              </>
            )}
          </AccentButton>
        </div>
      }
    >
      <div className="px-6 py-6">
        <div className="font-mono">
          {/* File upload area */}
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              transition-all duration-200
              ${
                file
                  ? "border-green-500 bg-green-50/50"
                  : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30 bg-gray-50"
              }
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading || success}
            />

            {file ? (
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <FileText className="size-10 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 text-sm truncate">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                {!uploading && !success && (
                  <button
                    className="flex-shrink-0 text-xs text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                  >
                    Change
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="size-10 text-gray-400" />
                <div>
                  <div className="font-semibold text-gray-700 text-sm">
                    Click to upload PDF
                  </div>
                  <div className="text-xs text-gray-500">
                    or drag and drop your timetable file
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <X className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-red-800">{error}</div>
              </div>
            </div>
          )}

          {/* Success animation and summary */}
          {success && response && (
            <div className="mt-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="size-10 rounded-full bg-green-500 flex items-center justify-center animate-bounce">
                      <Check className="size-5 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-green-900 mb-1 text-sm">
                      Schedule imported successfully!
                    </div>
                    <div className="text-xs text-green-800 space-y-0.5">
                      <div>
                        📅 {response.statistics.total} classes parsed
                      </div>
                      <div>
                        ✅ {response.saveSchedulesSummary.createdCount} created,{" "}
                        {response.saveSchedulesSummary.updatedCount} updated
                      </div>
                      {response.saveSchedulesSummary.skippedCount > 0 && (
                        <div>
                          ⏭️ {response.saveSchedulesSummary.skippedCount}{" "}
                          skipped
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload progress */}
          {uploading && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 text-blue-600 animate-spin" />
                <div className="text-xs text-blue-800">
                  Uploading and parsing PDF...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
