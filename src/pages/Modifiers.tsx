import { useMemo, useState } from "react";
import Md from "../Md";
import data from "../data/modifiers.json";

type Mod = { name: string; rarity: string; category: string; summary: string; body: string };
const mods = data.modifiers as Mod[];
const rarities = ["All", "Common", "Rare", "Special"];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Modifiers() {
  const [rarity, setRarity] = useState("All");
  const [q, setQ] = useState("");
  const [openName, setOpenName] = useState<string | null>(
    () => decodeURIComponent(location.hash.split("?m=")[1] ?? "") || null,
  );
  const shown = useMemo(
    () =>
      mods.filter(
        (m) =>
          (rarity === "All" || m.rarity === rarity) &&
          (m.name + m.summary).toLowerCase().includes(q.toLowerCase()),
      ),
    [rarity, q],
  );
  return (
    <>
      <h1>Modifiers</h1>
      <p>
        Modifiers are lasting effects picked up from chests. They stack, belong to one player and
        end with the run.
      </p>
      <Md>{data.how}</Md>
      <h2>All modifiers</h2>
      <div className="filters">
        {rarities.map((r) => (
          <button key={r} className={r === rarity ? "on" : ""} onClick={() => setRarity(r)}>
            {r}
          </button>
        ))}
        <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="cards">
        {shown.map((m) => (
          <div key={m.name} id={slug(m.name)} className={"card " + m.rarity.toLowerCase()}>
            <button
              className="card-head"
              onClick={() => setOpenName(openName === m.name ? null : m.name)}
            >
              <span className="card-title">{m.name}</span>
              <span className={"tag " + m.rarity.toLowerCase()}>{m.rarity}</span>
              <span className="tag">{m.category}</span>
              <span className="card-sum">{m.summary}</span>
            </button>
            {openName === m.name && (
              <div className="card-body">
                <Md>{m.body.replace(/\]\(#([a-z0-9-]+)\)/g, "](#/modifiers)")}</Md>
              </div>
            )}
          </div>
        ))}
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
