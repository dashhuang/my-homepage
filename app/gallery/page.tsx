import photoData from "../../public/photos-data.json";
import GalleryClient from "./GalleryClient";
import type { PhotoSets } from "./gallery-api";

export default function Gallery() {
  return <GalleryClient photoSets={photoData as PhotoSets} />;
}
