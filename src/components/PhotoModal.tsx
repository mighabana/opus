import { X, MapPin, Calendar, Camera, Aperture, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

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

interface PhotoModalProps {
  photo: PhotoMetadata | null;
  onClose: () => void;
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  // Mock histogram data
  const histogramData = [
    { x: 0, red: 45, green: 32, blue: 28 },
    { x: 32, red: 68, green: 52, blue: 45 },
    { x: 64, red: 92, green: 78, blue: 65 },
    { x: 96, red: 88, green: 95, blue: 82 },
    { x: 128, red: 75, green: 98, blue: 88 },
    { x: 160, red: 62, green: 85, blue: 92 },
    { x: 192, red: 48, green: 65, blue: 78 },
    { x: 224, red: 35, green: 42, blue: 58 },
    { x: 255, red: 22, green: 28, blue: 35 },
  ];

  // Mock exposure data
  const exposureData = [
    { stop: "-2", value: 15 },
    { stop: "-1", value: 35 },
    { stop: "0", value: 85 },
    { stop: "+1", value: 45 },
    { stop: "+2", value: 20 },
  ];

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="w-full h-full flex items-center justify-center gap-0">
          {/* Image Container - 64% width */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="h-full flex items-center justify-center"
            style={{ width: "64%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>

          {/* Metadata Panel - 36% width */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="h-full bg-zinc-900 border-l border-zinc-800 overflow-y-auto"
            style={{ width: "36%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white mb-1">{photo.title}</h2>
                  <p className="text-zinc-400">{photo.resolution}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <p className="text-white">{photo.location}</p>
                <p className="text-zinc-500">{photo.coordinates}</p>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <span>Captured</span>
                </div>
                <p className="text-white">{photo.date}</p>
              </div>

              {/* Camera Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Camera className="w-4 h-4" />
                  <span>Equipment</span>
                </div>
                <p className="text-white">{photo.camera}</p>
                <p className="text-zinc-400">{photo.lens}</p>
              </div>

              {/* Settings */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Aperture className="w-4 h-4" />
                  <span>Camera Settings</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-800/50 p-3 rounded-lg">
                    <p className="text-zinc-400">Aperture</p>
                    <p className="text-white">{photo.settings.aperture}</p>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-lg">
                    <p className="text-zinc-400">Shutter</p>
                    <p className="text-white">{photo.settings.shutterSpeed}</p>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-lg">
                    <p className="text-zinc-400">ISO</p>
                    <p className="text-white">{photo.settings.iso}</p>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-lg">
                    <p className="text-zinc-400">Focal Length</p>
                    <p className="text-white">{photo.settings.focalLength}</p>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-4 h-4" />
                  <span>File Information</span>
                </div>
                <div className="bg-zinc-800/50 p-3 rounded-lg space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Size</span>
                    <span className="text-white">{photo.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Format</span>
                    <span className="text-white">JPEG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Color Space</span>
                    <span className="text-white">sRGB</span>
                  </div>
                </div>
              </div>

              {/* RGB Histogram */}
              <div className="space-y-3">
                <p className="text-zinc-400">RGB Histogram</p>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={histogramData}>
                      <XAxis dataKey="x" stroke="#71717a" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                      <Bar dataKey="red" fill="#ef4444" opacity={0.6} />
                      <Bar dataKey="green" fill="#22c55e" opacity={0.6} />
                      <Bar dataKey="blue" fill="#3b82f6" opacity={0.6} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Exposure Distribution */}
              <div className="space-y-3">
                <p className="text-zinc-400">Exposure Distribution</p>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={exposureData}>
                      <XAxis dataKey="stop" stroke="#71717a" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: "#8b5cf6", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Close button overlay */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
