import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Md from "../Md";
import Sprite, { spriteOf } from "../Sprite";
import data from "../data/modifiers.json";

type Mod = { name: string; rarity: string; category: string; summary: string; body: string };
const mods = data.modifiers as Mod[];
const rarities = ["All", "Common", "Rare", "Special"];
const categories = ["All", ...new Set(mods.map((m) => m.category))];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Modifiers() {
  const [rarity, setRarity] = useState("All");
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");
  const [openName, setOpenName] = useState<string | null>(null);
  const shown = useMemo(
    () =>
      mods.filter(
        (m) =>
          (rarity === "All" || m.rarity === rarity) &&
          (category === "All" || m.category === category) &&
          (m.name + m.summary).toLowerCase().includes(q.toLowerCase()),
      ),
    [rarity, category, q],
  );
  return (
    <>
      <h1>Modifiers</h1>
      <p className="lede">
        Modifiers are powers you pick from <Link to="/chests">key chests</Link>. They stack, they
        combine, and a few of them break the game in your favour. They last until the run ends.
      </p>
      <ul>
        <li>
          <b>Common</b> ones are steady boosts, <b>rare</b> ones shape a build, and <b>special</b>{" "}
          ones change how you play, usually with a catch.
        </li>
        <li>
          <b>Take one again to stack it.</b> Numbers are per stack unless it says otherwise. Most
          specials can only be held once.
        </li>
        <li>Your modifiers show on the buff bar above the chatbox, with their stacks.</li>
      </ul>
      <details className="notes">
        <summary>The full rules</summary>
        <Md>{data.how}</Md>
      </details>

      <h2>All {mods.length} modifiers</h2>
      <div className="filters">
        {rarities.map((r) => (
          <button key={r} className={r === rarity ? "on" : ""} onClick={() => setRarity(r)}>
            {r}
          </button>
        ))}
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "Any category" : c}
            </option>
          ))}
        </select>
        <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <p className="count">
        Showing {shown.length} of {mods.length}. Click one for the details.
      </p>
      <div className="cards">
        {shown.map((m) => {
          const open = openName === m.name;
          return (
            <div
              key={m.name}
              id={slug(m.name)}
              className={"card " + m.rarity.toLowerCase() + (open ? " open" : "")}
            >
              <button className="card-head" onClick={() => setOpenName(open ? null : m.name)} aria-expanded={open}>
                <Sprite name={spriteOf(m.name)} />
                <span className="card-text">
                  <span className="card-line">
                    <span className="card-title">{m.name}</span>
                    <span className={"tag " + m.rarity.toLowerCase()}>{m.rarity}</span>
                    <span className="tag">{m.category}</span>
                  </span>
                  <span className="card-sum" style={{ display: "block" }}>
                    {m.summary}
                  </span>
                </span>
                <span className="chev">›</span>
              </button>
              {open && (
                <div className="card-body">
                  <Md>{m.body.replace(/\]\(#([a-z0-9-]+)\)/g, "](#/modifiers)")}</Md>
                </div>
              )}
            </div>
          );
        })}
        {shown.length === 0 && <p className="muted">No modifiers match.</p>}
      </div>
      {Object.entries(data.categoryIntro as Record<string, string>)
        .filter(([, t]) => t)
        .map(([k, t]) => (
          <details key={k} className="notes">
            <summary>Notes on {k.toLowerCase()} modifiers</summary>
            <Md>{t}</Md>
          </details>
        ))}
    </>
  );
}
