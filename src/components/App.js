import { useEffect, useState } from 'react';
import '../styles/App.scss';

//https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json

function App() {
  const [sentencesList, setSentencesList] = useState([]);
  const [sentenceSearch, setSentenceSearch] = useState('');
  const [characterSearch, setCharacterSearch] = useState('');

  const url = 'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json';

  //fetch
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSentencesList(data);
      });
  }, []);

  // event for filter 1: sentence search
  const handleSentenceSearch = (ev) => {
    setSentenceSearch(ev.target.value);
  };

  // event for filter 2: character search

  const handleCharacterSearch = (ev) => {
    setCharacterSearch(ev.target.value);
  }

  // render list

  const renderSentencesList = () => {
    return sentencesList
    // filter by character
      .filter((eachSentence) => eachSentence.character.toLowerCase().includes(characterSearch))
    // filter by sentence
      .filter((eachSentence) => eachSentence.quote.toLowerCase().includes(sentenceSearch.toLowerCase()))
    // render sentences
      .map((eachSentence, i) => {
        return (
          <li className='list__item' key={i}>
            <span>{eachSentence.quote}</span>
            <span> - </span>
            <span className='list__item--character'>{eachSentence.character}</span>
          </li>
        );
      });
  };

  return (
    <div>
      <header>
        <h1>Frases de Friends</h1>
        <hr />
      </header>
      <main>
        <form>
          <label htmlFor='sentence__filter'>Filtrar por frase</label>
          <input
            type='text'
            id='sentence__filter'
            name='sentence__filter'
            value={sentenceSearch}
            onInput={handleSentenceSearch}
          />
          <label htmlFor="characters">Filtrar por personaje</label>
          <select name="characters" id="characters" onChange={handleCharacterSearch} value={characterSearch}>
            <option value="">Todos</option>
            <option value="ross">Ross</option>
            <option value="monica">Monica</option>
            <option value="joey">Joey</option>
            <option value="phoebe">Phoebe</option>
            <option value="chandler">Chandler</option>
            <option value="rachel">Rachel</option>
          </select>
        </form>
        <ul>{renderSentencesList()}</ul>
      </main>
    </div>
  );
}

export default App;
