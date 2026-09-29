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
    roster: "Wilderness: goblins, rats, frogs, muggers, wizards and archers",
    notes:
      "The Last Man Standing island. Comes with 109 loot chests of its own, and a river crossing in the south: take a rope from the pile on either bank and use it on the rock on the other side.",
  },
  {
    name: "Wild Varrock",
    pool: "Early",
    roster: "Wilderness",
    notes: "The other Last Man Standing map, with its own loot chests.",
  },
  {
    name: "Falador",
    pool: "Early",
    roster: "Townsfolk, dwarves, guards, crossbowmen, White and Black Knights",
    notes:
      "The city inside its walls. Gaps in the wall are closed with city gates, so nobody can leave.",
  },
  {
    name: "Zanaris",
    pool: "Early",
    roster: "Fairy guardians: tree spirits, river trolls, rock golems, tanglefeet",
    notes: "Two jutting walls on the way to the cosmic altar can be squeezed past.",
  },
  {
    name: "Castle Wars",
    pool: "Late",
    roster: "Saradomin against Zamorak: knights, monks, battle mages and spiritual followers",
    notes: "Only the battlefield between the two castles is playable.",
  },
  {
    name: "Mor Ul Rek",
    pool: "Late",
    roster: "The TzHaar castes and the Fight Cave's monsters",
    notes: "The TzHaar city under the volcano.",
  },
  {
    name: "The Catacombs of Kourend",
    pool: "Late",
    roster: "Undead and demons",
    notes:
      "The western part of the maze. Has stepping stones in the north-west and two pairs of cracks (south and north-east) to squeeze through.",
  },
  {
    name: "The King Black Dragon's lair",
    pool: "Final",
    roster: "None: the director spawns nothing",
    notes: "World 5 only. An empty cave where you face Verzik Vitur.",
  },
];

const intro = `
Every world is played in its own **fresh instance** of a real map, so every chest is closed again
and nobody outside your team is there. Each world picks a map at random from its pool, and never
the one you just left.

| Worlds | Pool |
|---|---|
| 1-2 | Early |
| 3-4 | Late |
| 5 | Final (the King Black Dragon's lair) |

**Chests and crates.** Maps other than the two Last Man Standing ones get chests placed when the
world starts, one per 140 walkable tiles (12 to 100), bunched into sheltered pockets of 3 to 6.
5 supply crates are spread out across every map.

**Doors and stairs.** Closed doors, gates, ladders and staircases are removed, so buildings are
open, npcs can path into them and nobody can climb out of reach.

**Shortcuts.** A few maps have shortcuts that need no Agility level. They only join parts of the
map already connected on foot, so npcs can always follow you.

**Map size and difficulty.** Smaller maps get a smaller director (see
[Difficulty & worlds](#/director)), so Castle Wars is not as crowded as Wild Varrock.
`;

export default function Maps() {
  return (
    <>
      <h1>Maps</h1>
      <Md>{intro}</Md>
      {(["Early", "Late", "Final"] as const).map((pool) => (
        <section key={pool}>
          <h2>
            {pool} maps{" "}
            <span className="muted small">
              {pool === "Early" ? "worlds 1-2" : pool === "Late" ? "worlds 3-4" : "world 5"}
            </span>
          </h2>
          <div className="cards grid">
            {maps
              .filter((m) => m.pool === pool)
              .map((m) => (
                <div className="card" key={m.name}>
                  <div className="card-title">{m.name}</div>
                  <p>
                    <b>Enemies:</b> {m.roster}
                  </p>
                  <p className="muted">{m.notes}</p>
                </div>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
