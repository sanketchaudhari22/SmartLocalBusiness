import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface BusinessGalleryProps {
  images: string[];
  businessName: string;
}

export const BusinessGallery = ({ images, businessName }: BusinessGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-h4 text-neutral-900 mb-4">Photo Gallery</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openModal(index)}
              className="relative group aspect-square rounded-lg overflow-hidden bg-neutral-100 hover:opacity-90 transition-opacity"
            >
              <img
                src={image}
                alt={`${businessName} - Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${businessName} - Gallery`}
        size="full"
      >
        <div
          className="relative h-full flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {selectedIndex !== null && (
            <>
              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={images[selectedIndex]}
                  alt={`${businessName} - Photo ${selectedIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Navigation Buttons */}
              {selectedIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-neutral-900" />
                </button>
              )}

              {selectedIndex < images.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-neutral-900" />
                </button>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`
                      flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                      ${index === selectedIndex
                        ? 'border-primary-500 scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
