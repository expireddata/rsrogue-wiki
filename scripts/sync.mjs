// Regenerates src/data/*.json from the game's source, so the wiki stays tied to it.
// Run from the wiki folder (a submodule of rsrogue): `npm run sync`. The generated files are
// committed, so the wiki builds on its own in CI without the game repo.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const module = join(
  root,
  "content/minigames/roguelike/src/main/kotlin/org/rsmod/content/minigames/roguelike",
);
if (!existsSync(module)) {
  console.error("Game source not found at " + module + " (is the wiki inside rsrogue?)");
  process.exit(1);
}
const rd = (p) => readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const out = (name, data) =>
  writeFileSync(join(here, "..", "src/data", name), JSON.stringify(data, null, 2) + "\n");

// ---- Achievements -------------------------------------------------------------------------
{
  const src = rd(join(module, "achievement/RoguelikeAchievement.kt"));
  const body = src.slice(src.indexOf("enum class RoguelikeAchievement"), src.indexOf("/** Which of"));
  const strLit = /"((?:[^"\\]|\\.)*)"/g;
  const str = (field, chunk) => {
    const m = new RegExp(field + "\\s*=\\s*((?:\"(?:[^\"\\\\]|\\\\.)*\"\\s*\\+?\\s*)+)").exec(chunk);
    if (!m) return null;
    return [...m[1].matchAll(strLit)].map((x) => x[1].replace(/\\"/g, '"')).join("");
  };
  const list = [];
  const re = /^ {4}(\w+)\(\n([\s\S]*?)\n {4}\)[,;]/gm;
  for (const m of body.matchAll(re)) {
    const c = m[2];
    list.push({
      id: m[1],
      bit: Number(/bit\s*=\s*(\d+)/.exec(c)[1]),
      tier: /tier\s*=\s*AchievementTier\.(\w+)/.exec(c)[1],
      type: /type\s*=\s*AchievementType\.(\w+)/.exec(c)[1],
      name: str("displayName", c),
      description: str("description", c),
      reward: str("reward", c),
      boss: /RoguelikeBoss\.(\w+)/.exec(c)?.[1] ?? null,
    });
  }
  list.sort((a, b) => a.bit - b.bit);
  out("achievements.json", list);
  console.log("achievements:", list.length);
}

// ---- Modifiers ----------------------------------------------------------------------------
{
  const md = rd(join(root, "docs/roguelike-modifiers.md"));
  const lines = md.split("\n");
  const table = {};
  for (const l of lines) {
    const m = /^\| \[([^\]]+)\]\(#[^)]*\) \| (\w+) \| ([^|]+) \| (.+) \|$/.exec(l);
    if (m) table[m[1]] = { rarity: m[2], category: m[3].trim(), summary: m[4].trim() };
  }
  const devStart = lines.findIndex((l) => l.startsWith("## For developers"));
  const categoryIntro = {};
  const mods = [];
  let category = null;
  let cur = null;
  const flush = () => {
    if (cur) mods.push({ ...cur, body: cur.body.join("\n").trim() });
    cur = null;
  };
  for (let i = 0; i < devStart; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) {
      flush();
      category = l.slice(3);
      categoryIntro[category] = [];
    } else if (l.startsWith("### ") && table[l.slice(4)]) {
      flush();
      cur = { name: l.slice(4), ...table[l.slice(4)], body: [] };
    } else if (cur) cur.body.push(l);
    else if (category && category !== "How modifiers work" && category !== "Quick reference")
      categoryIntro[category].push(l);
  }
  flush();
  const howStart = lines.findIndex((l) => l.startsWith("## How modifiers work"));
  const quickStart = lines.findIndex((l) => l.startsWith("## Quick reference"));
  const how = lines.slice(howStart + 1, quickStart).join("\n").trim();
  for (const k of Object.keys(categoryIntro)) categoryIntro[k] = categoryIntro[k].join("\n").trim();
  out("modifiers.json", { how, categoryIntro, modifiers: mods });
  console.log("modifiers:", mods.length, "of", Object.keys(table).length);
}

