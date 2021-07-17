/* <div class="pokemon">
    <div class="pokemon-avatar">
        <img src="https://pokeres.bastionbot.org/images/pokemon/1.png" alt="bulbasaur" />
    </div>
    <div class="pokemon-info">
        <span class="pokemon-number">#001</span>
        <h3 class="pokemon-name">bulbasaur</h3>
        <small class="pokemon-type">type: <span>grass</span></small>
    </div>
    <div class="pokemon-ability">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.
    </div>
</div> */

const pokemoncontainer = document.querySelector('.pokemon-container');
const pokemoncount = 102;

const getpokemons = async () => {
    let pokemons = [];

    for (let id = 1; id <= pokemoncount; id++) {
        const apiurl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(apiurl);
        const data = await response.json();

        // let abilities = `Abilites for ${pokemon.name} are `;
        let abilities = '';
        for(ability in data.abilities) {
            // console.log(data.abilities[ability].ability.name);
            abilities += data.abilities[ability].ability.name;
            abilities += ', ';
        }
        abilities = abilities.substring(0, abilities.length - 2) + '.';

        const pokemondata = {
            id: data.id,
            number: '#' + data.id.toString().padStart(3, '0'),
            name: data.name,
            abilities: abilities,
            type: data.types.map(type => type.type.name)[0]
        }

        pokemons.push(pokemondata);
    }

    return pokemons;
}

function renderskeletons(count) {
    let skeletons = "";

    for (let i = 0; i < count; i++) {
        let skeleton = `
            <div class='pokemon'>
                <div class="pokemon-avatar animate-effect">
                    &nbsp;
                </div>
                <div class="pokemon-info">
                    <span class="pokemon-number animate-effect animate-text">&nbsp;</span>
                    <h3 class="pokemon-name animate-effect animate-text">&nbsp;</h3>
                    <small class="pokemon-type animate-effect animate-text">&nbsp;</small>
                </div>
                <div class="pokemon-ability"></div>
            </div>`;

        skeletons += skeleton;
    }

    pokemoncontainer.innerHTML = skeletons;
}

function rendercards(pokemons) {
    // console.log(pokemons);
    let cards = "";

    for (let pokemon of pokemons) {
        let card = `<div class="pokemon">
            <div class="pokemon-avatar">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}" />
            </div>
            <div class="pokemon-info">
                <span class="pokemon-number">${pokemon.number}</span>
                <h3 class="pokemon-name">${pokemon.name}</h3>
                <small class="pokemon-type">${pokemon.type}</small>
            </div>
            <div class="pokemon-ability" id="pokemon-ability" style="display: block">Abilites for ${pokemon.name} are ${pokemon.abilities}</div>
        </div>`;

        cards += card;
    }

    pokemoncontainer.innerHTML = cards
}


(async () => {
    renderskeletons(pokemoncount);
    let data = await getpokemons();
    rendercards(data);
})();
