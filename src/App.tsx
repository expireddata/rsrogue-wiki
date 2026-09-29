import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Md from "./Md";
import Sprite from "./Sprite";
import Director from "./content/director.md?raw";
import Loot from "./content/loot.md?raw";
import Trader from "./content/trader.md?raw";
import Upgrades from "./content/upgrades.md?raw";
import Capes from "./content/capes.md?raw";
import Collection from "./content/collection.md?raw";
import Tips from "./content/tips.md?raw";
import Home from "./pages/Home";
import Chests from "./pages/Chests";
import Modifiers from "./pages/Modifiers";
import Maps from "./pages/Maps";
import Bosses from "./pages/Bosses";
import Achievements from "./pages/Achievements";

const nav: { to: string; label: string; group: string }[] = [
  { to: "/", label: "Home", group: "Start here" },
  { to: "/tips", label: "Your first run", group: "Start here" },
  { to: "/director", label: "Danger & the director", group: "The run" },
  { to: "/maps", label: "Maps", group: "The run" },
  { to: "/bosses", label: "Bosses", group: "The run" },
  { to: "/chests", label: "Chests & gear", group: "Getting stronger" },
  { to: "/modifiers", label: "Modifiers", group: "Getting stronger" },
  { to: "/upgrades", label: "Upgrades & life points", group: "Getting stronger" },
  { to: "/loot", label: "Loot & supplies", group: "Getting stronger" },
  { to: "/capes", label: "Skill capes", group: "Getting stronger" },
  { to: "/trader", label: "Trader & looting bag", group: "Getting stronger" },
  { to: "/achievements", label: "Combat achievements", group: "Kept forever" },
  { to: "/collection", label: "Collection log", group: "Kept forever" },
];

const Brand = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={"brand " + className}>
    <Sprite name="bloodier_key" />
    rs<span>rogue</span>
  </Link>
);

export default function App() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const page = nav.find((n) => n.to === pathname);
    document.title = page && page.to !== "/" ? `${page.label} · rsrogue wiki` : "rsrogue wiki";
  }, [pathname]);
  const groups = [...new Set(nav.map((n) => n.group))];
  return (
    <div className="layout">
      <header className="topbar">
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          ☰
        </button>
        <Brand />
      </header>
      <nav className={"sidebar" + (open ? " open" : "")}>
        <Brand className="desktop" />
        {groups.map((g) => (
          <div key={g}>
            <div className="group">{g}</div>
            {nav
              .filter((n) => n.group === g)
              .map((n) => (
                <NavLink key={n.to} to={n.to} className="nav" end>
                  {n.label}
                </NavLink>
              ))}
          </div>
        ))}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tips" element={<Md>{Tips}</Md>} />
          <Route path="/director" element={<Md>{Director}</Md>} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/bosses" element={<Bosses />} />
          <Route path="/loot" element={<Md>{Loot}</Md>} />
          <Route path="/chests" element={<Chests />} />
          <Route path="/modifiers" element={<Modifiers />} />
          <Route path="/upgrades" element={<Md>{Upgrades}</Md>} />
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
