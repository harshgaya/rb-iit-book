"use client";

import { useEffect } from "react";

export default function PixelInit() {
  useEffect(() => {
    import("react-facebook-pixel").then((ReactPixel) => {
      ReactPixel.default.init("1914627135842913");
      ReactPixel.default.pageView();
    });
  }, []);

  return null;
}
