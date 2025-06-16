import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {preview || previewUrl ? (
        <div className="relative group">
          <img
            src={preview || previewUrl}
            alt="Profile preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-white rounded-full p-1 shadow group-hover:scale-110 transition"
          >
            <LuTrash className="text-red-500" />
          </button>
        </div>
      ) : (
        <div
          onClick={onChooseFile}
          className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-full cursor-pointer text-gray-400 hover:border-blue-400"
        >
          <LuUpload className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
