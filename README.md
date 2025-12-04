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

terraAegis

If you want, I can also generate:

a markdown-formatted version for GitHub

a short version for itch.io

a webpage version (README.html)

an inline instructions overlay for inside the game

Just tell me which.

Sources
You said:
yea and md github version please. 
inculde wittern by @photoncommander on X
ChatGPT said:

Here is the GitHub-ready README.md — clean, tight, and formatted properly.

TERRA AEGIS

A modern retro-arcade space defense shooter.
Written by @photoncommander on X

Overview

Terra Aegis is a high-intensity, CRT-styled space survival shooter inspired by Space Invaders but built with modern mechanics, dynamic difficulty scaling, bosses, hazards, and multiple unique game modes.

The objective: Defend Earth across endlessly escalating alien waves.

Game Modes

Classic Mode – Standard wave progression with increasing difficulty.

Time Attack – Score as much as possible before the timer expires.

Score Attack – Limited lives; maximum scoring efficiency.

Survival – Endure against rapidly escalating difficulty and hazards.

Controls
Action	Input
Move	Mouse OR A / D keys
Fire	Click OR Spacebar
Pause	ESC
HUD Breakdown

Score – Current points

Wave – Progression level

High Score – Saved locally

Lives – Remaining player lives

Ammo – Shots remaining

Timer – Only shown in Time Attack

Player Systems

Starts with 3 lives and 30 ammo

Weapon Power auto-upgrades with increasing score (Levels 1–4)

Weapon Types: Bullets → Lasers → Missiles

Full Auto Mode (temporary power-up)

Shield absorbs 3 hits

Combo System: Rapid kills increase score multiplier

Barriers

Adjustable (0–7) via menu slider.
Protective blocks that:

Absorb enemy fire

Take damage from meteors

Can be destroyed over time

Enemies
Invader Types

Small (Squid) – Fast projectile

Medium (Crab) – Wiggly projectile

Large (Octopus) – Standard shot

UFO

Flies across the top

Grants +10 ammo

Every 3rd kill grants +1 life

Bosses

Appear every 11 waves (mega bosses periodically).
Boss mechanics include:

Multi-phase behavior

Spread shots

Targeted shots

Rapid-fire patterns

Black Hole attacks (mega bosses)

Hazards

Meteors: Falling debris damaging player, barriers, and invaders

Black Holes: Gravity wells that pull objects inward; lethal on contact

Power-Ups

Dropped by certain invaders:

Power-Up	Effect
Life	+1 Life
Shield	Recharges shield
Laser	Upgrades weapon
Missile	AoE splash damage
Full Auto	Rapid-fire
Ammo	Restores ammo
Scoring System

Small invaders: 30 points

Medium invaders: 20 points

Large invaders: 10 points

Bullet interception bonus: +50

Boss defeat: Large bonus

Combo chains multiply scoring

High score saved using browser localStorage.

Difficulty Scaling

Difficulty increases through:

Faster invaders

More rows

Higher enemy fire frequency

Faster UFOs

Boss phase escalation

More hazards

Every 10-wave cycle amplifies base difficulty.

Technical Notes

Built for 1200×700 canvas resolution

Automatically scaled to available viewport

Full CRT scanline + glow shader overlay

Pure HTML5 + Canvas + JavaScript

Embedded base64 WAV audio

Seamless desktop & mobile support

Run the Game

Open terraAegis.html directly in any modern browser.
No server required.

Author @photoncmndr on X
