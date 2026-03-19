"use client";

import { useEffect, useState } from "react";

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  pixelRatio: number;
  hardwareConcurrency: number;
  supportsWebGL2: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    pixelRatio: 1,
    hardwareConcurrency: 4,
    supportsWebGL2: true,
  });

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    // Check WebGL2 support
    let supportsWebGL2 = false;
    try {
      const canvas = document.createElement("canvas");
      supportsWebGL2 = !!canvas.getContext("webgl2");
    } catch {
      supportsWebGL2 = false;
    }

    // Detect low-end device
    const isLowEnd =
      hardwareConcurrency <= 2 ||
      (isMobile && pixelRatio < 2) ||
      !supportsWebGL2 ||
      // Check for memory constraints (if available)
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <
        4;

    setCapabilities({
      isMobile,
      isLowEnd,
      pixelRatio,
      hardwareConcurrency,
      supportsWebGL2,
    });
  }, []);

  return capabilities;
}
