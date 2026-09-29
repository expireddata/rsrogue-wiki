import Md from "../Md";

type Boss = {
  name: string;
  from: string;
  attacks: string[];
  tips: string;
};

const bosses: Boss[] = [
  {
    name: "TzTok-Jad",
    from: "World 1",
    attacks: [
      "Picks at random: magic or ranged at a distance, and melee, magic or ranged in melee reach.",
      "Magic and ranged hit every player within 12 tiles, each with their own projectile. They land 3 cycles after the animation, like the Fight Caves, so you can switch protection prayers. Melee hits at once.",
    ],
    tips: "Protection prayers block his attacks completely. Prayer is always the second skill offered by xp lamps for this reason.",
  },
  {
    name: "General Graardor",
    from: "World 1",
    attacks: [
      "Walks up and melees like any melee npc.",
      "One attack in 3 is a ranged attack that hits every player within 10 tiles.",
    ],
    tips: "He only attacks once he reaches his target, so kiting him means he never attacks at all.",
  },
  {
    name: "The Rabbit",
    from: "World 1",
    attacks: ["Bites every 2 cycles for up to 20. Melee only."],
    tips: "Shown as level 2 whatever its stats, and it has far less health than the other bosses. Do not underestimate it.",
  },
  {
    name: "Scurrius",
    from: "World 1",
    attacks: [
      "Keeps running at his target while he attacks.",
      "From a distance, a slow magic or ranged projectile at every player in range (10). Prayers are checked when it lands, so you can switch while it flies.",
      "In melee reach, slams every player next to him.",
    ],
    tips: "He has no defend animation, so he never flinches.",
  },
  {
    name: "Nex",
    from: "World 3",
    attacks: [
      "Magic (a smoke cloud at every player in range) from a distance, melee or magic up close.",
      "She protects against the last style that hit her, shown by an overhead prayer: hits of that style deal 0. She switches after each hit.",
      "Every 4th attack is a special: Cough or Shadows.",
      "Cough: infects a player, who coughs 5 times, lowering their combat stats a little each time. Every cough infects living members within 1 tile.",
      "Shadows: a shadow appears under every player in range. 4 cycles later anyone still standing on one takes a big typeless hit.",
    ],
    tips: "Mix your attack styles to get around her prayer, spread out to avoid coughs and step off shadows.",
  },
  {
    name: "Verzik Vitur",
    from: "World 5 (final)",
    attacks: [
      "Magic or ranged at random at every player in range (10), a projectile that takes 3 cycles to land at any distance. Prayers are checked on impact.",
      "If her target is in direct melee range, she stomps instead: a typeless hit on every living member that prayer does not block.",
      "She walks at her target as she attacks, and can attack someone standing under her.",
      "Below 20% hitpoints she sends a tornado after every living member. It walks to where you were standing, so a player who keeps moving is never caught.",
    ],
    tips: "Her summon tiles are marked with Theatre of Blood floor tiles. She takes 0 damage while she is off them. Defeating her completes the run.",
  },
];

const intro = `
Every world ends with a boss fight.

1. A **summoning altar** is placed somewhere on the map. Use it (after a confirm) to summon a random
   boss. Bones can be offered on it for 2.5x prayer xp, but only until the boss is summoned.
2. A new boss waits **5 cycles** before its first attack, so you can back off and get ready.
3. Bosses are strong: their stats are cut down to a fraction of the real ones, then **scaled up by
   difficulty** and by team size, so later worlds and bigger teams are tougher.
4. Defeat the boss and every other npc on the island dies. The director pauses, every member gets a
   **35k xp lamp** (times their xp rate), and the boss drops 3 pieces of equipment and 3 solid food.
   Every member also gets a **bloodier key** and one of each [gear upgrade](#/upgrades), dropped
   under them. A **portal** and a **wandering trader** appear (see
   [Trader](#/trader)). Enter the portal to take the whole team to the next world.

Worlds 1-2 can summon TzTok-Jad, General Graardor, the Rabbit or Scurrius. From world 3, Nex
joins the pool. **World 5** always summons Verzik Vitur, and beating her completes the run.

Each boss has its own [combat achievements](#/achievements).
`;

export default function Bosses() {
  return (
    <>
      <h1>Bosses</h1>
      <Md>{intro}</Md>
      <div className="cards">
        {bosses.map((b) => (
          <div className="card boss" key={b.name}>
            <div className="card-head static">
              <span className="card-title">{b.name}</span>
              <span className="tag">{b.from}</span>
            </div>
            <div className="card-body">
              <ul>
                {b.attacks.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="muted">{b.tips}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
