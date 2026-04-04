"use client";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export default function PixelInit() {
  useEffect(() => {
    ReactPixel.init("1914627135842913");
    ReactPixel.pageView();
  }, []);

  return null;
}
