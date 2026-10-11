/**
 * Studio objects for the shelves. Each is a transparent image cut from the
 * Plum Studio reference renders (see assets/decor). All decorative.
 */
import blackQuarter from "./assets/decor/black-quarter.webp";
import brassArch from "./assets/decor/brass-arch.webp";
import brassSet from "./assets/decor/brass-set.webp";
import burgundyPlant from "./assets/decor/burgundy-plant.webp";
import lavenderVase from "./assets/decor/lavender-vase.webp";
import paintingBotanical from "./assets/decor/painting-botanical.webp";
import paintingLandscape from "./assets/decor/painting-landscape.webp";
import penCup from "./assets/decor/pen-cup.webp";
import stoneCylinder from "./assets/decor/stone-cylinder.webp";
import stoneSphere from "./assets/decor/stone-sphere.webp";

function DecorImage({ src, width, height, name }: { src: string; width: number; height: number; name: string }) {
  return (
    <img
      className={`decor decor--${name}`}
      src={src}
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
    />
  );
}

export function BrassSet() {
  return <DecorImage src={brassSet} width={246} height={183} name="brass-set" />;
}

export function LavenderVase() {
  return <DecorImage src={lavenderVase} width={189} height={507} name="vase" />;
}

export function StoneCylinder() {
  return <DecorImage src={stoneCylinder} width={117} height={283} name="cylinder" />;
}

export function BlackMarbleQuarter() {
  return <DecorImage src={blackQuarter} width={182} height={315} name="quarter" />;
}

export function StoneSphere() {
  return <DecorImage src={stoneSphere} width={185} height={191} name="stone-sphere" />;
}

export function MarbleArch() {
  return <DecorImage src={brassArch} width={134} height={283} name="arch" />;
}

export function PenCup() {
  return <DecorImage src={penCup} width={205} height={452} name="cup" />;
}

export function BurgundyPlant() {
  return <DecorImage src={burgundyPlant} width={219} height={540} name="plant" />;
}

/**
 * The room behind a chapter: a plum plaster wall between walnut pilasters,
 * lit from above. `art` hangs two framed pictures under brass picture lights
 * on the pilasters (shown only where the pilasters are wide enough).
 */
export function Room({ art = false }: { art?: boolean }) {
  return (
    <div className="room" aria-hidden="true">
      {art && (
        <>
          <span className="room__piece room__piece--left">
            <span className="room__lamp" />
            <img src={paintingLandscape} width={166} height={251} alt="" draggable={false} decoding="async" />
          </span>
          <span className="room__piece room__piece--right">
            <span className="room__lamp" />
            <img src={paintingBotanical} width={155} height={243} alt="" draggable={false} decoding="async" />
          </span>
        </>
      )}
    </div>
  );
}