// ---- Chest gear ---------------------------------------------------------------------------
{
  const src = rd(join(module, "chest/ChestGear.kt"));
  const overrides = {
    dinhs_bulwark: "Dinh's bulwark",
    tumekens_shadow: "Tumeken's shadow",
    osmumtens_fang: "Osmumten's fang",
    avas_assembler: "Ava's assembler",
    inquisitors_mace: "Inquisitor's mace",
    inquisitors_helm: "Inquisitor's great helm",
    inquisitors_hauberk: "Inquisitor's hauberk",
    inquisitors_plateskirt: "Inquisitor's plateskirt",
    ruby_dragon_bolts_e: "Ruby dragon bolts (e)",
    berserker_ring_i: "Berserker ring (i)",
    warrior_ring_i: "Warrior ring (i)",
    archers_ring_i: "Archers ring (i)",
    seers_ring_i: "Seers ring (i)",
    avernic_treads_max: "Avernic treads (max)",
    elidinis_ward: "Elidinis' ward",
    zuriels_hood: "Zuriel's hood",
    zuriels_staff: "Zuriel's staff",
    zuriels_robe_top: "Zuriel's robe top",
    zuriels_robe_bottom: "Zuriel's robe bottom",
    morrigans_coif: "Morrigan's coif",
    morrigans_leather_body: "Morrigan's leather body",
    morrigans_leather_chaps: "Morrigan's leather chaps",
    morrigans_javelin: "Morrigan's javelin",
    bolt_rack: "Bolt rack",
    imbued_zamorak_cape: "Imbued Zamorak cape",
    dragon_2h_sword: "Dragon 2h sword",
  };
  const pretty = (id) => {
    if (overrides[id]) return overrides[id];
    const s = id.replace(/_/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const section = (name, next) => {
    const a = src.indexOf("private fun " + name + "()");
    const b = next ? src.indexOf("private fun " + next + "()") : src.length;
    return src.slice(a, b);
  };
  const idsOf = (code) =>
    [...code.replace(/\/\/.*$/gm, "").matchAll(/\b([a-z][a-z0-9_]*)\b/g)]
      .map((x) => x[1])
      .filter((x) => !["listOf", "style", "GearItem", "AMMO", "null"].includes(x));
  const parse = (style, chunk) => {
    const sets = [];
    const singles = [];
    // Sets: `style.set("Name", a, b, c)` or `GearOption("Name", listOf(GearItem(a), ...), style)`.
    for (const m of chunk.matchAll(/(?:style\.set|GearOption)\(\s*"([^"]+)",([\s\S]*?)\n {20}\),?|(?:style\.set)\(\s*"([^"]+)",([^\n]*)\)/g)) {
      const name = m[1] ?? m[3];
      const code = (m[2] ?? m[4]).replace(/\n {24}\),\n {24}style,?/, "");
      const ids = idsOf(code).filter((x) => x !== "style");
      if (ids.length) sets.push({ name, items: [...new Set(ids)].map(pretty) });
    }
    for (const m of chunk.matchAll(/style\.singles\(([\s\S]*?)\n {12,16}\)\n/g)) {
      for (const id of idsOf(m[1])) singles.push(pretty(id));
    }
    for (const m of chunk.matchAll(/rangedWeapon\(([\w.]+),\s*([\w.]+)\)/g)) {
      const w = m[1].split(".").pop();
      const a = m[2] === "null" ? null : m[2].split(".").pop();
      singles.push(a ? pretty(w) + " + " + pretty(a) + " x100" : pretty(w) + " x100");
    }
    return { style, sets, singles };
  };
  const gear = [
    parse("Melee", section("melee", "ranged")),
    parse("Ranged", section("ranged", "magic")),
    parse("Magic", section("magic", null)),
  ];
  out("gear.json", gear);
  for (const g of gear)
    console.log(g.style, g.sets.map((s) => s.name + ":" + s.items.length).join(", "), "|", g.singles.length, "singles");
}

// ---- Card sprites -------------------------------------------------------------------------
// The chest menu's pixel-art cards (one per modifier, plus keys, styles and lamps), used as icons.
{
  const from = join(
    root,
    "content/minigames/roguelike/src/main/resources/org/rsmod/content/minigames/roguelike/sprites",
  );
  const to = join(here, "..", "public/sprites");
  mkdirSync(to, { recursive: true });
  const pngs = readdirSync(from).filter((f) => f.startsWith("roguelike_card_") && f.endsWith(".png"));
  for (const f of pngs) copyFileSync(join(from, f), join(to, f.slice("roguelike_card_".length)));
  console.log("sprites:", pngs.length);
}
