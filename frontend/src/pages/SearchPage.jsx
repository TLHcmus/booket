import { useContext, useEffect, useState } from 'react';
import SearchContext from '../contexts/SearchContext';
import * as hotelService from '../services/hotelService';
import ToastContext from '../contexts/ToastContext';
import SearchResultCard from '../components/search/SearchResultCard.jsx';
import Pagination from '../components/Pagination.jsx';
import StarRatingFilter from '../components/filters/StarRatingFilter.jsx';
import HotelTypeFilter from '../components/filters/HotelTypeFilter.jsx';
import FacilityFilter from '../components/filters/FacilityFilter.jsx';
import PriceFilter from '../components/filters/PriceFilter.jsx';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useContext(SearchContext);
  const { setToast } = useContext(ToastContext);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Star rating filter
  const [selectedStars, setSelectedStars] = useState([]);
  const handleStarRatingChange = (e) => {
    const star = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedStars((prev) => [...prev, star]);
    } else {
      setSelectedStars((prev) => prev.filter((s) => s !== star));
    }
    setPage(1);
  };

  // Hotel type filter
  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const handleHotelTypeChange = (e) => {
    const hotelType = e.target.value;
    if (e.target.checked) {
      setSelectedHotelTypes((prev) => [...prev, hotelType]);
    } else {
      setSelectedHotelTypes((prev) => prev.filter((ht) => ht !== hotelType));
    }
    setPage(1);
  };

  // Facility filter
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const handleFacilityChange = (e) => {
    const facility = e.target.value;
    if (e.target.checked) {
      setSelectedFacilities((prev) => [...prev, facility]);
    } else {
      setSelectedFacilities((prev) => prev.filter((f) => f !== facility));
    }
    setPage(1);
  };

  // Price filter
  const [selectedPrice, setSelectedPrice] = useState('');
  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    setPage(1);
  };

  // Sort option
  const [sortOption, setSortOption] = useState('');
  const handleSortOptionChange = (e) => {
    const option = e.target.value;
    if (option === '') {
      setSortOption('');
      setPage(1);
      return;
    }
    switch (option) {
      case 'starRating':
        setSortOption('starRating');
        break;
      case 'priceAsc':
        setSortOption('priceAsc');
        break;
      case 'priceDesc':
        setSortOption('priceDesc');
        break;
    }
    setPage(1);
  };

  const [isReady, setIsReady] = useState(false); // Check if the search params are ready
  // Get search params from url
  useEffect(() => {
    const facilities = searchParams.get('facilities')?.split(',') || [];
    const types = searchParams.get('types')?.split(',') || [];
    const stars = searchParams.get('stars')?.split(',').map(Number) || [];
    const maxPrice = searchParams.get('maxPrice') || '';
    const sort = searchParams.get('sort') || '';
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;

    setSelectedFacilities(facilities);
    setSelectedHotelTypes(types);
    setSelectedStars(stars);
    setSelectedPrice(maxPrice);
    setSortOption(sort);
    setPage(pageFromUrl);

    setIsReady(true);
  }, [searchParams]);

  // Update search params
  useEffect(() => {
    const params = {};

    if (search.destination) params.destination = search.destination;
    if (selectedFacilities.length > 0)
      params.facilities = selectedFacilities.join(',');
    if (selectedHotelTypes.length > 0)
      params.types = selectedHotelTypes.join(',');
    if (selectedStars.length > 0) params.stars = selectedStars.join(',');
    if (selectedPrice) params.maxPrice = selectedPrice;
    if (sortOption) params.sort = sortOption;
    if (page) params.page = page;

    setSearchParams(params);
  }, [
    search,
    selectedFacilities,
    selectedHotelTypes,
    selectedStars,
    selectedPrice,
    sortOption,
    page,
    setSearchParams,
  ]);

  const [hotelsData, setHotelsData] = useState({
    data: [],
    pagination: { totalItems: 0, totalPages: 0, pageSize: 0, currentPage: 0 },
  });

  useEffect(() => {
    async function fetchHotels() {
      if (!isReady) return;

      try {
        setLoading(true);
        setError(null);

        const searchParams = {
          ...search,
          page,
          facilities: selectedFacilities,
          types: selectedHotelTypes,
          stars: selectedStars,
          maxPrice: selectedPrice,
          sortOption,
        };
        const res = await hotelService.searchHotels(searchParams);

        setHotelsData(res);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setToast({ message: error.message, type: 'ERROR' });
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [
    selectedFacilities,
    selectedHotelTypes,
    selectedStars,
    selectedPrice,
    sortOption,
    search,
    page,
    isReady,
    setToast,
  ]);

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries([...searchParams]);
    params.page = newPage;
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-4xl text-blue-600 animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-md border border-slate-300 p-5 h-fit lg:sticky lg:top-10">
          <div className="flex flex-col">
            <span className="font-medium text-lg border-b border-slate-300 pb-4">
              Filter by:
            </span>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarRatingChange}
            />
            <HotelTypeFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />
            <FacilityFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        {loading ? (
          'loading...'
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <span className="font-medium text-lg">
                {hotelsData.pagination.totalItems} Hotels found{' '}
                {search.destination == '' ? '' : `in ${search.destination}`}
              </span>
              <select
                className="border border-slate-300 rounded-md p-2"
                value={sortOption}
                onChange={(e) => {
                  handleSortOptionChange(e);
                }}
              >
                <option value="">Sort by</option>
                <option value="starRating">Rating</option>
                <option value="priceAsc">Price (low to high)</option>
                <option value="priceDesc">Price (high to low)</option>
              </select>
            </div>
            {hotelsData.data.map((hotel) => (
              <SearchResultCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
      {hotelsData.data.length > 0 && hotelsData.pagination.totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={hotelsData.pagination.totalPages}
          onPageChange={(newPage) => handlePageChange(newPage)}
        />
      )}
    </>
  );
};

export default SearchPage;
