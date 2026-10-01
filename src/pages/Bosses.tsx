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
    name: "Chaos Elemental",
    worlds: "Worlds 1-4",
    hook: "Never quite where you left it, and neither are you.",
    hitpoints: 75,
    maxHits: "28 magic and ranged",
    attacks: [
      "Slow projectiles at its target. Prayer is checked when each one lands.",
      "**Discord** is magic. **Madness** is ranged, and 1 time in 3 knocks your weapon into your inventory.",
      "**Confusion** (1 attack in 4) deals no damage but **teleports you 5 to 20 tiles away**.",
    ],
    howTo:
      "Watch each projectile and switch prayer before it lands. Keep a spare weapon slot free in your head, and get back fast after a teleport.",
  },
  {
    name: "Commander Zilyana",
    worlds: "Worlds 1-4",
    hook: "Fast, and never in one place for long.",
    hitpoints: 77,
    maxHits: "31 melee, 20 magic",
    attacks: [
      "Runs at her target, and every 10 ticks **leaps 3 to 5 tiles away** before coming back.",
      "In melee reach she slashes, or 1 time in 3 casts magic on **every player within 10 tiles**.",
    ],
    howTo: "Chase her down after each leap, and keep Protect from Melee up while she's on you.",
  },
  {
    name: "Kree'arra",
    worlds: "Worlds 1-4",
    hook: "Flies too high for swords. Brings a gale.",
    hitpoints: 77,
    maxHits: "30 ranged, 24 magic",
    attacks: [
      "Ranged or magic at **every player in range**.",
      "His ranged gust **knocks you 2 tiles straight back**, unless something is behind you.",
      "**Melee deals 0**, except with a halberd.",
    ],
    howTo:
      "Bring ranged, magic or a halberd. Stand with your back to a wall and the gust can't move you.",
  },
  {
    name: "K'ril Tsutsaroth",
    worlds: "Worlds 1-4",
    hook: "YARRRRRRR!",
    hitpoints: 77,
    maxHits: "40 melee, 26 magic, 36 special",
    attacks: [
      "Slashes in melee reach, or fires magic at **every player in range**.",
      "1 attack in 5 in melee reach is his special: a hit **through protection prayers** that also **halves your prayer points**.",
    ],
    howTo: "Keep prayer potions handy, or fight him from range so his special never comes.",
  },
  {
    name: "Dagannoth Kings",
    worlds: "Worlds 2-4",
    hook: "Three kings, three styles, one weakness each.",
    hitpoints: 38,
    maxHits: "22 melee (Rex), 24 magic (Prime), 22 ranged (Supreme)",
    attacks: [
      "All three are summoned together. Hitpoints are each king's.",
      "Each resists every style but its weakness: **Rex is weak to magic, Prime to ranged, Supreme to melee**.",
      "Prime and Supreme attack **off-tick** from each other, so you can flick between Protect from Magic and Protect from Missiles.",
      "The kill only counts once all three are dead.",
    ],
    howTo: "Bring all three styles, or gear accurate enough to push through their defences.",
  },
  {
    name: "Kalphite Queen",
    worlds: "Worlds 1-4",
    hook: "Kill her once. Then kill her again.",
    hitpoints: 51,
    maxHits: "31 melee, 24 magic and ranged",
    attacks: [
      "Two forms with the hitpoints above each. When the first dies, **her second form rises** in its place.",
      "The first shows Protect from Magic and the second Protect from Melee. It doesn't block hits, but she has a **much higher defence** against that style.",
      "Bites or stings in melee reach, or fires magic or ranged at **every player in range**.",
    ],
    howTo: "Avoid magic on her first form and melee on her second. Ranged works on both.",
  },
  {
    name: "Alchemical Hydra",
    worlds: "Worlds 3-4",
    hook: "Three heads, two styles, and a lot of poison.",
    hitpoints: 132,
    maxHits: "28 magic and ranged, 10 poison per tick",
    attacks: [
      "Magic or ranged at its target, **switching every 3 attacks**.",
      "Every 5th attack spits poison at **every player in range**: your tile and three around it stay poisoned for 25 ticks.",
    ],
    howTo: "Count its attacks to switch prayers, and step off the poison straight away.",
  },
  {
    name: "Araxxor",
    worlds: "Worlds 3-4",
    hook: "Always enraged. Never stand still.",
    hitpoints: 133,
    maxHits: "38 melee, 30 acid splash, 8 acid per tick",
    attacks: [
      "Keeps walking at his target. In melee reach he mostly slams.",
      "Otherwise he fires acid at **every player in range**. It lands 3 ticks later on the 3x3 around where you stood.",
      "Splashed tiles **stay acid for 20 ticks**.",
    ],
    howTo: "Move off your tile as soon as he fires, and keep the fight away from his old acid.",
  },
  {
    name: "Phosani's Nightmare",
    worlds: "Worlds 3-4",
    hook: "She turns your prayers off. Turn them back on.",
    hitpoints: 144,
    maxHits: "36 melee, 30 magic and ranged",
    attacks: [
      "Melee in reach, or magic or ranged at **every player in range**.",
      "**As she starts an attack, if you're praying against its style, she turns that prayer off.**",
      "The attack lands 3 ticks later, when your prayer is checked.",
    ],
    howTo: "When your prayer goes off, click it straight back on before her attack lands.",
  },
  {
    name: "Corrupted Hunllef",
    worlds: "Worlds 3-4",
    hook: "Count to three, switch, repeat.",
    hitpoints: 140,
    maxHits: "30 magic and ranged, 40 stomp, 25 tornado",
    attacks: [
      "Ranged or magic at his target, **switching every 3 attacks**.",
      "If you stand under him he **stomps** everyone under him instead.",
      "Below a third of his hitpoints he may summon **3 tornadoes for every player**. They chase you for 25 ticks, and he can't summon more while any are out.",
    ],
    howTo: "Count his attacks to switch prayers, never stand under him, and keep moving while tornadoes are out.",
  },
  {
    name: "Vardorvis",
    worlds: "Worlds 3-4",
    hook: "Gets stronger the longer you take.",
    hitpoints: 140,
    maxHits: "30 melee (growing), 26 heads, 34 axes",
    attacks: [
      "Walks at his target and slashes. His melee grows **5% every 10 ticks**, up to double.",
      "Every 3rd attack, and any out of melee reach, is a **head**: a slow ranged or magic projectile, prayer checked as it lands.",
      "Every 15 ticks he throws **axes** that spin straight across the arena past him, hitting anyone in their path.",
    ],
    howTo: "Kill him fast, step out of the axes' path, and watch each head's colour to pick your prayer.",
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
        Each boss has its own <Link to="/achievements">combat achievements</Link>, and every boss but
        the Rabbit has a pet (the Dagannoth Kings have three) for completing them all.
      </p>
    </>
  );
}
