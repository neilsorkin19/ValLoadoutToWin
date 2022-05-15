const maps = ["Ascent", "Bind", "Breeze", "Fracture", "Haven", "Icebox", "Split"]

// 18 agents as of 3/8/22
const agents = ["Astra", "Breach", "Brimstone", "Chamber", "Cypher", "Jett", "KAYO", "Killjoy", "Neon", "Omen", "Phoenix", "Raze", "Reyna", "Sage", "Skye", "Sova", "Viper", "Yoru"]
const weapons = ["Ares", "Bucky", "Bulldog", "Classic", "Frenzy", "Ghost", "Guardian", "Judge", "Marshal", "Melee", "Odin", "Operator", "Phantom", "Sheriff", "Shorty", "Spectre", "Stinger", "Vandal"]


const body = document.body

function tableCreate() {
    let tbl = document.getElementById('loadouts');

    // attackers and defenders headers
    const top_row = tbl.insertRow()
    // set attacker header
    const attacker_cell = document.createElement("div")
    const attacker_hover_box = document.createElement("span")
    attacker_hover_box.title = "Red is the team that started on attack."
    attacker_hover_box.className += "tooltip"
    const attacker_text = document.createTextNode("Red")
    const attacker_rounds = document.createElement("input")
    const attacker_prob_text = document.createElement("div")
    attacker_prob_text.id = "attacker_prob"

    attacker_rounds.setAttribute("type", "number")
    attacker_rounds.setAttribute("min", "0")
    attacker_rounds.setAttribute("placeholder", "Round wins")
    attacker_rounds.className += "sides_elems"
    attacker_cell.className += "attackers"
    attacker_hover_box.appendChild(attacker_text)
    attacker_cell.appendChild(attacker_hover_box)
    attacker_cell.appendChild(attacker_rounds)
    attacker_cell.appendChild(attacker_prob_text)
    top_row.insertCell().appendChild(attacker_cell)

    // set defender header
    const defender_cell = document.createElement("div")
    const defender_hover_box = document.createElement("span")
    defender_hover_box.title = "Blue is the team that started on defense."
    defender_hover_box.className += "tooltip"
    const defender_text = document.createTextNode("Blue")
    const defender_rounds = document.createElement("input")
    const defender_prob_text = document.createElement("div")
    defender_prob_text.id = "defender_prob"

    defender_rounds.setAttribute("type", "number")
    defender_rounds.setAttribute("min", "0")
    defender_rounds.setAttribute("placeholder", "Round wins")
    defender_rounds.className += "sides_elems"
    defender_cell.className += "defenders"
    defender_hover_box.appendChild(defender_text)
    defender_cell.appendChild(defender_hover_box)
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

            // select your main_weapon
            const select_weapon = document.createElement("select")
            weapons.forEach(weapon => {
                    const el = document.createElement("option")
                    el.textContent = weapon
                    el.value = weapon
                    select_weapon.appendChild(el)
                }
            )
            td.appendChild(select_weapon);

            // loadout value, weapon, shield, remaining, spent

            // add bank
            const loadout_value = document.createElement("input")
            loadout_value.setAttribute("type", "number")
            loadout_value.setAttribute("min", "0")
            loadout_value.setAttribute("max", "9000")
            loadout_value.setAttribute("step", "50")
            loadout_value.setAttribute("placeholder", "Loadout Value")
            loadout_value.setAttribute("style", "width: 100px")
            td.appendChild(loadout_value)

            // add shield
            const shield = document.createElement("input")
            shield.setAttribute("type", "number")
            shield.setAttribute("min", "0")
            shield.setAttribute("max", "50")
            shield.setAttribute("step", "25")
            shield.setAttribute("placeholder", "Shield")
            td.appendChild(shield)

            // better table spacing
            td.appendChild(document.createElement("br"));

            // add bank
            const bank = document.createElement("input")
            bank.setAttribute("type", "number")
            bank.setAttribute("min", "0")
            bank.setAttribute("max", "9000")
            bank.setAttribute("step", "50")
            bank.setAttribute("placeholder", "Bank")
            td.appendChild(bank)

            // add round spend
            const spent = document.createElement("input")
            spent.setAttribute("type", "number")
            spent.setAttribute("min", "0")
            spent.setAttribute("max", "9000")
            spent.setAttribute("step", "50")
            spent.setAttribute("placeholder", "Spent")
            td.appendChild(spent)

            const kda = ["K", "D", "A"]
            for (const metric of kda) {
                const field = document.createElement("input")
                field.setAttribute("type", "number")
                field.setAttribute("min", "0")
                field.setAttribute("max", "99")
                field.setAttribute("placeholder", metric)
                td.appendChild(field)
            }
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

async function loadModel() {
    let model = await tf.loadLayersModel("tfjs_model/model.json");
    console.log("model loaded")
    const in_val = tf.linspace(0.1, 0.1, 441).reshape([-1, 441]);
    const output = model.predict(in_val)
    const outputData = output.dataSync();
    console.log(outputData)
}

loadModel();

function get_inputs() {
    // red_loadout, blue_loadout, red_wins / 13, blue_wins / 13, round_num_to_atk_def(r["roundNum"]), overtime, map_vector
    // red_loadout[0] -> [loadoutValue, armor, remaining, spent, weapon_vec, agent_vec, kda]

}

function round_num_to_atk_def(round_num) {
    // Returns 0 if red is attacking, 1 if red is defending.
// zero-indexed rounds
    if (round_num < 12) {
        return 0
    } else if (12 <= round_num < 24) {
        return 1
    } else if (24 <= round_num) {
        return round_num % 2
    }
}
