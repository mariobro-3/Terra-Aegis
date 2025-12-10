TERRA AEGIS – README

Overview

Terra Aegis is a modernized, retro-styled arcade shooter inspired by classic Space Invaders. You command a starfighter defending Earth against escalating alien waves, bosses, hazards, and environmental threats. The game features multiple play modes, power-ups, destructible barriers, UFO bonuses, and a full CRT-style visual aesthetic.

Game Modes

Classic Mode – Standard wave progression. Difficulty increases each wave.
Time Attack – Score as much as possible before the timer runs out.
Score Attack – Limited lives, maximum scoring efficiency.
Survival – Survive as long as possible against rapidly escalating difficulty.

Controls

Move:
Mouse movement
OR ← / → (A / D)

Fire:
Click
OR Spacebar

Pause:
ESC

HUD Elements

Score – Total points earned
Wave – Current wave level
High Score – Stored locally
Lives – Remaining player lives
Ammo – Shots left
Timer – Only appears in Time Attack mode

Core Mechanics

Player
Starts with: 3 lives, 30 ammo
Weapon power levels increase automatically with score (up to 4 levels)
Weapon types: bullets → lasers → missiles (via power-ups)
Optional Full Auto mode (temporary boost)
Defensive Shield can absorb 3 hits

Barriers
Player-protecting destructible blocks
Amount adjustable (0–7) on the main menu
Absorb enemy fire and meteors

Enemies
Invader types:
Small (Squid): Fast shots
Medium (Crab): Wiggly shots
Large (Octopus): Standard fire

UFO:
Flies across the top of the screen
Grants +10 ammo; every third kill grants +1 life

Bosses:
Appear every 11 waves (mega bosses at larger intervals)
Multi-phase fights with targeted shots, spreads, and special attacks
Mega bosses can spawn Black Holes (gravity traps)

Hazards
Meteors: Falling projectiles damaging anything they hit
Black Holes: Pull the player/projectiles in; lethal on contact

Power-Ups
Dropped randomly from destroyed invaders:
Life – +1 life
Shield – Recharges shield
Laser – Stronger firing mode
Missile – AoE splash damage
Ammo – +Ammo
Full Auto – Rapid-fire burst

Scoring
Standard invaders: 10–30 points depending on type
UFO kill: reload + possible extra life
Intercepting enemy bullets: +50 points
Boss kill: massive score bonus
Combos: kill streaks increase score; combo resets on timer expiration

Difficulty Scaling
Difficulty increases by:
Faster grid movement
More frequent enemy firing
More rows of invaders
Faster UFOs
Faster bosses and additional phases
Increased hazard frequency
Every 10-wave cycle increases baseline difficulty further.

Technical Notes
Designed for 1200×700 native resolution
Auto-scaled to match screen size
Retro CRT scanline + glow shader overlay
Audio via embedded base64 WAV samples
High score stored locally via localStorage

Attribution
Built using HTML5 Canvas, vanilla JavaScript, and custom rendering logic.
Source file: terraAegis.html

Run the Game
Open terraAegis.html directly in any modern browser.
No server required.

Author @photoncmndr on X
