import { Link } from "react-router-dom";
import Md from "../Md";

type Boss = {
  name: string;
  worlds: string;
  hook: string;
  hitpoints: number;
  maxHits: string;
  attacks: string[];
  howTo: string;
};

// Hitpoints and max hits at danger level 1, solo (see BossScaling and each boss's attack script).
const bosses: Boss[] = [
  {
    name: "TzTok-Jad",
    worlds: "Worlds 1-4",
    hook: "Pray right or go home. His ranged and magic hit the whole team.",
    hitpoints: 105,
    maxHits: "97 melee and ranged, 95 magic",
    attacks: [
      "From a distance he picks magic or ranged. In melee reach he can also melee.",
      "Magic and ranged hit **every player within 12 tiles**, each with their own roll.",
      "They land **3 ticks after his animation**, like in the Fight Caves. Melee lands at once.",
    ],
    howTo:
      "Stay out of melee reach so he can only use magic or ranged, then read his animation and switch prayer.",
  },
  {
    name: "General Graardor",
    worlds: "Worlds 1-4",
    hook: "Hits like a falling wall, if he ever reaches you.",
    hitpoints: 77,
    maxHits: "60 melee, 35 ranged",
    attacks: [
      "Walks up to his target and melees.",
      "One attack in 3 is ranged instead, hitting **every player within 10 tiles**.",
    ],
    howTo:
      "He only attacks once he's reached his target. Kite him and he never attacks at all, ranged included.",
  },
  {
    name: "The Rabbit",
    worlds: "Worlds 1-4",
    hook: "Level 2. Don't laugh.",
    hitpoints: 120,
    maxHits: "20 melee",
    attacks: ["Bites every **2 ticks** for up to 20. That's it. It's enough."],
    howTo:
      "Protect from Melee blocks every bite. It has more hitpoints than Jad, so bring food in case your prayer runs dry.",
  },
  {
    name: "Scurrius",
    worlds: "Worlds 1-4",
    hook: "A rat the size of a house that never stops running at you.",
    hitpoints: 120,
    maxHits: "22 melee, 18 ranged and magic",
    attacks: [
      "Keeps running at his target while he attacks.",
      "From a distance: a slow magic or ranged projectile at **every player within 10 tiles**.",
      "In melee reach: slams **every player next to him**.",
      "Never flinches when hit.",
    ],
    howTo:
      "Your prayer is checked when each projectile lands, so you have time to switch after you see which one he threw.",
  },
  {
    name: "Nex",
    worlds: "Worlds 3-4",
    hook: "Punishes teams that only know one style.",
    hitpoints: 136,
    maxHits: "30 melee and magic, 50 shadows",
    attacks: [
      "From a distance: a smoke cloud at every player in range. Up close: melee or magic.",
      "**Her prayer follows your damage.** She protects against the last style that hit her, and hits of that style deal 0. Her overhead shows which.",
      "Every 4th attack is a special:",
      "**Cough:** infects a player. They cough every 4 ticks, 5 times, losing a little Attack, Strength, Defence, Ranged and Magic each time. Each cough infects anyone within 1 tile.",
      "**Shadows:** a shadow appears under every player in range. Anyone still on one 4 ticks later takes 25-50 damage that prayer can't block.",
    ],
    howTo:
      "Alternate styles, spread out when someone coughs, and step off shadows the moment they appear.",
  },
  {
    name: "Verzik Vitur",
    worlds: "World 5",
    hook: "The final boss. Beat her and the run is won.",
    hitpoints: 210,
    maxHits: "40 magic and ranged, 25 stomp",
    attacks: [
      "Magic or ranged at **every player within 10 tiles**, landing 3 ticks later at any range. Prayer is checked when it lands.",
      "If her target stands next to one of her sides, she **stomps** instead: a hit on the whole team that prayer can't block.",
      "She walks at her target as she attacks, and can hit you while you stand under her.",
      "**She only takes damage on her own floor.** Her summon tiles are marked with Theatre of Blood tiles. Drag her off them and every hit deals 0.",
      "**Tornadoes** below 20% hitpoints: one chases every player, and a new one comes every 20 ticks for anyone without one. A tornado that catches you takes half your life points and heals her 3x that.",
    ],
    howTo:
      "Keep her on her tiles and pray against her projectiles. In the last 20%, never stand still: tornadoes walk to where you were, so a moving target is never caught.",
  },
];

const intro = `
Every world ends in a boss fight, and you choose when it starts.

1. **Find the altar.** Every map has a summoning altar somewhere. Offer bones on it first for
   2.5x Prayer xp, because it disappears once you summon.
2. **Summon.** A random boss appears (Verzik Vitur in world 5). It waits **5 ticks** before
   attacking, so step back and set your prayers.
3. **Kill it.** Every other monster on the map dies with it, and the danger clock stops.
4. **Collect.** Each member gets a 3.5 million xp lamp at 100x, a bloodier key and three
   [upgrade items](#/upgrades). A portal and a [wandering trader](#/trader) appear. Take the
   portal when the whole team is ready: it moves everyone to the next world, and revives ghosts.

Boss stats grow with the danger level at the moment you summon, and with your team size. The
numbers below are at danger level 1 for a solo player. Hitpoints and max hits go up **55% per
danger level** above that. Each extra teammate adds **50% hitpoints** and **10%** to max hits and
accuracy.
`;

export default function Bosses() {
  return (
    <>
      <h1>Bosses</h1>
      <Md>{intro}</Md>
      <div className="cards">
        {bosses.map((b) => (
          <section className="card boss" key={b.name}>
            <div className="boss-top">
              <h2>{b.name}</h2>
              <span className={"tag " + (b.worlds === "World 5" ? "blood" : "gold")}>{b.worlds}</span>
              <p className="boss-quote">{b.hook}</p>
            </div>
            <div className="statline">
              <div>
                <b>{b.hitpoints}</b>
                <span>Hitpoints</span>
              </div>
              <div style={{ flexGrow: 3 }}>
                <b>{b.maxHits}</b>
                <span>Max hits</span>
              </div>
            </div>
            <div className="boss-body">
              <ul>
                {b.attacks.map((a) => (
                  <li key={a}>
                    <Md inline>{a}</Md>
                  </li>
                ))}
              </ul>
              <div className="howto">
                <b>How to win:</b> {b.howTo}
              </div>
            </div>
          </section>
        ))}
      </div>
      <p className="muted" style={{ marginTop: "1.5rem" }}>
        Each boss has its own <Link to="/achievements">combat achievements</Link>, and four of them
        have a pet for completing them all.
      </p>
    </>
  );
}
