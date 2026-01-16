import { useState } from "react";
import Masonry from "react-responsive-masonry";
import { PhotoModal } from "./PhotoModal";

interface PhotoMetadata {
  id: string;
  url: string;
  title: string;
  resolution: string;
  size: string;
  camera: string;
  lens: string;
  settings: {
    aperture: string;
    shutterSpeed: string;
    iso: string;
    focalLength: string;
  };
  location: string;
  date: string;
  coordinates: string;
}

interface PhotoGalleryProps {
  photos: PhotoMetadata[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMetadata | null>(null);

  return (
    <>
      <Masonry columnsCount={3} gutter="8px">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative cursor-pointer group overflow-hidden rounded-sm"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-auto block transition-all duration-300 group-hover:scale-[1.02]"
            />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-sm" />
            </div>
          </div>
        ))}
      </Masonry>

      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </>
  );
}
