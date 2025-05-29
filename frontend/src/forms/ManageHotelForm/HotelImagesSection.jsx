import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

const HotelImagesSection = function () {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [fileNames, setFileNames] = useState([]);

  const existingImageUrls = watch('imageUrls');

  // Handle file selection event
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const names = filesArray.map((file) => file.name);
      setFileNames(names);
    }
  };

  // Handle delete image event
  const handleDeleteImage = (e, url) => {
    e.preventDefault();
    // Remove the image URL from the existingImageUrls array
    const updatedImageUrls = existingImageUrls.filter(
      (imageUrl) => imageUrl !== url
    );
    // Update the form state with the new array
    setValue('imageUrls', updatedImageUrls);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">Images</h3>
        <p className="text-sm text-gray-600 mt-1">
          Add images of your hotel. The first image will be the cover image.
        </p>
      </div>

      <div className="space-y-4">
        {existingImageUrls && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImageUrls.map((url) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt="Hotel"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 text-white group-hover:opacity-100 transition-opacity rounded-lg"
                  onClick={(e) => handleDeleteImage(e, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 items-center">
          <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              {...register('imageFiles', {
                validate: (imageFiles) => {
                  const totalLength =
                    (imageFiles?.length || 0) +
                    (existingImageUrls?.length || 0);
                  if (totalLength < 3) {
                    return 'At least 3 image is required';
                  }
                  if (totalLength > 6) {
                    return 'Total number of image cannot be more than 6';
                  }
                  return true;
                },
                onChange: handleFileChange,
              })}
            />
            Choose file
          </label>

          {/* Display selected files */}
          {fileNames.length > 0 && (
            <div className="flex gap-2">
              <p className="font-semibold">Selected files:</p>
              <p className="text-gray-700">{fileNames.join(', ')}</p>
            </div>
          )}
        </div>

        {errors.imageFiles && (
          <p className="text-red-500 text-sm font-medium">
            {errors.imageFiles.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelImagesSection;
