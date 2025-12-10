# SOLAR AEGIS: The Obsidian Wing

**Solar Aegis: The Obsidian Wing** is an ambitious browser-based 3D space combat simulator. It combines the thrill of arcade space combat with the awe-inspiring scale of cosmic mega-structures and the frantic enemy pressure of a self-replicating swarm.

> *Pilot a legendary, scavenged starfighter in a desperate defense of the ultimate mega-structure: a Dyson Sphere harnessing the Sun, currently being devoured by an ancient, self-replicating robotic swarm.*

## 📜 The Premise

Humanity found the **Aegis**—a Dyson Sphere built by a vanished progenitor race—thousands of years ago. It ushered in a golden age of limitless energy. But now, the sphere's ancient maintenance machines, the **Corroders**, have awoken. Consuming metal and energy to endlessly multiply, they are eating the Aegis from the inside out.

You pilot the **Obsidian Wing**, a relic found deep within Mercury's hangars: an ancient X-Wing archetype craft, superior to modern tech, designed to withstand the inferno.

## 🌍 The World: A Trinity of Scale

The game is defined by three distinct zones, seamlessly connected by flight:

### 1. The Aegis Shell (The Dyson Sphere)
The primary battlefield. A mechanical landscape the size of a solar system.
*   **Visuals:** Endless canyons of machinery, heat-sink skyscrapers, and abandoned alien cities.
*   **Gameplay:** "Trench run" style combat against the surface. You are a speck against the machine.
*   **The Hazard:** **Structural Integrity**. If Corroders eat too much, sectors collapse, venting plasma.

### 2. Mercury (The Inner Sanctum)
The power coupling inside the sphere.
*   **Visuals:** A blinding wall of solar fire (the Sun) and a scorched rock crisscrossed with glowing conduits.
*   **Gameplay:** High-risk, high-reward runs to defend critical power junctions. Your shields constantly drain from the heat.

### 3. Venus (The Outer Bulwark)
Humanity's last bastion outside the sphere.
*   **Visuals:** Floating aerostat cities above acidic clouds.
*   **Gameplay:** The **Hub** for repairs, upgrades, and mission selection.
*   **Landing:** Harrowing descents through turbulent acid storms.

## 🚀 The Ship: The "Obsidian Wing"

A scavenger's X-Wing, adapted for the job.

*   **S-Foils (Strike Foils):**
    *   **Closed:** Max speed for travel between Venus and the Sphere. Weapons offline.
    *   **Attack (Open "X"):** Engages heat vents and weapons. Essential for combat and Mercury runs.
*   **Upgrades:** Ancient tech upgrades (heat shielding, anti-corrosion armor, quad-lasers).

## 👾 The Enemy: The Corroders

A swarm intelligence that acts like a liquid metal river.

*   **Mites:** Dog-sized units that jump on your cockpit and chew through the glass.
*   **Processors:** Tank-sized heavy units that devour hull plating.
*   **Assemblers:** Massive, walking factories that spawn endless streams of Mites. You must fly *inside* them to destroy their cores.

## 🎮 Current Prototype Features (v2)

The current codebase is a functional "Hello World" proving the core engine concepts:

*   **Engine:** Babylon.js (WebGL)
*   **Flight Model:** Arcade physics with "Cinematic Banking" (visual rolling on turns).
*   **Environment:** A massive wireframe Dyson Sphere shell (400 unit radius).
*   **Combat:**
    *   **Weapon:** Green Plasma Lasers (Spacebar).
    *   **Targets:** 50+ "Replicator" enemies proceduraly placed on the sphere wall.
*   **Physics:** Basic collision detection (Ship vs Sphere Hull).

## 📦 How to Run Locally

Due to browser security policies regarding 3D textures and resources, you must run this via a local web server.

### Using Python (Recommended)
1.  Open a terminal in the project folder.
2.  Run:
    ```bash
    python -m http.server
    ```
3.  Open your browser to `http://localhost:8000`
