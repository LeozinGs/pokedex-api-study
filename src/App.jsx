import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import pokedexLogo from './assets/pokedex-logo.png';
import backgroundDoodle from './assets/pokemon-doodle.png';
import Banner from './components/Banner/Banner';
import Input from './components/Input/Input';
import Frame from './components/Frame/Frame';
import ContentContainer from './components/ContentContainer/ContentContainer';
import LoadingPage from './components/LoadingPage/LoadingPage';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [pokemonName, setPokemonName] = useState('');
  const [pokeInfo, setPokeInfo] = useState({
    id: "",
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
  const [currentId, setCurrentId] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const pokemonSearch = (id = pokemonName.toLowerCase()) => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokeInfo({
          id: response.data.id,
          name: response.data.forms[0].name,
          types: response.data.types,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          sp: response.data.stats[3].base_stat,
          sd: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          image: response.data.sprites.front_default,
          imageShiny: response.data.sprites.front_shiny
        });
        setPokemonExist(true);
        setCurrentId(response.data.id);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    pokemonSearch();
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

  const incrementId = () => {
    const newId = currentId + 1;
    setCurrentId(newId);
    setPokemonName(newId.toString()); // Atualiza o pokemonName com o novo ID
    pokemonSearch(newId); // Chama pokemonSearch sem passar parâmetros
  };

  const decrementId = () => {
    if (currentId > 1) {
      const newId = currentId - 1;
      setCurrentId(newId); // Atualiza o ID atual
      setPokemonName(newId.toString()); // Atualiza o pokemonName com o novo ID
      pokemonSearch(newId); // Passa o novo ID diretamente para a busca
    }
  };

  return (
    <div className="app">
      {isLoading ?
        <LoadingPage />
        :
        <>
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
                <div className="button-container">
                  <a href="#" className="change-button" onClick={decrementId}>Prev</a>
                  <a href="#" className="change-button" onClick={incrementId}>Next</a>
                </div>
                <h2>{firstUpperCase(pokeInfo.name)} #{pokeInfo.id}</h2>
                <Frame>
                  <div className="image-container">
                    <img src={!isShiny ? pokeInfo.image : pokeInfo.imageShiny} alt="Pokemon image" />
                    <div className="checkbox-container">
                      <input className='checkbox' type="checkbox" id='checkbox' onChange={() => setIsShiny(!isShiny)} />
                      <label htmlFor="checkbox">Shiny</label>
                    </div>
                  </div>
                </Frame>
                <div className="types" >
                  <h3 className="types-title">Types:</h3>
                  <div className="types-container">
                    {pokeInfo.types.map((type) => {
                      return <p key={Math.random() * 1000} className='types-item' style={{ background: `var(--clr-${type.type.name})` }}>{firstUpperCase(type.type.name)} {caseType(type.type.name)}</p>
                    })}
                  </div>
                </div>
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
              </>
              :
              ''
            }
          </div>
        </>
      }
    </div>
  );
}

export default App;
