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
      <p className="lede">
        Runs reset. These don't. {list.length} achievements, worth {total} points, saved on your
        account for good and shown in the game's Combat Tasks menu (account summary → Combat
        Tasks).
      </p>
      <ul>
        <li>
          <b>Boss tasks</b> count for every member who hit the boss and is still alive when it dies.
        </li>
        <li>
          <b>Kill counts</b> count for everyone who hit the boss, dead or alive. Each boss has
          Novice (1 kill), Adept (5) and Veteran (10) tasks.
        </li>
        <li>
          <b>Finish a boss's whole set</b> and its pet follows you every run: TzRek-Jad, Scurrius's
          pet, Nexling or Lil' Zik.
        </li>
        <li>
          <b>Finish every task</b> to start every run with a Tzkal slayer helmet.
        </li>
        <li>Points per tier: {tiers.map((t) => `${t} ${points[t]}`).join(" · ")}.</li>
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
