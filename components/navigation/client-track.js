"use client";

import { websiteTrack } from "@/lib/api/api";
import { useEffect } from "react";

export default function ClientTracker() {
  useEffect(() => {
    // if (sessionStorage.getItem("visited")) return;

    // sessionStorage.setItem("visited", "true");

    websiteTrack({ type: "website_visit" });
  }, []);

  return null;
}
