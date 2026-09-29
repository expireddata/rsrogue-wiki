/** One of the game's chest card sprites (copied into public/sprites by `npm run sync`). */
export default function Sprite({ name, alt = "", size }: { name: string; alt?: string; size?: number }) {
  return (
    <img
      className="sprite"
      src={`${import.meta.env.BASE_URL}sprites/${name}.png`}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}

/** The sprite name of a modifier: its name in snake case ("Osmumten's champion" → osmumtens_champion). */
export const spriteOf = (name: string) =>
  name.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
