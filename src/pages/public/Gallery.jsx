import { useState } from 'react';
import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  'All',
  'Church',
  'Feast',
  'Retreat',
  'Youth',
  'Catechism',
  'Christmas',
  'Easter',
  'Family Units',
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { documents: images, loading } = useCollection('gallery', {
    orderBy: 'createdAt',
    orderDir: 'desc',
  });

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(filteredImages[index]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const prevImage = () => {
    const newIndex =
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <div>
      <PageBanner
        title="Photo Gallery"
        subtitle="Moments from our parish life and celebrations"
      />

      <section className="container-section">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.caption || 'Parish gallery image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                  {image.caption && (
                    <p className="text-white text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No images in this category yet.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close lightbox"
          >
            <FiX size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            aria-label="Previous image"
          >
            <FiChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            aria-label="Next image"
          >
            <FiChevronRight size={40} />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[80vh]">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption || 'Gallery image'}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {lightboxImage.caption && (
              <p className="text-white text-center mt-4">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
