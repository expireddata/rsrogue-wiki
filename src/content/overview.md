# rsrogue

**rsrogue** is a roguelike combat game built on [RS Mod](https://github.com/rsmod/rsmod), an OSRS
(revision 233) server emulator. You play in the normal Old School RuneScape client, but every run is
a fresh, self-contained fight for survival.

## The loop

1. **You spawn** in a fresh arena instance of a random map, with 25 purple sweets, a **starter key**
   and a looting bag. Levels reset to 1 (10 hitpoints) and the xp rate is 100x.
2. **Open a chest** with your starter key and pick a melee, ranged or magic kit.
3. **Survive.** A director spawns npcs over time and difficulty climbs the longer you stay. Every npc
   hunts you across the whole map, and you can't safespot them.
4. **Loot.** Kills drop gear, food, bones and keys. Keys open chests around the map, which offer
   [modifiers, gear and xp](#/chests).
5. **Summon the boss** at the map's altar, beat it, and take the portal to the next world.
6. **Finish world 5** by defeating Verzik Vitur, or die trying. Death starts a brand new run.

Nothing carries over between runs except what is saved on your account:
[combat achievements](#/achievements) and the [collection log](#/collection).

## Key rules

- **Runes and ammo are unlimited.** Spells need no runes and ammunition is never used up.
- **Everything is multi-combat**, and run energy never runs out.
- **Levels go past 99** (up to 255) on the normal xp curve.
- **Dropped items are visible to your whole team** straight away, and every item is tradeable.
- **Bosses are scaled** by difficulty and team size.

## Playing with friends

A solo run is just a run with one member. Use `::join <name>` to join another player's run while it
is still in world 1. If you die while a teammate is alive you become a **ghost** where you fell, and
are revived when the team reaches the next world. The run only ends once everyone is dead.

## Explore the wiki

| | |
|---|---|
| [Getting started](#/tips) | Commands and tips for your first run |
| [Difficulty & worlds](#/director) | How the director spawns enemies, and how worlds scale |
| [Maps](#/maps) | Every arena and its enemies |
| [Bosses](#/bosses) | Attacks and mechanics |
| [Loot & food](#/loot) | What kills drop |
| [Chests & gear](#/chests) | Keys, chest rewards and every piece of gear |
| [Modifiers](#/modifiers) | All 28 run modifiers |
| [Trader & looting bag](#/trader) | Blood money and selling gear |
| [Skill capes](#/capes) | Level 99 perks |
| [Combat achievements](#/achievements) | Permanent goals and rewards |
| [Collection log](#/collection) | Account-wide item tracking |
