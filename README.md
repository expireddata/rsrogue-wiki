# rsrogue wiki

A GitHub Pages wiki for [rsrogue](https://github.com/expireddata/rsrogue): game overview, chests and
gear, modifiers, maps, bosses and combat achievements.

Built with Vite + React + TypeScript, using hash routing so it works on any Pages path.

## Develop

```bash
npm install
npm run dev
```

## Keeping it in sync with the game

The achievements, modifiers and chest gear pages are generated from the game's source (the
achievement enum, `docs/roguelike-modifiers.md` and `ChestGear.kt`). This repo is meant to live as a
submodule at `wiki/` in rsrogue. After changing those in the game, run:

```bash
npm run sync
```

and commit the updated `src/data/*.json`. The generated files are committed, so CI builds without
the game repo. The prose pages (`src/content/*.md`, and the maps and bosses pages) are hand-written.

## Deploy

Pushing to `main` deploys via GitHub Actions. Set **Settings → Pages → Source** to "GitHub Actions".
