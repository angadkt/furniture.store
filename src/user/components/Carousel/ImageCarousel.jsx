import React, { useState } from "react";

const ImageCarousel = () => {
  const [index, setIndex] = useState(1);

  const images = [
    "https://ii1.pepperfry.com/assets/ba072684-2dfa-4df6-8041-334d660b092a.jpg",
    "https://www.ulcdn.net/media/Slideshow/leeroy_slide_show.jpg?1727877112",
    "https://www.ulcdn.net/media/Slideshow/FHF_Slideshow_Updated_Banner.png?1727869087",
    "https://www.ulcdn.net/media/Slideshow/Multi_Brand_VMI_Slide_Show.png?1727886272",
  ];

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="overflow-hidden relative h-64 sm:h-80 md:h-96">
        {images.map((image, indexValue) => (
          <div
            key={indexValue}
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
              indexValue === index
                ? "translate-x-0 opacity-100"
                : indexValue < index
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${indexValue + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        ❯
      </button>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, indexValue) => (
          <button
            key={indexValue}
            className={`w-3 h-3 rounded-full ${
                indexValue === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setIndex(indexValue)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
