import { useState } from "react";
import { Link } from "react-router-dom";
import Md from "../Md";
import Sprite from "../Sprite";
import gear from "../data/gear.json";

type Gear = { style: string; sets: { name: string; items: string[] }[]; singles: string[] };
const styles = gear as Gear[];

const odds = `
| | Bloody key | Bloodier key |
|---|---|---|
| Drops from | 12% of kills | 3% of kills |
| Option is a modifier / gear / xp | 35% / 15% / 50% | 45% / 30% / 25% |
| Modifier is common / rare / special | 78% / 20% / 2% | 25% / 60% / 15% |
| XP lamp | 2,000 xp per danger level | 5,000 xp per danger level |
| XP rate boost | +20x | +50x |

Lamps are multiplied by your xp rate. At danger level 1 and 100x, a bloody key lamp is 200,000
xp: enough to take a skill from 1 to 57 in one click.
`;

const rules = `
- **You see all three rewards before choosing.** Each one is a [modifier](#/modifiers), gear you
  can wear right now, an xp lamp or an xp rate boost. No duplicates.
- **The key is only used when you take a reward.** Close the menu or walk to another chest and the
  same three are waiting. Re-rolling isn't possible.
- **The fight doesn't stop.** The chest menu sits over the game, so you can still move, eat, pray
  and attack. It closes if you walk more than 6 tiles from the chest.
- Holding both keys? Pick which to use first. An opened chest stays open until you leave the world.
`;

const crates = `
Every map has **5 supply crates**, spread far apart. Search one (no key needed) and it's gone,
leaving you 3 rolls:

| Chance | Reward |
|---|---|
| 1 in 100 | **Arcane grimoire**: switch between all four spellbooks |
| 1 in 50 | **Prayer unlocks**: Preserve, Chivalry, Piety, Rigour and Augury |
| 1 in 20 | **Supply lamp**: 1,000 xp times your xp rate |
| Otherwise | Gear, or a [gear upgrade](#/upgrades) |

Crates never give modifiers. Those only come from key chests, where you choose.
`;

const howGear = `
- A gear reward picks a style first. **Your starter style is 6x as likely** as each of the others
  (75% vs 12.5%), however many items each style has.
- **Mid-tier gear comes as a whole set:** granite, barrows, the moon sets, Karil's, Ahrim's,
  masori and more. **Best-in-slot gear** comes one piece at a time.
- Ranged weapons come with **100 ammo**, which is never used up. Blowpipes need none: they always
  fire dragon darts.
- If you can't wear anything on the list yet, you won't be offered gear.
`;

const gearNotes = `
- **Charges are unlimited.** The tridents, sanguinesti staff and Tumeken's shadow never run dry.
  The swamp trident poisons 1 hit in 4, and the sanguinesti staff heals half a hit's damage 1 time
  in 6.
- **Osmumten's fang and the drygore blowpipe** roll accuracy twice and keep the better roll.
- **Confliction gauntlets** give your next magic attack two accuracy rolls after a miss on the same
  target (one-handed weapons only).
- **Tome of fire:** fire spells deal 40% more to monsters.
- **Chinchompas** hit every monster around the target.
- **Lightbearer** doubles special attack regeneration.
- **Special attacks** work for the dragon longsword, dagger, warhammer and claws, dragon knives,
  all five godswords, the toxic blowpipe, dark bow, voidwaker, thunder khopesh and Zaryte
  crossbow. Other weapons' specs aren't in yet.

### Combining gear

Collect a full set, use one piece on another, and they fuse:

| Pieces | Result |
|---|---|
| Berserker, warrior, archers and seers rings (i) | Emperor ring |
| Bellator, magus, venator and ultor rings | Ring of shadows (twice the emperor ring's stats) |
| Amulet of rancour or torture, necklace of anguish, occult necklace | Amulet of the monarchs |
| A masori piece and its Armadyl piece | Fortified masori (f) |
`;

export default function Chests() {
  const [style, setStyle] = useState("Melee");
  const g = styles.find((s) => s.style === style)!;
  return (
    <>
      <h1>Chests &amp; gear</h1>
      <p className="lede">
        Keys open chests. Every chest offers three rewards and you keep one. This is where your
        build comes from.
      </p>

      <h2>Keys</h2>
      <div className="pair">
        <div className="pick">
          <Sprite name="bloody_key" />
          <div>
            <b>Bloody key</b>
            <p>Common. Leans towards xp and common modifiers.</p>
          </div>
        </div>
        <div className="pick">
          <Sprite name="bloodier_key" />
          <div>
            <b>Bloodier key</b>
            <p>Rare. Leans towards rare modifiers, gear, and bigger lamps and rate boosts.</p>
          </div>
        </div>
      </div>
      <Md>{odds}</Md>

      <h2>Opening a chest</h2>
      <Md>{rules}</Md>

      <h2>Starter kits</h2>
      <p>
        Every run starts with a <b>starter key</b>, used before any other key. It opens any chest
        and gives you a kit instead, plus level 20 in that style's skills and Defence.
      </p>
      <div className="pair">
        {[
          ["melee_style", "Melee", "Bronze full helm, platebody, platelegs, kiteshield and scimitar"],
          ["ranged_style", "Ranged", "Leather body and chaps, a shortbow and bronze arrows"],
          ["magic_style", "Magic", "Blue wizard hat, robe and skirt, and a staff of air"],
        ].map(([sprite, name, kit]) => (
          <div className="pick" key={name}>
            <Sprite name={sprite} />
            <div>
              <b>{name}</b>
              <p>{kit}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="muted">
        Win world 1 with a style to unlock its gold-trimmed kit (
        <Link to="/achievements">achievements</Link>).
      </p>

      <h2>Supply crates</h2>
      <Md>{crates}</Md>

      <h2>How gear is picked</h2>
      <Md>{howGear}</Md>

      <h2>Gear with a twist</h2>
      <Md>{gearNotes}</Md>

      <h2>Every piece a chest can offer</h2>
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
