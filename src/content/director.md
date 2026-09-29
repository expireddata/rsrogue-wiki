# Difficulty & worlds

The **director** decides what spawns and when. It's modelled on Risk of Rain 2's combat director.

## Difficulty over time

- Difficulty rises with the time since the run started. It stops rising once a boss is defeated.
- The director earns **credits** and spends them on npcs, costed by combat level. Stronger npcs
  unlock as difficulty rises.
- Later npcs get **scaled-up stats**, and their shown combat level rises to match.
- The number of live npcs is capped, growing with difficulty. Npcs left far from everyone are
  despawned and refunded. New spawns favour tiles near a player.
- Each world adds to the difficulty, and the director starts over with an opening wave.

## Free spawns

- **Ambient npcs** are spread over the island, at least 25 tiles from every player. They reward
  exploring, and never despawn for distance.
- **Lull npcs**: a player with no npc within 15 tiles for a while gets one spawned 12-18 tiles away.
  Not during a boss fight.

## How enemies behave

Every npc in an arena can roam the whole island and aggressively hunts players within 20 tiles.
They keep hunting after finding a target, path around obstacles (no safespotting), and don't block
each other. Archers and mages only close in until they are in range with line of sight. Every map's
roster mixes melee with ranged and magic, so no spot is safe from everything.

## Map size

Smaller maps get a smaller director (0.35 to 1 of the Deserted Island's), so Castle Wars isn't as
crowded as Wild Varrock.

## Worlds

| World | Map pool | Boss options |
|---|---|---|
| 1-2 | Early maps | TzTok-Jad, General Graardor, the Rabbit, Scurrius |
| 3-4 | Late maps | Those, plus Nex |
| 5 | King Black Dragon's lair | Verzik Vitur |

Entering the boss portal moves the whole team to the next world. Ghosts are revived on the way, and
items, levels and modifiers carry over. See [Maps](#/maps) and [Bosses](#/bosses).

## Modifiers that change difficulty

**Bounty** makes the director earn 50% more credits, run-wide. **Blood pact** drains your health.
See [Modifiers](#/modifiers).
