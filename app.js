// SOLAR AEGIS: The Obsidian Wing
// Prototype v2.2 - Controls Overhaul & X-Wings
// Core Engine & Flight Mechanics

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.05); // Deep space darkness
    
    // --- VISION: THE TRINITY OF SCALE ---
    // 1. VENUS (Hub) -> 2. SPHERE (Battlefield) -> 3. MERCURY (Core)

    // Zone management system
    const ZONES = {
        SPHERE: "sphere",
        MERCURY: "mercury",
        VENUS: "venus"
    };

    const gameState = {
        currentZone: ZONES.SPHERE,
        zoneTransitioning: false
    };

    // --- 1. ENVIRONMENT & LIGHTING ---
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    
    // The Sun (Center of the Sphere)
    const sunLight = new BABYLON.PointLight("sunLight", new BABYLON.Vector3(0,0,0), scene);
    sunLight.intensity = 1.5;
    sunLight.diffuse = new BABYLON.Color3(1, 0.9, 0.7);
    
    const sunMesh = BABYLON.MeshBuilder.CreateSphere("sun", {diameter: 50}, scene);
    const sunMat = new BABYLON.StandardMaterial("sunMat", scene);
    sunMat.emissiveColor = new BABYLON.Color3(1, 1, 0.8);
    sunMesh.material = sunMat;

    // Starfield (Floating Origin Effect)
    const starSystem = new BABYLON.ParticleSystem("stars", 4000, scene);
    starSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
    starSystem.emitter = new BABYLON.Vector3(0, 0, 0);
    starSystem.minEmitBox = new BABYLON.Vector3(-500, -500, -500);
    starSystem.maxEmitBox = new BABYLON.Vector3(500, 500, 500);
    starSystem.color1 = new BABYLON.Color4(1, 1, 1, 1.0);
    starSystem.color2 = new BABYLON.Color4(0.8, 0.8, 1, 1.0);
    starSystem.minSize = 0.2;
    starSystem.maxSize = 1.5;
    starSystem.emitRate = 4000;
    starSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    starSystem.start();

    // --- 2. THE AEGIS SHELL (Dyson Sphere - Mechanical Landscape) ---
    const sphereRadius = 400;

    // Create the main structural sphere with higher detail
    const dysonSphere = BABYLON.MeshBuilder.CreateGoldberg("dysonSphere", { m: 8, n: 8, size: sphereRadius * 2 }, scene);

    // Enhanced material with proper metal appearance
    const dysonMat = new BABYLON.StandardMaterial("dysonMat", scene);
    dysonMat.diffuseColor = new BABYLON.Color3(0.3, 0.25, 0.2); // Metallic bronze
    dysonMat.specularColor = new BABYLON.Color3(0.8, 0.7, 0.6); // Shiny metal
    dysonMat.emissiveColor = new BABYLON.Color3(0.05, 0.03, 0.02); // Subtle rust glow
    dysonMat.roughness = 0.7;
    dysonMat.metallic = 0.8;
    dysonSphere.material = dysonMat;
    dysonSphere.isPickable = false;

    // Add surface details - structural panels and conduits
    const createSurfaceDetails = () => {
        const details = [];

        // Create hexagonal panels that cover the surface
        for (let i = 0; i < 200; i++) {
            // Random position on sphere surface
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = sphereRadius + 0.5; // Slightly above surface

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Create raised hexagonal panel
            const panel = BABYLON.MeshBuilder.CreateCylinder("panel", {
                height: 1,
                diameter: 8,
                tessellation: 6
            }, scene);

            panel.position = new BABYLON.Vector3(x, y, z);
            panel.lookAt(new BABYLON.Vector3(0, 0, 0));
            panel.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);

            const panelMat = new BABYLON.StandardMaterial("panelMat", scene);
            panelMat.diffuseColor = new BABYLON.Color3(0.4, 0.35, 0.25);
            panelMat.specularColor = new BABYLON.Color3(0.9, 0.8, 0.7);
            panelMat.emissiveColor = new BABYLON.Color3(0.02, 0.02, 0.05);
            panel.material = panelMat;

            details.push(panel);
        }

        // Add some glowing energy conduits
        for (let i = 0; i < 50; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = sphereRadius + 1;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const conduit = BABYLON.MeshBuilder.CreateCylinder("conduit", {
                height: 15,
                diameter: 0.8
            }, scene);

            conduit.position = new BABYLON.Vector3(x, y, z);
            conduit.lookAt(new BABYLON.Vector3(0, 0, 0));
            conduit.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);

            const conduitMat = new BABYLON.StandardMaterial("conduitMat", scene);
            conduitMat.emissiveColor = new BABYLON.Color3(0.1, 0.3, 0.8); // Blue energy glow
            conduitMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.3);
            conduit.material = conduitMat;

            details.push(conduit);
        }

        // Add heat-sink skyscrapers (tall cooling towers)
        for (let i = 0; i < 30; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = sphereRadius + 2;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Create tall, thin cooling tower
            const height = 20 + Math.random() * 40;
            const tower = BABYLON.MeshBuilder.CreateCylinder("tower", {
                height: height,
                diameter: 3,
                diameterTop: 1
            }, scene);

            tower.position = new BABYLON.Vector3(x, y, z);
            tower.lookAt(new BABYLON.Vector3(0, 0, 0));

            const towerMat = new BABYLON.StandardMaterial("towerMat", scene);
            towerMat.diffuseColor = new BABYLON.Color3(0.5, 0.4, 0.3);
            towerMat.specularColor = new BABYLON.Color3(0.7, 0.6, 0.5);
            towerMat.emissiveColor = new BABYLON.Color3(0.1, 0.05, 0.02); // Heat glow
            tower.material = towerMat;

            details.push(tower);
        }

        // Add some ruined/abandoned structures
        for (let i = 0; i < 15; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = sphereRadius + 1.5;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Create ruined building - partially collapsed
            const ruin = BABYLON.MeshBuilder.CreateBox("ruin", {
                width: 12 + Math.random() * 8,
                height: 15 + Math.random() * 20,
                depth: 8 + Math.random() * 6
            }, scene);

            ruin.position = new BABYLON.Vector3(x, y, z);

            const ruinMat = new BABYLON.StandardMaterial("ruinMat", scene);
            ruinMat.diffuseColor = new BABYLON.Color3(0.25, 0.2, 0.15);
            ruinMat.specularColor = new BABYLON.Color3(0.3, 0.25, 0.2);
            ruin.material = ruinMat;

            details.push(ruin);
        }

        return details;
    };

    const surfaceDetails = createSurfaceDetails();

    // --- MERCURY ZONE: Inner Sanctum ---
    const createMercuryZone = () => {
        const mercuryObjects = [];

        // The Sun's inner wall (blinding solar fire)
        const sunWall = BABYLON.MeshBuilder.CreateSphere("sunWall", { diameter: 100 }, scene);
        const sunWallMat = new BABYLON.StandardMaterial("sunWallMat", scene);
        sunWallMat.emissiveColor = new BABYLON.Color3(1, 0.8, 0.4);
        sunWallMat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        sunWall.material = sunWallMat;
        sunWall.isPickable = false;
        mercuryObjects.push(sunWall);

        // Scorching plasma effects around the sun
        for (let i = 0; i < 20; i++) {
            const plasma = new BABYLON.ParticleSystem("mercuryPlasma", 500, scene);
            plasma.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
            plasma.emitter = new BABYLON.Vector3(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200
            );
            plasma.minEmitBox = new BABYLON.Vector3(-10, -10, -10);
            plasma.maxEmitBox = new BABYLON.Vector3(10, 10, 10);
            plasma.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            plasma.color2 = new BABYLON.Color4(1, 0.8, 0.2, 1.0);
            plasma.minSize = 2;
            plasma.maxSize = 8;
            plasma.minLifeTime = 2.0;
            plasma.maxLifeTime = 5.0;
            plasma.emitRate = 200;
            plasma.start();
            mercuryObjects.push(plasma);
        }

        // Power conduits crisscrossing the space
        for (let i = 0; i < 15; i++) {
            const conduitLength = 200 + Math.random() * 100;
            const conduit = BABYLON.MeshBuilder.CreateCylinder("mercuryConduit", {
                height: conduitLength,
                diameter: 2
            }, scene);

            // Random orientation and position
            conduit.position = new BABYLON.Vector3(
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150
            );
            conduit.rotation.x = Math.random() * Math.PI;
            conduit.rotation.y = Math.random() * Math.PI;
            conduit.rotation.z = Math.random() * Math.PI;

            const conduitMat = new BABYLON.StandardMaterial("mercuryConduitMat", scene);
            conduitMat.emissiveColor = new BABYLON.Color3(0.8, 0.4, 0.1);
            conduitMat.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.1);
            conduit.material = conduitMat;

            mercuryObjects.push(conduit);
        }

        // Critical power junctions (defense objectives)
        const powerJunctions = [];
        for (let i = 0; i < 8; i++) {
            const junction = BABYLON.MeshBuilder.CreateBox("powerJunction", {
                width: 8, height: 8, depth: 8
            }, scene);

            junction.position = new BABYLON.Vector3(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );

            const junctionMat = new BABYLON.StandardMaterial("junctionMat", scene);
            junctionMat.emissiveColor = new BABYLON.Color3(0, 0.8, 1);
            junctionMat.diffuseColor = new BABYLON.Color3(0.2, 0.3, 0.4);
            junction.material = junctionMat;

            junction.metadata = { hp: 20, type: "powerJunction" };
            powerJunctions.push(junction);
            mercuryObjects.push(junction);
        }

        return { objects: mercuryObjects, junctions: powerJunctions };
    };

    let mercuryZone = null;

    // Zone transition function
    const transitionToZone = (newZone) => {
        if (gameState.zoneTransitioning) return;

        gameState.zoneTransitioning = true;

        // Hide current zone objects
        if (gameState.currentZone === ZONES.SPHERE) {
            dysonSphere.setEnabled(false);
            surfaceDetails.forEach(obj => obj.setEnabled(false));
            enemies.forEach(enemy => enemy.setEnabled(false));
        }

        // Show new zone objects
        if (newZone === ZONES.MERCURY) {
            if (!mercuryZone) {
                mercuryZone = createMercuryZone();
            }
            mercuryZone.objects.forEach(obj => obj.setEnabled(true));

            // Position ship near Mercury entrance
            shipRoot.position = new BABYLON.Vector3(0, 0, -50);
            shipRoot.lookAt(new BABYLON.Vector3(0, 0, 0));

            // Adjust lighting for Mercury's intense heat
            sunLight.intensity = 3.0;
            scene.clearColor = new BABYLON.Color3(0.1, 0.05, 0.02); // Reddish heat glow
        }

        gameState.currentZone = newZone;

        setTimeout(() => {
            gameState.zoneTransitioning = false;
        }, 1000);
    };

    // --- STRUCTURAL INTEGRITY SYSTEM ---
    const sectors = [];
    const SECTOR_COUNT = 24; // Like Earth's time zones but on sphere
    const sectorDamage = new Array(SECTOR_COUNT).fill(0);
    const SECTOR_MAX_DAMAGE = 100;

    // Create sector boundaries (invisible but tracked)
    for (let i = 0; i < SECTOR_COUNT; i++) {
        const sectorAngle = (i / SECTOR_COUNT) * 2 * Math.PI;
        sectors.push({
            angle: sectorAngle,
            damage: 0,
            collapsed: false,
            plasmaVents: []
        });
    }

    // Function to get sector for a position
    const getSectorIndex = (position) => {
        const angle = Math.atan2(position.y, position.x);
        const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
        return Math.floor((normalizedAngle / (2 * Math.PI)) * SECTOR_COUNT);
    };

    // Create plasma vent effect
    const createPlasmaVent = (position) => {
        const ventSystem = new BABYLON.ParticleSystem("plasmaVent", 1000, scene);
        ventSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
        ventSystem.emitter = position;
        ventSystem.minEmitBox = new BABYLON.Vector3(-2, -2, -2);
        ventSystem.maxEmitBox = new BABYLON.Vector3(2, 2, 2);
        ventSystem.color1 = new BABYLON.Color4(1, 0.3, 0, 1.0);
        ventSystem.color2 = new BABYLON.Color4(1, 0.8, 0.2, 1.0);
        ventSystem.colorDead = new BABYLON.Color4(0.5, 0.1, 0, 0.0);
        ventSystem.minSize = 0.5;
        ventSystem.maxSize = 3.0;
        ventSystem.minLifeTime = 1.0;
        ventSystem.maxLifeTime = 3.0;
        ventSystem.emitRate = 500;
        ventSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        ventSystem.direction1 = new BABYLON.Vector3(-1, -1, -1);
        ventSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
        ventSystem.minEmitPower = 2;
        ventSystem.maxEmitPower = 8;
        ventSystem.start();

        return ventSystem;
    };

    // Damage sector function
    const damageSector = (sectorIndex, damage) => {
        if (sectors[sectorIndex].collapsed) return;

        sectors[sectorIndex].damage += damage;
        sectorDamage[sectorIndex] = sectors[sectorIndex].damage;

        // Visual damage - change material emissiveness
        if (sectors[sectorIndex].damage > SECTOR_MAX_DAMAGE * 0.5) {
            // Start showing damage glow
            const damageGlow = sectors[sectorIndex].damage / SECTOR_MAX_DAMAGE;
            dysonMat.emissiveColor = new BABYLON.Color3(
                0.2 + damageGlow * 0.8,
                0.1 + damageGlow * 0.2,
                0.05
            );
        }

        // Sector collapse
        if (sectors[sectorIndex].damage >= SECTOR_MAX_DAMAGE && !sectors[sectorIndex].collapsed) {
            sectors[sectorIndex].collapsed = true;

            // Create plasma vents at random locations in this sector
            for (let i = 0; i < 3; i++) {
                const theta = (sectorIndex / SECTOR_COUNT) * 2 * Math.PI + (Math.random() - 0.5) * Math.PI / 6;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = sphereRadius + 2;

                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);

                const vent = createPlasmaVent(new BABYLON.Vector3(x, y, z));
                sectors[sectorIndex].plasmaVents.push(vent);
            }
        }
    };

    // --- 3. THE SHIP: "OBSIDIAN WING" ---
    // Parent Node handles Physics/Direction
    const shipRoot = new BABYLON.TransformNode("shipRoot", scene);
    shipRoot.position = new BABYLON.Vector3(0, 0, -350); // Start near the inner wall
    shipRoot.lookAt(new BABYLON.Vector3(0,0,0)); // Face the sun

    // Visual Mesh (Child) - The Relic Fighter
    const ship = BABYLON.MeshBuilder.CreateBox("ship", { width: 1, height: 1, depth: 4 }, scene);
    const shipMaterial = new BABYLON.StandardMaterial("obsidianMat", scene);
    shipMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1); // Obsidian Black
    shipMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    shipMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2); // Faint glow
    ship.material = shipMaterial;
    ship.parent = shipRoot;
    
    // S-Foils (The X-Wings)
    // Four wings, angled
    const wingGeom = { width: 3, height: 0.1, depth: 2 };
    const wingOffset = 0.8;
    const wingAngle = Math.PI / 6; // 30 degrees

    const wings = [];
    // Top Left
    const wingTL = BABYLON.MeshBuilder.CreateBox("wingTL", wingGeom, scene);
    wingTL.parent = ship;
    wingTL.position = new BABYLON.Vector3(-1.5, wingOffset, -1);
    wingTL.rotation.z = wingAngle;
    wingTL.material = shipMaterial;
    wings.push(wingTL);

    // Top Right
    const wingTR = BABYLON.MeshBuilder.CreateBox("wingTR", wingGeom, scene);
    wingTR.parent = ship;
    wingTR.position = new BABYLON.Vector3(1.5, wingOffset, -1);
    wingTR.rotation.z = -wingAngle;
    wingTR.material = shipMaterial;
    wings.push(wingTR);

    // Bottom Left
    const wingBL = BABYLON.MeshBuilder.CreateBox("wingBL", wingGeom, scene);
    wingBL.parent = ship;
    wingBL.position = new BABYLON.Vector3(-1.5, -wingOffset, -1);
    wingBL.rotation.z = -wingAngle;
    wingBL.material = shipMaterial;
    wings.push(wingBL);

    // Bottom Right
    const wingBR = BABYLON.MeshBuilder.CreateBox("wingBR", wingGeom, scene);
    wingBR.parent = ship;
    wingBR.position = new BABYLON.Vector3(1.5, -wingOffset, -1);
    wingBR.rotation.z = wingAngle;
    wingBR.material = shipMaterial;
    wings.push(wingBR);

    // Cockpit Details
    const cockpit = BABYLON.MeshBuilder.CreateBox("cockpit", { width: 1.0, height: 0.6, depth: 1.5}, scene);
    cockpit.position.y = 0.6;
    cockpit.position.z = 0.5;
    cockpit.material = new BABYLON.StandardMaterial("cockpitMat", scene);
    cockpit.material.emissiveColor = new BABYLON.Color3(0, 0.8, 1);
    cockpit.parent = ship;

    // Engine Trail (Multiple for X-wings)
    const createTrail = (parent, offset) => {
        const trail = new BABYLON.ParticleSystem("trail", 200, scene);
        trail.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
        trail.emitter = parent;
        // Adjust emitter box to be local to the wing
        trail.minEmitBox = offset;
        trail.maxEmitBox = offset;
        trail.color1 = new BABYLON.Color4(1.0, 0.5, 0.2, 1.0);
        trail.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
        trail.minSize = 0.2;
        trail.maxSize = 0.6;
        trail.minLifeTime = 0.1;
        trail.maxLifeTime = 0.3;
        trail.emitRate = 50;
        trail.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        return trail;
    };

    // Add trails to main body and wings
    const trails = [];
    trails.push(createTrail(ship, new BABYLON.Vector3(0, 0, -2)));
    
    // --- 4. CAMERA (Fixed Chase) ---
    const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -20), scene);
    camera.lockedTarget = shipRoot;
    camera.radius = 30; // Further back
    camera.heightOffset = 10; // Higher up
    camera.rotationOffset = 180;
    camera.cameraAcceleration = 0.1; // Stiffer follow (less lag/dizziness)
    camera.maxCameraSpeed = 50; // Reacts faster

    // --- 6. HUD INTERFACE ---
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Ship status panel
    const statusPanel = new BABYLON.GUI.Rectangle();
    statusPanel.width = "300px";
    statusPanel.height = "200px";
    statusPanel.color = "white";
    statusPanel.thickness = 2;
    statusPanel.background = "rgba(0, 0, 0, 0.7)";
    statusPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    statusPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    statusPanel.top = "10px";
    statusPanel.left = "10px";
    advancedTexture.addControl(statusPanel);

    // Ship status title
    const statusTitle = new BABYLON.GUI.TextBlock();
    statusTitle.text = "OBSIDIAN WING STATUS";
    statusTitle.color = "cyan";
    statusTitle.fontSize = 16;
    statusTitle.top = "-80px";
    statusPanel.addControl(statusTitle);

    // Shields bar
    const shieldsLabel = new BABYLON.GUI.TextBlock();
    shieldsLabel.text = "SHIELDS";
    shieldsLabel.color = "lightblue";
    shieldsLabel.fontSize = 12;
    shieldsLabel.top = "-50px";
    shieldsLabel.left = "-100px";
    statusPanel.addControl(shieldsLabel);

    const shieldsBar = new BABYLON.GUI.Rectangle();
    shieldsBar.width = "150px";
    shieldsBar.height = "15px";
    shieldsBar.color = "lightblue";
    shieldsBar.thickness = 1;
    shieldsBar.background = "rgba(0, 0, 50, 0.8)";
    shieldsBar.top = "-50px";
    shieldsBar.left = "50px";
    statusPanel.addControl(shieldsBar);

    const shieldsFill = new BABYLON.GUI.Rectangle();
    shieldsFill.width = "0px";
    shieldsFill.height = "13px";
    shieldsFill.color = "lightblue";
    shieldsFill.thickness = 0;
    shieldsFill.background = "lightblue";
    shieldsFill.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    shieldsBar.addControl(shieldsFill);

    // Hull bar
    const hullLabel = new BABYLON.GUI.TextBlock();
    hullLabel.text = "HULL";
    hullLabel.color = "green";
    hullLabel.fontSize = 12;
    hullLabel.top = "-25px";
    hullLabel.left = "-100px";
    statusPanel.addControl(hullLabel);

    const hullBar = new BABYLON.GUI.Rectangle();
    hullBar.width = "150px";
    hullBar.height = "15px";
    hullBar.color = "green";
    hullBar.thickness = 1;
    hullBar.background = "rgba(0, 50, 0, 0.8)";
    hullBar.top = "-25px";
    hullBar.left = "50px";
    statusPanel.addControl(hullBar);

    const hullFill = new BABYLON.GUI.Rectangle();
    hullFill.width = "0px";
    hullFill.height = "13px";
    hullFill.color = "green";
    hullFill.thickness = 0;
    hullFill.background = "green";
    hullFill.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    hullBar.addControl(hullFill);

    // Heat bar
    const heatLabel = new BABYLON.GUI.TextBlock();
    heatLabel.text = "HEAT";
    heatLabel.color = "orange";
    heatLabel.fontSize = 12;
    heatLabel.top = "0px";
    heatLabel.left = "-100px";
    statusPanel.addControl(heatLabel);

    const heatBar = new BABYLON.GUI.Rectangle();
    heatBar.width = "150px";
    heatBar.height = "15px";
    heatBar.color = "orange";
    heatBar.thickness = 1;
    heatBar.background = "rgba(50, 25, 0, 0.8)";
    heatBar.top = "0px";
    heatBar.left = "50px";
    statusPanel.addControl(heatBar);

    const heatFill = new BABYLON.GUI.Rectangle();
    heatFill.width = "0px";
    heatFill.height = "13px";
    heatFill.color = "orange";
    heatFill.thickness = 0;
    heatFill.background = "orange";
    heatFill.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    heatBar.addControl(heatFill);

    // Zone and mission info
    const zonePanel = new BABYLON.GUI.Rectangle();
    zonePanel.width = "250px";
    zonePanel.height = "120px";
    zonePanel.color = "white";
    zonePanel.thickness = 2;
    zonePanel.background = "rgba(0, 0, 0, 0.7)";
    zonePanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    zonePanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    zonePanel.top = "10px";
    zonePanel.right = "10px";
    advancedTexture.addControl(zonePanel);

    const zoneTitle = new BABYLON.GUI.TextBlock();
    zoneTitle.text = "MISSION STATUS";
    zoneTitle.color = "yellow";
    zoneTitle.fontSize = 16;
    zoneTitle.top = "-40px";
    zonePanel.addControl(zoneTitle);

    const zoneInfo = new BABYLON.GUI.TextBlock();
    zoneInfo.text = "ZONE: SPHERE\nENEMIES: 0\nSECTORS DAMAGED: 0/24";
    zoneInfo.color = "white";
    zoneInfo.fontSize = 12;
    zoneInfo.top = "10px";
    zonePanel.addControl(zoneInfo);

    // Controls panel
    const controlsPanel = new BABYLON.GUI.Rectangle();
    controlsPanel.width = "300px";
    controlsPanel.height = "150px";
    controlsPanel.color = "white";
    controlsPanel.thickness = 2;
    controlsPanel.background = "rgba(0, 0, 0, 0.7)";
    controlsPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    controlsPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    controlsPanel.bottom = "10px";
    controlsPanel.left = "10px";
    advancedTexture.addControl(controlsPanel);

    const controlsTitle = new BABYLON.GUI.TextBlock();
    controlsTitle.text = "CONTROLS";
    controlsTitle.color = "cyan";
    controlsTitle.fontSize = 16;
    controlsTitle.top = "-55px";
    controlsPanel.addControl(controlsTitle);

    const controlsText = new BABYLON.GUI.TextBlock();
    controlsText.text = "WASD: Pitch/Yaw\nArrows: Throttle\nSpace: Fire\nM: Enter Mercury\nEsc: Exit Mercury";
    controlsText.color = "white";
    controlsText.fontSize = 11;
    controlsText.top = "5px";
    controlsPanel.addControl(controlsText);

    // --- 5. THE ENEMY: "CORRODERS" (Replicators) ---
    const enemies = [];
    const swarmIntelligence = {
        lastReplication: 0,
        swarmDensity: 0,
        alertLevel: 0, // 0-1, increases with player presence
        communicationRadius: 50
    };

    // Enemy type definitions
    const ENEMY_TYPES = {
        MITE: {
            size: 2,
            hp: 1,
            speed: 2,
            color: new BABYLON.Color3(0.9, 0.8, 0.1), // Yellow-gold
            emissive: new BABYLON.Color3(0.5, 0.4, 0.05),
            behavior: "jumper",
            description: "Small units that jump onto cockpits",
            replicationCost: 2
        },
        PROCESSOR: {
            size: 6,
            hp: 3,
            speed: 0.5,
            color: new BABYLON.Color3(0.8, 0.1, 0.1), // Red
            emissive: new BABYLON.Color3(0.4, 0, 0),
            behavior: "tank",
            description: "Heavy units that devour hull plating",
            replicationCost: 5
        },
        ASSEMBLER: {
            size: 15,
            hp: 10,
            speed: 0.2,
            color: new BABYLON.Color3(0.1, 0.8, 0.1), // Green
            emissive: new BABYLON.Color3(0, 0.4, 0),
            behavior: "factory",
            description: "Massive factories that spawn Mites",
            replicationCost: 15
        }
    };

    // Swarm communication function
    const communicateWithSwarm = (enemy, enemies) => {
        const nearbyEnemies = enemies.filter(other =>
            other !== enemy &&
            other.position.subtract(enemy.position).length() < swarmIntelligence.communicationRadius
        );

        if (nearbyEnemies.length > 0) {
            // Swarm coordination - move towards average position of nearby enemies
            const avgPos = nearbyEnemies.reduce((sum, e) => sum.add(e.position), BABYLON.Vector3.Zero()).scale(1 / nearbyEnemies.length);
            const cohesionDir = avgPos.subtract(enemy.position).normalize().scale(0.3);
            return cohesionDir;
        }
        return BABYLON.Vector3.Zero();
    };

    // Replication function - swarm self-multiplies
    const attemptReplication = () => {
        if (Date.now() - swarmIntelligence.lastReplication < 5000) return; // 5 second cooldown
        if (enemies.length >= 150) return; // Population cap

        // Find a suitable parent to replicate
        const replicators = enemies.filter(e => e.metadata.behavior !== "factory");
        if (replicators.length === 0) return;

        const parent = replicators[Math.floor(Math.random() * replicators.length)];

        // Create offspring near parent
        const offset = new BABYLON.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        const spawnPos = parent.position.add(offset);

        // Determine offspring type (usually smaller/simpler)
        let offspringType = "MITE";
        if (parent.metadata.type === "PROCESSOR" && Math.random() < 0.7) {
            offspringType = "MITE";
        } else if (parent.metadata.type === "ASSEMBLER") {
            offspringType = Math.random() < 0.8 ? "MITE" : "PROCESSOR";
        }

        createCorroder(spawnPos, offspringType);
        swarmIntelligence.lastReplication = Date.now();
    };

    const createCorroder = (pos, type = "PROCESSOR") => {
        const enemyType = ENEMY_TYPES[type];
        const enemy = BABYLON.MeshBuilder.CreateBox("enemy", {size: enemyType.size}, scene);
        enemy.position = pos;
        enemy.lookAt(new BABYLON.Vector3(0,0,0));

        const enemyMat = new BABYLON.StandardMaterial(`enemyMat_${type}`, scene);
        enemyMat.diffuseColor = enemyType.color;
        enemyMat.emissiveColor = enemyType.emissive;
        enemy.material = enemyMat;

        enemy.metadata = {
            hp: enemyType.hp,
            maxHp: enemyType.hp,
            type: type,
            behavior: enemyType.behavior,
            speed: enemyType.speed,
            lastSpawn: 0,
            targetPos: null
        };

        enemies.push(enemy);
        return enemy;
    };

    // Spawn initial enemies with variety
    for(let i=0; i<60; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = sphereRadius;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        // Weighted random enemy type selection
        let enemyType = "PROCESSOR";
        const rand = Math.random();
        if (rand < 0.4) enemyType = "MITE";
        else if (rand < 0.8) enemyType = "PROCESSOR";
        else enemyType = "ASSEMBLER";

        createCorroder(new BABYLON.Vector3(x, y, z), enemyType);
    }

    // --- 6. WEAPONS (Quad Lasers) ---
    const lasers = [];
    const fireLaser = () => {
        // Fire from wingtips
        const wingTips = [
            new BABYLON.Vector3(-3, 1, 0),
            new BABYLON.Vector3(3, 1, 0),
            new BABYLON.Vector3(-3, -1, 0),
            new BABYLON.Vector3(3, -1, 0)
        ];
        
        wingTips.forEach(offset => {
            const laser = BABYLON.MeshBuilder.CreateCylinder("laser", {height: 8, diameter: 0.4}, scene);
            const laserPos = shipRoot.position.add(shipRoot.right.scale(offset.x)).add(shipRoot.up.scale(offset.y));
            
            laser.position = laserPos;
            const forward = shipRoot.forward.clone();
            laser.lookAt(laserPos.add(forward));
            laser.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);

            laser.material = new BABYLON.StandardMaterial("laserMat", scene);
            laser.material.emissiveColor = new BABYLON.Color3(0.1, 1, 0.2); // Plasma Green

            lasers.push({ mesh: laser, dir: forward, life: 40 });
        });
    };

    // --- 7. FLIGHT CONTROL & GAME LOOP ---
    const flightState = {
        speed: 0,
        maxSpeed: 5.0,
        acceleration: 0.05,
        deceleration: 0.99, // Less friction in space
        pitchSpeed: 0.03,
        yawSpeed: 0.03,
        rollSpeed: 0.05,
        bankAmount: 0,
        maxBank: Math.PI / 3
    };

    // Ship status
    const shipStatus = {
        shields: 100,
        maxShields: 100,
        hull: 100,
        maxHull: 100,
        heat: 0,
        maxHeat: 100
    };

    const input = { 
        up: false, down: false, left: false, right: false, // WASD
        throttleUp: false, throttleDown: false, // Arrows
        shoot: false 
    };

    // KEYBOARD MAPPING
    window.addEventListener("keydown", (e) => {
        switch(e.key.toLowerCase()) {
            case "w": input.up = true; break;
            case "s": input.down = true; break;
            case "a": input.left = true; break;
            case "d": input.right = true; break;
            case "arrowup": input.throttleUp = true; break;
            case "arrowdown": input.throttleDown = true; break;
            case " ": input.shoot = true; break;
            case "m": // Mercury zone transition
                if (gameState.currentZone === ZONES.SPHERE && shipRoot.position.length() < sphereRadius - 10) {
                    transitionToZone(ZONES.MERCURY);
                }
                break;
            case "escape": // Return to sphere
                if (gameState.currentZone === ZONES.MERCURY) {
                    // Re-enable sphere objects
                    dysonSphere.setEnabled(true);
                    surfaceDetails.forEach(obj => obj.setEnabled(true));
                    enemies.forEach(enemy => enemy.setEnabled(true));

                    // Hide Mercury objects
                    if (mercuryZone) {
                        mercuryZone.objects.forEach(obj => obj.setEnabled(false));
                    }

                    // Reset lighting
                    sunLight.intensity = 1.5;
                    scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.05);

                    gameState.currentZone = ZONES.SPHERE;

                    // Position ship back near sphere surface
                    shipRoot.position = new BABYLON.Vector3(0, 0, -350);
                }
                break;
        }
    });
    window.addEventListener("keyup", (e) => {
        switch(e.key.toLowerCase()) {
            case "w": input.up = false; break;
            case "s": input.down = false; break;
            case "a": input.left = false; break;
            case "d": input.right = false; break;
            case "arrowup": input.throttleUp = false; break;
            case "arrowdown": input.throttleDown = false; break;
            case " ": input.shoot = false; break;
        }
    });

    let fireCooldown = 0;

    scene.onBeforeRenderObservable.add(() => {
        const dt = engine.getDeltaTime() * 0.06; // Normalize time

        // 1. THROTTLE (Arrow Keys)
        if (input.throttleUp) flightState.speed += flightState.acceleration * dt;
        if (input.throttleDown) flightState.speed -= flightState.acceleration * dt;
        
        // Clamp Speed
        if (flightState.speed > flightState.maxSpeed) flightState.speed = flightState.maxSpeed;
        if (flightState.speed < 0) flightState.speed = 0; // No reverse for now

        // Trails
        if (flightState.speed > 0.1) {
            trails.forEach(t => t.start());
        } else {
            trails.forEach(t => t.stop());
        }

        // 2. STEERING (WASD)
        // Pitch (W/S)
        if (input.up) shipRoot.rotate(BABYLON.Axis.X, -flightState.pitchSpeed * dt, BABYLON.Space.LOCAL);
        if (input.down) shipRoot.rotate(BABYLON.Axis.X, flightState.pitchSpeed * dt, BABYLON.Space.LOCAL);

        // Yaw/Turn (A/D)
        if (input.left) shipRoot.rotate(BABYLON.Axis.Y, -flightState.yawSpeed * dt, BABYLON.Space.LOCAL);
        if (input.right) shipRoot.rotate(BABYLON.Axis.Y, flightState.yawSpeed * dt, BABYLON.Space.LOCAL);

        // 3. BANKING (Visual Roll)
        // When turning Left (A), roll Left.
        let targetBank = 0;
        if (input.left) targetBank = flightState.maxBank;
        if (input.right) targetBank = -flightState.maxBank;

        ship.rotation.z = BABYLON.Scalar.Lerp(ship.rotation.z, targetBank, 0.1 * dt);

        // 4. MOVE
        shipRoot.position.addInPlace(shipRoot.forward.scale(flightState.speed));

        // 5. COLLISIONS - Enhanced with surface details
        const dist = shipRoot.position.length();
        if (dist > sphereRadius - 5) {
            const normal = shipRoot.position.normalizeToNew();
            shipRoot.position = normal.scale(sphereRadius - 5);
            flightState.speed *= 0.5;
        }

        // Check collision with surface details
        for (const detail of surfaceDetails) {
            if (shipRoot.position.subtract(detail.position).length() < 8) {
                // Push ship away from structure
                const awayDir = shipRoot.position.subtract(detail.position).normalize();
                shipRoot.position.addInPlace(awayDir.scale(0.5));
                flightState.speed *= 0.7;
            }
        }

        // Check plasma vent hazards
        for (const sector of sectors) {
            if (sector.collapsed) {
                for (const vent of sector.plasmaVents) {
                    const ventPos = vent.emitter;
                    if (shipRoot.position.subtract(ventPos).length() < 15) {
                        // Ship is in plasma vent - take damage
                        shipStatus.shields -= 2 * dt;
                        shipStatus.heat += 1 * dt;

                        if (shipStatus.shields < 0) {
                            shipStatus.hull += shipStatus.shields; // Overflow damage to hull
                            shipStatus.shields = 0;
                        }

                        // Visual feedback - ship glows red when damaged
                        shipMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.1, 0.1);
                        setTimeout(() => {
                            shipMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                        }, 100);
                    }
                }
            }
        }

        // Clamp ship status values
        shipStatus.shields = Math.max(0, Math.min(shipStatus.maxShields, shipStatus.shields));
        shipStatus.hull = Math.max(0, Math.min(shipStatus.maxHull, shipStatus.hull));
        shipStatus.heat = Math.max(0, Math.min(shipStatus.maxHeat, shipStatus.heat));

        // Zone-specific mechanics
        if (gameState.currentZone === ZONES.MERCURY && mercuryZone) {
            // Heat damage in Mercury
            const distanceFromSun = shipRoot.position.length();
            const heatMultiplier = Math.max(0.1, 1 - (distanceFromSun / 80)); // Closer = more heat
            shipStatus.heat += heatMultiplier * dt;
            shipStatus.shields -= (heatMultiplier * 0.5) * dt;

            // Critical heat damage
            if (shipStatus.heat > 80) {
                shipStatus.hull -= (shipStatus.heat - 80) * 0.1 * dt;
            }

            // Power junction defense - spawn enemies targeting junctions
            if (Math.random() < 0.005) { // Occasional enemy spawns
                const junction = mercuryZone.junctions[Math.floor(Math.random() * mercuryZone.junctions.length)];
                const spawnPos = junction.position.add(
                    new BABYLON.Vector3(
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30
                    )
                );
                const enemy = createCorroder(spawnPos, Math.random() < 0.7 ? "MITE" : "PROCESSOR");

                // Make enemy target the junction instead of ship
                enemy.metadata.targetJunction = junction;
            }

            // Update junction-targeting enemies
            enemies.forEach(enemy => {
                if (enemy.metadata.targetJunction) {
                    const junction = enemy.metadata.targetJunction;
                    if (junction.metadata.hp > 0) {
                        const dirToJunction = junction.position.subtract(enemy.position).normalize();
                        enemy.position.addInPlace(dirToJunction.scale(enemy.metadata.speed * dt));

                        // Damage junction if close
                        if (enemy.position.subtract(junction.position).length() < 10) {
                            junction.metadata.hp -= 0.5 * dt;
                            if (junction.metadata.hp <= 0) {
                                // Junction destroyed - create explosion effect
                                const explosion = new BABYLON.ParticleSystem("explosion", 1000, scene);
                                explosion.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
                                explosion.emitter = junction.position;
                                explosion.minEmitBox = new BABYLON.Vector3(-5, -5, -5);
                                explosion.maxEmitBox = new BABYLON.Vector3(5, 5, 5);
                                explosion.color1 = new BABYLON.Color4(1, 0.3, 0, 1.0);
                                explosion.color2 = new BABYLON.Color4(1, 0.8, 0.2, 1.0);
                                explosion.minLifeTime = 0.5;
                                explosion.maxLifeTime = 2.0;
                                explosion.emitRate = 1000;
                                explosion.start();
                                setTimeout(() => explosion.dispose(), 3000);

                                junction.setEnabled(false);
                            }
                        }
                    }
                }
            });
        }

        // 6. ENEMY BEHAVIOR & SWARM INTELLIGENCE
        // Update swarm intelligence metrics
        swarmIntelligence.swarmDensity = enemies.length / 100; // Normalize to 0-1.5
        const shipPresence = Math.max(0, 1 - (shipRoot.position.length() - sphereRadius) / 50);
        swarmIntelligence.alertLevel = Math.min(1, swarmIntelligence.alertLevel + shipPresence * 0.01 * dt);

        // Attempt replication based on swarm density and alert level
        if (Math.random() < swarmIntelligence.swarmDensity * swarmIntelligence.alertLevel * 0.01) {
            attemptReplication();
        }

        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            const metadata = enemy.metadata;

            // Get swarm coordination vector
            const swarmVector = communicateWithSwarm(enemy, enemies);

            // Different behaviors based on type
            switch (metadata.behavior) {
                case "jumper": // Mites - jump towards ship with swarm coordination
                    if (shipRoot.position.subtract(enemy.position).length() < 50) {
                        const jumpDir = shipRoot.position.subtract(enemy.position).normalize();
                        const combinedDir = jumpDir.add(swarmVector).normalize();
                        enemy.position.addInPlace(combinedDir.scale(metadata.speed * dt));

                        // If close enough, attach to cockpit and damage ship
                        if (shipRoot.position.subtract(enemy.position).length() < 5) {
                            shipStatus.shields -= 0.5 * dt;
                            shipStatus.hull -= 0.2 * dt;
                            enemy.dispose();
                            enemies.splice(i, 1);
                            continue;
                        }
                    } else {
                        // When not hunting, swarm together
                        enemy.position.addInPlace(swarmVector.scale(metadata.speed * 0.5 * dt));
                    }
                    break;

                case "tank": // Processors - slow advance with formation
                    const dirToShip = shipRoot.position.subtract(enemy.position).normalize();
                    const formationDir = dirToShip.add(swarmVector).normalize();
                    enemy.position.addInPlace(formationDir.scale(metadata.speed * dt));
                    enemy.lookAt(shipRoot.position);
                    break;

                case "factory": // Assemblers - stationary but spawn based on swarm needs
                    const spawnRate = 3000 - (swarmIntelligence.alertLevel * 2000); // Faster spawning when threatened
                    if (Date.now() - metadata.lastSpawn > spawnRate) {
                        // Spawn a Mite nearby
                        const spawnPos = enemy.position.add(
                            new BABYLON.Vector3(
                                (Math.random() - 0.5) * 20,
                                (Math.random() - 0.5) * 20,
                                (Math.random() - 0.5) * 20
                            )
                        );
                        createCorroder(spawnPos, "MITE");
                        metadata.lastSpawn = Date.now();
                    }
                    break;
            }

            // Remove enemies that fall too far from sphere
            if (enemy.position.length() > sphereRadius + 100) {
                enemy.dispose();
                enemies.splice(i, 1);
            }
        }

        // 7. COMBAT
        if (input.shoot && fireCooldown <= 0) {
            fireLaser();
            fireCooldown = 8;
        }
        if (fireCooldown > 0) fireCooldown--;

        for (let i = lasers.length - 1; i >= 0; i--) {
            const laser = lasers[i];
            laser.mesh.position.addInPlace(laser.dir.scale(8 * dt));
            laser.life--;

            let hit = false;
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (laser.mesh.intersectsMesh(enemies[j], true)) {
                    // Damage enemy
                    enemies[j].metadata.hp -= 1;

                    if (enemies[j].metadata.hp <= 0) {
                        // Damage the sector where the enemy was destroyed
                        const sectorIndex = getSectorIndex(enemies[j].position);
                        damageSector(sectorIndex, 5); // Each kill damages sector

                        enemies[j].dispose();
                        enemies.splice(j, 1);
                    }

                    hit = true;
                    break;
                }
            }

            if (hit || laser.life <= 0) {
                laser.mesh.dispose();
                lasers.splice(i, 1);
            }
        }

        starSystem.emitter = shipRoot.position;

        // Update HUD
        const shieldsPercent = (shipStatus.shields / shipStatus.maxShields) * 100;
        shieldsFill.width = shieldsPercent + "%";

        const hullPercent = (shipStatus.hull / shipStatus.maxHull) * 100;
        hullFill.width = hullPercent + "%";

        const heatPercent = (shipStatus.heat / shipStatus.maxHeat) * 100;
        heatFill.width = heatPercent + "%";

        // Change bar colors based on status
        shieldsFill.background = shipStatus.shields < 30 ? "red" : "lightblue";
        hullFill.background = shipStatus.hull < 30 ? "red" : "green";
        heatFill.background = shipStatus.heat > 70 ? "red" : "orange";

        // Update zone info
        const damagedSectors = sectors.filter(s => s.collapsed).length;
        const zoneName = gameState.currentZone === ZONES.MERCURY ? "MERCURY (INNER SANCTUM)" : "AEGIS SHELL";
        zoneInfo.text = `ZONE: ${zoneName}\nENEMIES: ${enemies.length}\nSECTORS DAMAGED: ${damagedSectors}/24\nSWARM ALERT: ${swarmIntelligence.alertLevel.toFixed(2)}`;
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
