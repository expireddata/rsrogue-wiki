import { useState } from "react";
import Md from "../Md";
import gear from "../data/gear.json";

type Gear = { style: string; sets: { name: string; items: string[] }[]; singles: string[] };
const styles = gear as Gear[];

const intro = `
Chests are opened with keys dropped by npcs. Each chest offers **three rewards**, rolled up front
so you can see what you are picking. Every option is independently one of:

- a **modifier** (see [Modifiers](#/modifiers)),
- **gear** you can wear with your current levels (below),
- an **xp lamp** (scales with danger level and your xp rate) or an **xp rate boost**.

Duplicate options are re-rolled. The key you use decides the odds, and the key is only used up
once you take a reward. Closing the menu or walking to another chest never re-rolls your offers.

| | Bloody key | Bloodier key |
|---|---|---|
| Drop chance (per kill) | 12% | 3% |
| Option is a modifier / gear / xp | 35% / 15% / 50% | 45% / 30% / 25% |
| Modifier is common / rare / special | 78% / 20% / 2% | 25% / 60% / 15% |
| XP lamp (per danger level) | 2,000 xp | 5,000 xp |
| XP rate boost | +20x | +50x |

Holding both keys lets you pick which to use. The **starter key** every run begins with is always
used first: instead of the usual rewards, you choose a combat style and get its kit.

## Starter kits

Each style's skills and Defence are raised to level 20.

- **Melee:** bronze full helm, platebody, platelegs, kiteshield and scimitar.
- **Ranged:** leather body, leather chaps, shortbow and bronze arrows.
- **Magic:** blue wizard hat, robe and skirt, and a staff of air.

Ammunition is never used up and spells need no runes.

## Where the chests are

The Deserted Island and Wild Varrock come with their own chests. Every other map (bar the final
one) gets chests placed at the start of each world, bunched into pockets of 3 to 6, indoors if the
map has any. **Supply crates** (5 per world, "Search", no key needed) give 3 rolls each: a
1-in-100 arcane grimoire, 1-in-50 prayer unlocks (Preserve, Chivalry, Piety, Rigour, Augury),
1-in-20 a supply lamp (1k xp), otherwise gear or a [gear upgrade](#/upgrades), never xp. Crates
never give modifiers: those are always your pick from a key chest.

## How gear is chosen

- A gear reward picks a **style** first. Your starter style is **6 times** as likely as each other
  style, so melee's longer list doesn't crowd out ranged and magic.
- **Mid-tier gear** is offered as a whole set. **Best-in-slot gear** comes one piece at a time.
- Ranged weapons come with 100 of their ammo. Blowpipes need none: they always fire dragon darts.
- If nothing is wearable yet, options are never gear.
- Powered staves (trident of the seas and swamp, sanguinesti, Tumeken's shadow) cast without
  charges. Many special attacks work, but not all of them are implemented.
- Combining jewellery is a reward for collecting gear of every style: four imbued Dagannoth Kings
  rings make an emperor ring, and so on. See the gear notes in the game source for details.
`;

export default function Chests() {
  const [style, setStyle] = useState("Melee");
  const g = styles.find((s) => s.style === style)!;
  return (
    <>
      <h1>Chests &amp; gear</h1>
      <Md>{intro}</Md>
      <h2>Gear a chest can offer</h2>
      <div className="filters">
        {styles.map((s) => (
          <button key={s.style} className={s.style === style ? "on" : ""} onClick={() => setStyle(s.style)}>
            {s.style}
          </button>
        ))}
      </div>
      <h3>Whole sets ({g.sets.length})</h3>
      <div className="cards grid">
        {g.sets.map((s) => (
          <div className="card" key={s.name}>
            <div className="card-title">{s.name}</div>
            <div className="muted">{s.items.join(", ")}</div>
          </div>
        ))}
      </div>
      <h3>Single items ({g.singles.length})</h3>
      <ul className="chips">
        {g.singles.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </>
  );
}
