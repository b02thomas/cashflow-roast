"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

type Props = {
  logoUrl: string | null;
  brandColor: string;
  businessName: string;
  onLogoChange: (file: File) => void;
  onBrandColorChange: (color: string) => void;
};

const presetColors = [
  { name: "Trust Blue", hex: "#3B82F6" },
  { name: "Money Green", hex: "#22C55E" },
  { name: "Bold Black", hex: "#171717" },
  { name: "Royal Purple", hex: "#7C3AED" },
  { name: "Sunset Orange", hex: "#F97316" },
];

export function StepBrandKit({
  logoUrl,
  brandColor,
  businessName,
  onLogoChange,
  onBrandColorChange,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [customColor, setCustomColor] = useState("");

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onLogoChange(file);
      }
    },
    [onLogoChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoChange(file);
    }
  };

  const handleCustomColorSubmit = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
      onBrandColorChange(customColor);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Dress for the job you want.
        </motion.h1>
        <motion.p
          className="text-[var(--foreground)]/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Your brand kit makes your invoices look professional.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Inputs */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
              Logo
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : "border-[var(--foreground)]/20 hover:border-[var(--foreground)]/40"
              }`}
            >
              {logoUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="text-sm text-[var(--foreground)]/60">
                    Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 text-[var(--foreground)]/30 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-[var(--foreground)]/60">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
              Brand Color
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {presetColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => onBrandColorChange(color.hex)}
                  className={`w-12 h-12 rounded-lg transition-transform ${
                    brandColor === color.hex
                      ? "ring-2 ring-offset-2 ring-[var(--primary)] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] text-sm"
              />
              <button
                onClick={handleCustomColorSubmit}
                className="px-4 py-2 bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20 rounded-lg text-sm text-[var(--foreground)] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Invoice Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
            Preview
          </label>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div
              className="h-2"
              style={{ backgroundColor: brandColor }}
            />
            <div className="p-6">
              {/* Logo + Invoice */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Logo</span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {businessName || "Your Business"}
                    </div>
                    <div className="text-xs text-gray-500">Invoice #001</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Bill To</div>
                  <div className="font-medium text-gray-900">Acme Corp</div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Website Design</span>
                  <span className="text-gray-900">$2,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hosting Setup</span>
                  <span className="text-gray-900">$500</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium text-gray-900">Total</span>
                <span
                  className="font-bold text-lg"
                  style={{ color: brandColor }}
                >
                  $3,000
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
