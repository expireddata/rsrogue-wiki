import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Md from "./Md";
import Overview from "./content/overview.md?raw";
import Director from "./content/director.md?raw";
import Loot from "./content/loot.md?raw";
import Trader from "./content/trader.md?raw";
import Capes from "./content/capes.md?raw";
import Collection from "./content/collection.md?raw";
import Tips from "./content/tips.md?raw";
import Chests from "./pages/Chests";
import Modifiers from "./pages/Modifiers";
import Maps from "./pages/Maps";
import Bosses from "./pages/Bosses";
import Achievements from "./pages/Achievements";

const nav: { to: string; label: string; group: string }[] = [
  { to: "/", label: "Game overview", group: "Basics" },
  { to: "/tips", label: "Getting started", group: "Basics" },
  { to: "/director", label: "Difficulty & worlds", group: "Basics" },
  { to: "/maps", label: "Maps", group: "World" },
  { to: "/bosses", label: "Bosses", group: "World" },
  { to: "/loot", label: "Loot & food", group: "Items" },
  { to: "/chests", label: "Chests & gear", group: "Items" },
  { to: "/modifiers", label: "Modifiers", group: "Items" },
  { to: "/trader", label: "Trader & looting bag", group: "Items" },
  { to: "/capes", label: "Skill capes", group: "Items" },
  { to: "/achievements", label: "Combat achievements", group: "Progression" },
  { to: "/collection", label: "Collection log", group: "Progression" },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  const groups = [...new Set(nav.map((n) => n.group))];
  return (
    <div className="layout">
      <header className="topbar">
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">
          ☰
        </button>
        <span className="brand">rsrogue wiki</span>
      </header>
      <nav className={"sidebar" + (open ? " open" : "")}>
        <div className="brand desktop">rsrogue wiki</div>
        {groups.map((g) => (
          <div key={g}>
            <div className="group">{g}</div>
            {nav
              .filter((n) => n.group === g)
              .map((n) => (
                <NavLink key={n.to} to={n.to} end>
                  {n.label}
                </NavLink>
              ))}
          </div>
        ))}
        <a
          className="ext"
          href="https://github.com/expireddata/rsrogue"
          target="_blank"
          rel="noreferrer"
        >
          Source on GitHub ↗
        </a>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Md>{Overview}</Md>} />
          <Route path="/tips" element={<Md>{Tips}</Md>} />
          <Route path="/director" element={<Md>{Director}</Md>} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/bosses" element={<Bosses />} />
          <Route path="/loot" element={<Md>{Loot}</Md>} />
          <Route path="/chests" element={<Chests />} />
          <Route path="/modifiers" element={<Modifiers />} />
          <Route path="/trader" element={<Md>{Trader}</Md>} />
          <Route path="/capes" element={<Md>{Capes}</Md>} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/collection" element={<Md>{Collection}</Md>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
