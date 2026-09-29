import Md from "../Md";

type GameMap = {
  name: string;
  pool: "Early" | "Late" | "Final";
  roster: string;
  notes: string;
};

const maps: GameMap[] = [
  {
    name: "The Deserted Island",
    pool: "Early",
    roster: "Goblins, giant rats, frogs and muggers, then wizards, druids, archers and necromancers",
    notes:
      "The Last Man Standing island, with 109 chests of its own. To cross the river in the south, take a rope from the pile on either bank and use it on the rock across the water.",
  },
  {
    name: "Wild Varrock",
    pool: "Early",
    roster: "Goblins, giant rats, frogs and muggers, then wizards, druids, archers and necromancers",
    notes: "The other Last Man Standing map, with chests of its own.",
  },
  {
    name: "Falador",
    pool: "Early",
    roster: "Townsfolk, dwarves, guards, crossbowmen, White and Black Knights",
    notes: "Everything inside the city walls. The gaps are gated shut, so nobody gets out.",
  },
  {
    name: "Zanaris",
    pool: "Early",
    roster: "Imps and fairy cows, then rock golems, tree spirits, river trolls and tanglefeet",
    notes: "The fairy city. On the way to the cosmic altar, you can squeeze past two jutting walls.",
  },
  {
    name: "Castle Wars",
    pool: "Late",
    roster: "Saradomin and Zamorak knights, monks, battle mages and spiritual followers",
    notes: "Only the battlefield between the castles. A small map, so fewer monsters at once, and they reach you sooner.",
  },
  {
    name: "Mor Ul Rek",
    pool: "Late",
    roster: "The TzHaar castes and the Fight Caves' monsters",
    notes: "The TzHaar city under the volcano. Tok-Xil and TzHaar-Xil throw from range, and TzHaar-Mej cast.",
  },
  {
    name: "The Catacombs of Kourend",
    pool: "Late",
    roster: "Undead and demons",
    notes:
      "The western half of the maze. Stepping stones in the north-west, and two pairs of cracks (south and north-east) to squeeze through.",
  },
  {
    name: "The King Black Dragon's lair",
    pool: "Final",
    roster: "Nothing spawns. Only Verzik.",
    notes: "World 5 only. Verzik Vitur's altar waits in the middle of the lair.",
  },
];

const intro = `
Every world is a fresh copy of a real Gielinor map, for your team alone, with every chest closed
again. Each world picks at random from its pool, never the map you just left.

- **Worlds 1-2:** an early map.
- **Worlds 3-4:** a late map.
- **World 5:** the King Black Dragon's lair, always.

Every door, gate, ladder and staircase is removed. Monsters can follow you into any building, and
nobody can climb out of reach. Shortcuts need no Agility level, and monsters can always get
around them on foot. Smaller maps get fewer monsters at once (see [Danger](#/director)).

**Chests.** The two Last Man Standing maps have their own. Every other map gets one chest per 140
walkable tiles (12 to 100), in sheltered clusters of 3-6, indoors where there's room. Each map
also has **5 supply crates**, spread far apart.
`;

const poolLabel = { Early: "worlds 1-2", Late: "worlds 3-4", Final: "world 5" };

export default function Maps() {
  return (
    <>
      <h1>Maps</h1>
      <Md>{intro}</Md>
      {(["Early", "Late", "Final"] as const).map((pool) => (
        <section key={pool}>
          <h2>
            {pool} maps <span className="muted small">{poolLabel[pool]}</span>
          </h2>
          <div className="cards grid">
            {maps
              .filter((m) => m.pool === pool)
              .map((m) => (
                <div className="card" key={m.name}>
                  <div className="card-title">{m.name}</div>
                  <p className="muted">{m.notes}</p>
                  <p>
                    <span className="tag blood">Enemies</span> {m.roster}
                  </p>
                </div>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
