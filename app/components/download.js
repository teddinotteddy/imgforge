"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, CheckIcon } from "@radix-ui/react-icons";

export default function Download({ url }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setIsDownloaded(false); // Reset download status when starting a new download

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = url.split("/").pop();
      link.click();

      URL.revokeObjectURL(link.href);
      setIsDownloaded(true);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <Button
        size="icon"
        variant="outline"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? <CheckIcon /> : <DownloadIcon />}
      </Button>
    </div>
  );
}
