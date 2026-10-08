/**
 * Gallery content. To add an artwork: put the image in src/assets/images/gallery,
 * import it below and append an entry (width/height = the image's pixel size, used
 * for the aspect ratio so the masonry never shifts while images load).
 */
import koiFish from "../assets/images/gallery/koi-fish.webp";
import buddha from "../assets/images/gallery/buddha.webp";
import theyyam from "../assets/images/gallery/theyyam.webp";
import shiva from "../assets/images/gallery/shiva.webp";
import steamEngine from "../assets/images/gallery/steam-engine.webp";
import rickshaw from "../assets/images/gallery/rickshaw.webp";
import tajMahal from "../assets/images/gallery/taj-mahal.webp";
import sketchTower from "../assets/images/gallery/urban-sketch-tower.webp";
import musician from "../assets/images/gallery/musician-portrait.webp";
import sketchBridge from "../assets/images/gallery/urban-sketch-bridge.webp";
import sketchBanyan from "../assets/images/gallery/urban-sketch-banyan.webp";

/** Filter chips, in Figma order. */
export const CATEGORIES = [
  { id: "all", label: "All artworks" },
  { id: "painting", label: "Painting" },
  { id: "digital", label: "Digital Art" },
  { id: "pencil", label: "Pencil Drawing" },
  { id: "works", label: "Works" },
];

/** Order = reading order (left→right, top→bottom) of the masonry. */
export const ARTWORKS = [
  { id: "koi-fish", title: "Koi", category: "painting", src: koiFish, width: 683, height: 468, alt: "Painting of a swirl of orange, white and gold koi fish in deep blue water" },
  { id: "buddha", title: "Buddha", category: "pencil", src: buddha, width: 388, height: 533, alt: "Pencil drawing of a serene Buddha face with closed eyes" },
  { id: "theyyam", title: "Theyyam", category: "digital", src: theyyam, width: 388, height: 531, alt: "Theyyam performer in a red headdress rising out of bright flames" },
  { id: "shiva", title: "Shiva", category: "painting", src: shiva, width: 388, height: 472, alt: "Painting of a long-haired ascetic seen from behind, smoking a chillum beside a trident" },
  { id: "steam-engine", title: "Steam Engine", category: "pencil", src: steamEngine, width: 382, height: 468, alt: "Black and white drawing of a steam locomotive under a towering cloud of smoke" },
  { id: "rickshaw", title: "Rickshaw Puller", category: "pencil", src: rickshaw, width: 666, height: 468, alt: "Motion-blurred black and white drawing of a man pulling a hand rickshaw" },
  { id: "taj-mahal", title: "Taj in the Mist", category: "pencil", src: tajMahal, width: 789, height: 780, alt: "Misty monochrome scene of a camel and rider reflected in water before the Taj Mahal" },
  { id: "urban-sketch-tower", title: "Starbucks Cafe", category: "works", src: sketchTower, width: 644, height: 780, alt: "Ink urban sketch of a stacked high-rise tower above a Starbucks cafe" },
  { id: "musician-portrait", title: "Unplugged", category: "digital", src: musician, width: 373, height: 468, alt: "Portrait of a long-haired musician singing and playing an acoustic guitar" },
  { id: "urban-sketch-bridge", title: "The Bridge", category: "works", src: sketchBridge, width: 644, height: 468, alt: "Ink urban sketch of a concrete bridge with trees and stylised clouds" },
  { id: "urban-sketch-banyan", title: "Sasthamangalam Junction", category: "works", src: sketchBanyan, width: 644, height: 468, alt: "Ink urban sketch of a large banyan tree with hanging roots" },
];

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? "";
