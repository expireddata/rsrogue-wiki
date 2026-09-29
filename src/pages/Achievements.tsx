import { useMemo, useState } from "react";
import data from "../data/achievements.json";

type Ach = {
  id: string;
  bit: number;
  tier: string;
  type: string;
  name: string;
  description: string;
  reward: string | null;
  boss: string | null;
};
const list = data as Ach[];
const points: Record<string, number> = {
  Easy: 1, Medium: 2, Hard: 3, Elite: 4, Master: 5, Grandmaster: 6,
};
const bossNames: Record<string, string> = {
  TzTokJad: "TzTok-Jad",
  GeneralGraardor: "General Graardor",
  Rabbit: "The Rabbit",
  Scurrius: "Scurrius",
  Nex: "Nex",
  Verzik: "Verzik Vitur",
};
const tiers = Object.keys(points);

export default function Achievements() {
  const [tier, setTier] = useState("All");
  const [group, setGroup] = useState("All");
  const [q, setQ] = useState("");
  const groups = ["All", "General", ...Object.values(bossNames)];
  const shown = useMemo(
    () =>
      list.filter((a) => {
        const g = a.boss ? bossNames[a.boss] : "General";
        return (
          (tier === "All" || a.tier === tier) &&
          (group === "All" || g === group) &&
          (a.name + a.description).toLowerCase().includes(q.toLowerCase())
        );
      }),
    [tier, group, q],
  );
  const total = list.reduce((s, a) => s + points[a.tier], 0);
  return (
    <>
      <h1>Combat achievements</h1>
      <p>
        Goals met during a run stay completed on your <b>account</b> for good, unlike everything
        else. There are {list.length} of them, worth {total} points in total. They show in the
        in-game Combat Tasks interface (account summary → Combat Tasks).
      </p>
      <ul>
        <li>
          <b>Boss achievements</b> only count for members who hit the boss and are still alive when
          it dies.
        </li>
        <li>
          <b>Kill counts</b> are per account. Every member who hit the boss gets the kill, even if
          they died. Each boss has Novice (1), Adept (5) and Veteran (10) achievements.
        </li>
        <li>
          <b>Set rewards:</b> completing every achievement of a boss makes its pet follow you
          (TzRek-Jad, Scurrius's pet, Nexling, Lil' Zik). Every achievement adds a Tzkal slayer
          helmet to your starting kit.
        </li>
        <li>
          Points per tier:{" "}
          {tiers.map((t) => `${t} ${points[t]}`).join(" · ")}.
        </li>
      </ul>
      <div className="filters">
        <select value={tier} onChange={(e) => setTier(e.target.value)}>
          <option>All</option>
          {tiers.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <p className="muted">
        Showing {shown.length} of {list.length}.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Achievement</th>
              <th>For</th>
              <th>Tier</th>
              <th>Type</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((a) => (
              <tr key={a.id}>
                <td>
                  <b>{a.name}</b>
                </td>
                <td>{a.boss ? bossNames[a.boss] : "General"}</td>
                <td>
                  <span className={"tag tier-" + a.tier.toLowerCase()}>{a.tier}</span>
                </td>
                <td>{a.type}</td>
                <td>
                  {a.description}
                  {a.reward && <div className="reward">Reward: {a.reward}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
