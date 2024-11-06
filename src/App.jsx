import { useState } from 'react';
import './App.css';
import Axios from 'axios';
import pokedexLogo from './assets/pokedex-logo.png';
import backgroundDoodle from './assets/pokemon-doodle.png';
import Banner from './components/Banner/Banner';
import Input from './components/Input/Input';
import Frame from './components/Frame/Frame';
import ContentContainer from './components/ContentContainer/ContentContainer';

const App = () => {

  const [pokemonName, setPokemonName] = useState('');
  const [pokeInfo, setPokeInfo] = useState({
    name: "",
    type: "",
    type2: "",
    hp: "",
    attack: "",
    defense: "",
    sp: "",
    sd: "",
    speed: "",
    image: "",
  });
  const [isShiny, setIsShiny] = useState(false);
  const [pokemonExist, setPokemonExist] = useState(false);

  const PokemonSearch = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        console.log(response);
        setPokeInfo(response.data.types.length < 2 ? {
          name: response.data.forms[0].name,
          type: response.data.types[0].type.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          sp: response.data.stats[3].base_stat,
          sd: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          image: response.data.sprites.front_default,
          imageShiny: response.data.sprites.front_shiny,
        }
          :
          {
            name: response.data.forms[0].name,
            type: response.data.types[0].type.name,
            type2: response.data.types[1].type.name,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            sp: response.data.stats[3].base_stat,
            sd: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat,
            image: response.data.sprites.front_default,
            imageShiny: response.data.sprites.front_shiny,
          });
        setPokemonExist(true);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    PokemonSearch();
  }

  const firstUpperCase = (word) => {
    const wordUpperCase = word.charAt(0).toUpperCase() + word.slice(1);

    return wordUpperCase;
  }

  const caseType = (type) => {
    switch (type) {
      case 'fire':
        return '🔥';

      case 'electric':
        return '⚡️';

      case 'grass':
        return '🍃';

      case 'water':
        return '🌊';

      case 'ground':
        return '⛰️';

      case 'rock':
        return '🪨';

      case 'dragon':
        return '🐲';

      case 'fairy':
        return '🦋';

      case 'ghost':
        return '👻';

      case 'bug':
        return '🐛';

      case 'poison':
        return '🧪';

      case 'flying':
        return '🪽';

      case 'fighting':
        return '👊🏽'

      case 'normal':
        return '🔘';

      case 'steel':
        return '⛓️';

      case 'psychic':
        return '🔮';

      case 'ice':
        return '🧊';

      case 'dark':
        return '🌑';

      case '':
        return '';

    }
  }

  const handleChange = (e) => {
    setPokemonName(e.target.value);
  }

  return (
    <div className="app">
      <Banner
        image={pokedexLogo}
        background={backgroundDoodle}
      >
        <Input
          getValue={handleChange}
          submit={handleSubmit}
        >
          Search by name or id
        </Input>
      </Banner>
      <div className="main">
        {pokemonExist ?
          <>
            <Frame>
              <div className="image-container">
                <img src={!isShiny ? pokeInfo.image : pokeInfo.imageShiny} alt="Pokemon image" />
                <div className="checkbox-container">
                  <input className='checkbox' type="checkbox" id='checkbox' onChange={() => setIsShiny(!isShiny)} />
                  <label htmlFor="checkbox">Shiny</label>
                </div>
                <div className="types" >
                  <p className="type" style={{ background: `var(--clr-${pokeInfo.type})` }}>{firstUpperCase(pokeInfo.type)} {caseType(pokeInfo.type)}</p>
                  <p className="type" style={{ background: `var(--clr-${pokeInfo.type2})` }}>{pokeInfo.type2 == undefined ? '' : firstUpperCase(pokeInfo.type2)} {pokeInfo.type2 == undefined ? '' : caseType(pokeInfo.type2)}</p>
                </div>
                <h2>{firstUpperCase(pokeInfo.name)}</h2>
              </div>
            </Frame>
          </>
          :
          ''
        }
        <ContentContainer
          title={'Stats'}
        >
          <>
            <li className="list-item">HP: <span>{pokeInfo.hp}</span></li>
            <li className="list-item">AT: <span>{pokeInfo.attack}</span></li>
            <li className="list-item">DEF: <span>{pokeInfo.defense}</span></li>
            <li className="list-item">SPAT: <span>{pokeInfo.sp}</span></li>
            <li className="list-item">SPDEF: <span>{pokeInfo.sd}</span></li>
            <li className="list-item">SPEED: <span>{pokeInfo.speed}</span></li>
          </>
        </ContentContainer>
      </div>
    </div>
  );
}

export default App;
