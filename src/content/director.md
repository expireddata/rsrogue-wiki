# Danger & the director

A **director** decides what spawns, where and when, like the one in Risk of Rain 2. It earns
credits over time and spends them on monsters. The longer you survive, the more it earns and the
nastier the monsters it can afford.

## Danger level

Danger starts at 1 and goes up by 1 **every 5 minutes**, plus 1 for **every world** after the
first. So a run that reaches world 3 after 20 minutes of fighting is at danger level 7. The clock stops once
the world's boss is dead, and starts again in the next world.

Each monster is scaled to the danger level at the moment it spawns:

| Danger | Strongest monster it can send | Max hits and hitpoints | Accuracy and defence | Monsters alive at once |
|---|---|---|---|---|
| 1 | Level 8 | 1x | 1x | 10 |
| 2 | Level 16 | 1.55x | 1.4x | 14 |
| 3 | Level 24 | 2.1x | 1.8x | 18 |
| 5 | Level 40 | 3.2x | 2.6x | 26 |
| 8 | Level 64 | 4.85x | 3.8x | 30 (the cap) |

Scaled monsters show their new combat level, and they [drop better loot](#/loot) to match. Chest
lamps grow with danger too, so staying longer isn't all bad.

## How monsters spawn

- **Credit spawns** appear 12-25 tiles from a player, usually near someone.
- **Ambient monsters** wander the map at least 25 tiles from everyone: 6 at the start, up to 16.
  They never despawn, and they don't count towards the cap above. Explore and you'll find them.
- **Lull spawns** stop you hiding. Go 20 ticks with no monster within 15 tiles and one spawns
  12-18 tiles away, then another every 20 ticks until you're back in a fight. Not during a boss
  fight.
- A monster more than 40 tiles from everyone for 50 ticks despawns, and the director gets its
  credits back.

The numbers above are for a full-sized map. Smaller maps shrink the director (down to 0.35x), so
Castle Wars gets fewer monsters at once than Wild Varrock.

## How monsters behave

- Every monster hunts any player within 20 tiles, and chases across the whole map.
- They path around walls. Safespots don't work.
- When their target dies or turns into a ghost, they go after the rest of the team.
- They walk through each other, so a crowd can't block itself in a corridor. You still block
  them.
- Archers and mages stop once they're in range with line of sight. Every map mixes melee, ranged
  and magic monsters, so no spot is safe from everything.

## Changing the odds

**Bounty** makes the director earn 50% more credits for the whole team, in exchange for more
drops. **Blood pact** drains your hitpoints faster as danger rises. See
[Modifiers](#/modifiers).
