import { Link } from "react-router-dom";
import Sprite from "../Sprite";
import mods from "../data/modifiers.json";
import achievements from "../data/achievements.json";
import gear from "../data/gear.json";

const gearPicks = gear.reduce((n, s) => n + s.sets.length + s.singles.length, 0);

const stats: [number | string, string][] = [
  [5, "worlds"],
  [8, "maps"],
  [6, "bosses"],
  [mods.modifiers.length, "modifiers"],
  [gearPicks, "gear picks"],
  [achievements.length, "achievements"],
];

const steps: { sprite: string; title: string; text: string }[] = [
  {
    sprite: "melee_style",
    title: "Pick a style",
    text: "Your starter key opens any chest. Choose melee, ranged or magic: you get a bronze-tier kit and level 20 in that style.",
  },
  {
    sprite: "bloody_key",
    title: "Kill, loot, unlock",
    text: "Kills drop gear, food, bones and keys. Every key opens a chest with a choice of three rewards.",
  },
  {
    sprite: "cleave",
    title: "Build something broken",
    text: "Stack modifiers like Cleave, Echo strike and Blood pact. Upgrade your gear until your health is in the hundreds.",
  },
  {
    sprite: "lamp",
    title: "Level at 100x",
    text: "Every run has a 100x xp rate. One bloody key lamp in the first world is worth 200,000 xp.",
  },
  {
    sprite: "bounty",
    title: "Outpace the director",
    text: "Monsters spawn faster and hit harder every 5 minutes. Stay too long and they catch up with you.",
  },
  {
    sprite: "immortal",
    title: "Kill the boss, move on",
    text: "Summon the world's boss when you're ready. Win, and a portal takes your team to the next, harder world.",
  },
];

const worlds = [
  { n: 1, where: "Early map", who: "Jad, Graardor, the Rabbit or Scurrius" },
  { n: 2, where: "Early map", who: "Jad, Graardor, the Rabbit or Scurrius" },
  { n: 3, where: "Late map", who: "Nex joins the pool" },
  { n: 4, where: "Late map", who: "Nex joins the pool" },
  { n: 5, where: "King Black Dragon's lair", who: "Verzik Vitur. Beat her to finish the run.", final: true },
];

const pages: { to: string; sprite: string; title: string; text: string }[] = [
  { to: "/modifiers", sprite: "glass_cannon", title: "Modifiers", text: "All 28 run-changing powers" },
  { to: "/chests", sprite: "bloodier_key", title: "Chests & gear", text: "Key odds and every piece of gear" },
  { to: "/bosses", sprite: "second_wind", title: "Bosses", text: "Attacks, stats and how to win" },
  { to: "/upgrades", sprite: "thick_skin", title: "Upgrades", text: "Catalysts, stones and life points" },
  { to: "/director", sprite: "bounty", title: "Danger", text: "How fast things get worse" },
  { to: "/achievements", sprite: "maxed_but_at_what_cost", title: "Achievements", text: "Pets and capes you keep forever" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">An Old School RuneScape roguelike</div>
        <h1>
          rs<span>rogue</span>
        </h1>
        <p>
          Start at level 1 with 25 sweets and a key. Fight through five worlds, kill a boss in
          each, and finish Verzik Vitur. Die, and you start again from nothing.
        </p>
        <div className="cta">
          <Link className="btn" to="/tips">
            Your first run
          </Link>
          <Link className="btn ghost" to="/modifiers">
            Browse modifiers
          </Link>
        </div>
        <div className="art" aria-hidden>
          {["glass_cannon", "blood_pact", "speed_demon", "cleave", "immortal", "echo_strike"].map((s) => (
            <Sprite key={s} name={s} />
          ))}
        </div>
      </section>

      <div className="stats">
        {stats.map(([n, label]) => (
          <div key={label}>
            <b>{n}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <h2>How a run goes</h2>
      <ol className="steps">
        {steps.map((s) => (
          <li key={s.title}>
            <Sprite name={s.sprite} />
            <div>
              <b>{s.title}</b>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2>Five worlds</h2>
      <p>
        Each world is a fresh copy of a real map with its own boss. Items, levels and modifiers come
        with you. See <Link to="/maps">Maps</Link> and <Link to="/bosses">Bosses</Link>.
      </p>
      <div className="path">
        {worlds.map((w) => (
          <div key={w.n} className={"world" + (w.final ? " final" : "")}>
            <div className="num">
              <small>World</small>
              {w.n}
            </div>
            <div className="where">{w.where}</div>
            <div className="who">{w.who}</div>
          </div>
        ))}
      </div>

      <h2>House rules</h2>
      <ul>
        <li>
          <b>No runes, no ammo.</b> Spells are free and arrows are never used up.
        </li>
        <li>
          <b>Nowhere to hide.</b> Every monster hunts you across the map, paths around walls and
          can't be safespotted. The whole map is multi-combat.
        </li>
        <li>
          <b>Levels go past 99,</b> all the way to 255, and keep making you stronger.
        </li>
        <li>
          <b>Run energy never drains.</b>
        </li>
        <li>
          <b>Drops are shared.</b> Your team sees every drop at once, and anything can be traded.
        </li>
      </ul>

      <h2>Bring friends</h2>
      <p>
        Type <code>::join name</code> to jump into a friend's run in its first 5 minutes. If you die
        while a teammate is alive, you haunt the map as a ghost until they take the portal, then
        come back with everything you had. The run ends when the whole team is dead.
      </p>

      <h2>What you keep</h2>
      <p>
        Every run starts from zero, except for your{" "}
        <Link to="/achievements">combat achievements</Link> and{" "}
        <Link to="/collection">collection log</Link>. Achievements unlock boss pets, max capes and
        gold-trimmed starter kits for every run after.
      </p>

      <h2>Jump to</h2>
      <div className="tiles">
        {pages.map((p) => (
          <Link key={p.to} to={p.to} className="tile">
            <Sprite name={p.sprite} />
            <div>
              <b>{p.title}</b>
              <span>{p.text}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
