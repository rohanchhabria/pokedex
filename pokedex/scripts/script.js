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
const pokemonavatar = document.querySelectorAll('.pokemon-avatar');
const pokemonnumber = document.querySelectorAll('.pokemon-number');
const pokemonname = document.querySelectorAll('.pokemon-name');
const pokemontype = document.querySelectorAll('.pokemon-type');
const pokemonability = document.querySelectorAll('.pokemon-ability');

const animateeffect = document.querySelectorAll('.animate-effect');
const animatetext = document.querySelectorAll('.animate-text');

const pokemoncount = 102;
const cardcolors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
const colortypes = Object.keys(cardcolors);

const fetchpokemons = async() => {
    for(let id = 1; id <= pokemoncount; id++) {
       await getpokemon(id);
    }
}

const getpokemon = async(id) => {
    const apiurl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(apiurl);
    const data = await response.json();
    pokemoncard(data);
}

let pokeid, pokenumber, pokename, allabilities, alltypes;

const pokemoncard = (pokemondata) => {
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');

    pokeid = pokemondata.id;
    pokenumber = pokemondata.id.toString().padStart(3, '0');
    pokename = pokemondata.name;

    allabilities = `Abilites for ${pokemondata.name} are `;
    // console.log(pokemondata.abilities);
    for(ability in pokemondata.abilities) {
        // console.log(data.abilities[ability].ability.name);
        allabilities += pokemondata.abilities[ability].ability.name;
        allabilities += ', ';
    }
    allabilities = allabilities.substring(0, allabilities.length - 2) + '.';
    // console.log(allabilities);

    alltypes = pokemondata.types.map(type => type.type.name)[0];
    // console.log(alltypes);
    // console.log(colortypes);

    // pokemon.style.backgroundColor = cardcolors[alltypes];

        // pokemon.innerHTML = `<div class="pokemon-avatar animate-effect">
        //     <img src="https://pokeres.bastionbot.org/images/pokemon/${pokeid}.png" alt="${pokeid}" />
        // </div>
        // <div class="pokemon-info">
        //     <span class="pokemon-number animate-effect animate-text">#${pokenumber}</span>
        //     <h3 class="pokemon-name animate-effect animate-text">${pokename}</h3>
        //     <small class="pokemon-type animate-effect animate-text">type: <span>${alltypes}</span></small>
        // </div>
        // <div class="pokemon-ability">${allabilities}</div>`;

    pokemon.innerHTML = `
        <div class="pokemon-avatar animate-effect">
            &nbsp;
        </div>
        <div class="pokemon-info">
            <span class="pokemon-number animate-effect animate-text">&nbsp;</span>
            <h3 class="pokemon-name animate-effect animate-text">&nbsp;</h3>
            <small class="pokemon-type animate-effect animate-text">&nbsp;</small>
        </div>
        <div class="pokemon-ability">${allabilities}</div>`;

    pokemoncontainer.appendChild(pokemon);
}

// fetchpokemons();

// function renderdata() {
//     fetchpokemons();

//     const pokemonavatar = document.querySelector('.pokemon-avatar');
//     const pokemonnumber = document.querySelector('.pokemon-number');
//     const pokemonname = document.querySelector('.pokemon-name');
//     const pokemontype = document.querySelector('.pokemon-type');
//     const pokemonability = document.querySelector('.pokemon-ability');


//     pokemonavatar.forEach((element) => {
//         element.innerHTML = '<img src="https://pokeres.bastionbot.org/images/pokemon/1.png" alt="bulbasaur" />';
//     });
    
//     pokemonnumber.forEach((element) => {
//         element.innerHTML = '#001';
//     });

//     pokemonname.forEach((element) => {
//         element.innerHTML = 'bulbasaur';    
//     });
    
//     pokemontype.forEach((element) => {
//         element.innerHTML = `type: <span>grass</span>`;
//     });

//     pokemonability.forEach((element) => {
//         element.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.';
//         element.style.display = 'block';
//     });

//     animateeffect.forEach((element) => element.classList.remove('animate-effect'));
//     animatetext.forEach((element) => element.classList.remove('animate-text'));
// }

function renderdata() {
    fetchpokemons();

    pokemonavatar.forEach((element) => {
        console.log(element.innerHTML);
        element.innerHTML = `<img src="https://pokeres.bastionbot.org/images/pokemon/${pokeid}.png" alt="${pokeid}" />`;
    });
    
    pokemonnumber.forEach((element) => {
        element.innerHTML = '#' + pokenumber;
        console.log(pokenumber);
    });

    pokemonname.forEach((element) => {
        element.innerHTML = '';    
    });
    
    pokemontype.forEach((element) => {
        element.innerHTML = '';
    });

    pokemonability.forEach((element) => {
        element.innerHTML = '';
        element.style.display = 'block';
    });

    animateeffect.forEach((element) => element.classList.remove('animate-effect'));
    animatetext.forEach((element) => element.classList.remove('animate-text'));
}

// this will render the card data after two seconds.
setTimeout(renderdata, 2000)
