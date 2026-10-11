import { useEffect, useState } from "react";
import type { CoverArt } from "../data/types";
import atlasUrl from "./assets/cover-atlas.webp";

/** Order of the seven artworks in the original ThreeUI cover atlas (512 × 768 each). */
const ART_INDEX: Record<CoverArt, number> = {
  chip: 0,
  paths: 1,
  cursor: 2,
  orbits: 3,
  target: 4,
  frames: 5,
  compass: 6,
};

const GOLD = "#D9B877";
const SHADOW = "#120A0D";

type Rgb = [number, number, number];

let atlasPromise: Promise<HTMLImageElement> | null = null;
const cache = new Map<string, Promise<string>>();

function loadAtlas() {
  atlasPromise ??= new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = atlasUrl;
  });
  return atlasPromise;
}

function hexToRgb(hex: string): Rgb {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16)) as Rgb;
}

function mix(a: Rgb, b: Rgb, amount: number): Rgb {
  return a.map((channel, index) => channel + (b[index] - channel) * amount) as Rgb;
}

/**
 * Recolours one artwork at the atlas's full resolution. The artwork's
 * background becomes the leather colour and its light shapes a soft gilt,
 * like tooling pressed into a dark binding, while mid-tones keep the shading.
 */
async function renderAtlasCover(art: CoverArt, color: string, mirror: boolean) {
  const atlas = await loadAtlas();
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.save();
  if (mirror) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(atlas, ART_INDEX[art] * 512, 0, 512, 768, 0, 0, 512, 768);
  ctx.restore();

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = image.data;
  const histogram = new Uint32Array(256);
  for (let pixel = 0; pixel < data.length; pixel += 4) {
    histogram[Math.round(data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722)] += 1;
  }
  // The most common brightness is the cover's background colour.
  let background = 0;
  for (let level = 1; level < 256; level += 1) {
    if (histogram[level] > histogram[background]) background = level;
  }
  background = Math.min(230, Math.max(20, background));

  const base = hexToRgb(color);
  const deep = mix(base, hexToRgb(SHADOW), 0.45);
  const light = mix(base, hexToRgb(GOLD), 0.58);
  for (let pixel = 0; pixel < data.length; pixel += 4) {
    const luminance = data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722;
    let rgb: Rgb;
    if (luminance <= background) {
      rgb = mix(deep, base, Math.pow(luminance / background, 0.6));
    } else {
      const t = Math.min(1, (luminance - background) / (255 - background) * 1.35);
      rgb = mix(base, light, Math.pow(t, 0.8));
    }
    data[pixel] = rgb[0];
    data[pixel + 1] = rgb[1];
    data[pixel + 2] = rgb[2];
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

/** Returns the cover artwork as an image URL, or null while it is prepared. */
export function useCoverArt(art: CoverArt | undefined, color: string, mirror = false) {
  const key = `${art}|${color}|${mirror}`;
  const [result, setResult] = useState<{ key: string; url: string } | null>(null);

  useEffect(() => {
    let active = true;
    if (!art) return;
    if (!cache.has(key)) {
      cache.set(key, renderAtlasCover(art, color, mirror));
    }
    cache
      .get(key)!
      .then((url) => {
        if (active) setResult({ key, url });
      })
      .catch(() => {
        // The plain cloth colour remains if the artwork cannot be prepared.
      });
    return () => {
      active = false;
    };
  }, [key, art, color, mirror]);

  return art && result?.key === key ? result.url : null;
}
