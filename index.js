const maps = ["Ascent", "Bind", "Breeze", "Fracture", "Haven", "Icebox", "Split"]

// 18 agents as of 3/8/22
const agents = ["Astra", "Breach", "Brimstone", "Chamber", "Cypher", "Jett", "KAYO", "Killjoy", "Neon", "Omen", "Phoenix", "Raze", "Reyna", "Sage", "Skye", "Sova", "Viper", "Yoru"]
const sidearms = ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff", "None"] // none for knife players
const main_weapons = ["None", "Stinger", "Spectre", "Bucky", "Judge", "Bulldog", "Guardian", "Phantom", "Vandal", "Marshal", "Operator", "Ares", "Odin"]


const body = document.body

function tableCreate() {
    let tbl = document.getElementById('loadouts');

    // attackers and defenders headers
    const top_row = tbl.insertRow()
    // set attacker header
    const attacker_cell = document.createElement("div")
    const attacker_text = document.createTextNode("Attackers")
    const attacker_rounds = document.createElement("input")
    const attacker_prob_text = document.createElement("div")
    attacker_prob_text.id = "attacker_prob"

    attacker_rounds.setAttribute("type", "number")
    attacker_rounds.setAttribute("min", "0")
    attacker_rounds.setAttribute("placeholder", "Round wins")
    attacker_rounds.className += "sides_elems"
    attacker_cell.className += "attackers"
    attacker_cell.appendChild(attacker_text)
    attacker_cell.appendChild(attacker_rounds)
    attacker_cell.appendChild(attacker_prob_text)
    top_row.insertCell().appendChild(attacker_cell)

    // set defender header
    const defender_cell = document.createElement("div")
    const defender_text = document.createTextNode("Defenders")
    const defender_rounds = document.createElement("input")
    const defender_prob_text = document.createElement("div")
    defender_prob_text.id = "defender_prob"

    defender_rounds.setAttribute("type", "number")
    defender_rounds.setAttribute("min", "0")
    defender_rounds.setAttribute("placeholder", "Round wins")
    defender_rounds.className += "sides_elems"
    defender_cell.className += "defenders"
    defender_cell.appendChild(defender_text)
    defender_cell.appendChild(defender_rounds)
    defender_cell.appendChild(defender_prob_text)
    top_row.insertCell().appendChild(defender_cell)

    // 5 agents
    for (let i = 0; i < 5; i++) {
        const tr = tbl.insertRow();
        // attack and defense
        for (let j = 0; j < 2; j++) {
            const td = tr.insertCell();

            // display agent
            const image_agent = document.createElement("img")
            image_agent.setAttribute("src", "agent_images/Astra.png")
            image_agent.id = "img_" + j + i // unique image id
            td.appendChild(image_agent);

            // select your agent
            const select_agent = document.createElement("select")
            select_agent.id = "agent_" + j + i // unique image id
            select_agent.setAttribute("onchange", "changeImage(this)")

            agents.forEach(agent => {
                    const el = document.createElement("option")
                    el.textContent = agent
                    el.value = agent
                    select_agent.appendChild(el)
                }
            )
            td.appendChild(select_agent);

            // select your sidearm
            const select_sidearm = document.createElement("select")
            sidearms.forEach(sidearm => {
                    const el = document.createElement("option")
                    el.textContent = sidearm
                    el.value = sidearm
                    select_sidearm.appendChild(el)
                }
            )
            td.appendChild(select_sidearm);

            // select your main_weapon
            const select_main_weapon = document.createElement("select")
            main_weapons.forEach(main_weapon => {
                    const el = document.createElement("option")
                    el.textContent = main_weapon
                    el.value = main_weapon
                    select_main_weapon.appendChild(el)
                }
            )
            td.appendChild(select_main_weapon);

            // add shield
            const shield = document.createElement("input")
            shield.setAttribute("type", "number")
            shield.setAttribute("min", "0")
            shield.setAttribute("max", "50")
            shield.setAttribute("placeholder", "Shield")
            td.appendChild(shield)

            // add bank
            const bank = document.createElement("input")
            bank.setAttribute("type", "number")
            bank.setAttribute("min", "0")
            bank.setAttribute("max", "9000")
            bank.setAttribute("placeholder", "Bank")
            td.appendChild(bank)
        }
    }
}

// when we change the agent in the dropdown, change the image next to it
function changeImage(dropdown) {
    const image_id = dropdown.id.slice(-2) // get last 2 chars
    const imageElem = document.getElementById("img_" + image_id)
    imageElem.setAttribute("src", "agent_images/" + dropdown.value + ".png")
}

// calculates the odds for each side winning the round and game
function calculate() {
    const attack_prob_elem = document.getElementById("attacker_prob")
    const defender_prob_elem = document.getElementById("defender_prob")
    const attack_round_prob = Math.random() * 100;
    const attack_match_prob = Math.random() * 100;
    attack_prob_elem.textContent = "Round: " + attack_round_prob.toFixed(2) + "%, Match: " + attack_match_prob.toFixed(2) + "%"
    defender_prob_elem.textContent = "Round: " + (100 - attack_round_prob).toFixed(2) + "%, Match: " + (100 - attack_match_prob).toFixed(2) + "%"
}

// select your map
const select_map = document.getElementById("select_map")
maps.forEach(map => {
        const el = document.createElement("option")
        el.textContent = map
        el.value = map
        select_map.appendChild(el)
    }
)

tableCreate();
