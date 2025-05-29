import { FormProvider, useForm } from 'react-hook-form';
import HotelDetailsSection from './HotelDetailsSection';
import HotelTypeSection from './HotelTypeSection';
import HotelFacilitiesSection from './HotelFacilitiesSection';
import HotelGuestsSection from './HotelGuestsSection';
import HotelImagesSection from './HotelImagesSection';
import { useEffect } from 'react';

const ManageHotelForm = function ({
  onSave,
  hotel,
  loading,
  buttonLabel,
}) {
  const formMethods = useForm();
  const { handleSubmit, reset } = formMethods;

  // Reset form values when hotel data is passed
  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson) => {
    // Convert to FormData object
    const formData = new FormData();
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('pricePerNight', formDataJson.pricePerNight);
    formData.append('starRating', formDataJson.starRating);
    formData.append('type', formDataJson.type);
    formData.append('adultCount', formDataJson.adultCount);
    formData.append('childCount', formDataJson.childCount);

    // Append facilities
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    // Append images
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append('imageFiles', imageFile);
    });

    // Append imageUrls
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      });
    }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="space-y-8" onSubmit={onSubmit}>

        <div className="space-y-8">
          <HotelDetailsSection />
          <HotelTypeSection />
          <HotelFacilitiesSection />
          <HotelGuestsSection />
          <HotelImagesSection />
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer disabled:bg-blue-300"
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
