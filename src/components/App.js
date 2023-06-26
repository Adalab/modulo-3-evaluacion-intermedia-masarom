import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const [sentencesList, setSentencesList] = useState([]);
  const [sentenceSearch, setSentenceSearch] = useState('');
  const [characterSearch, setCharacterSearch] = useState('');
  const [newSentence, setNewSentence] = useState({
    quote: '',
    character: '',
  });

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
  };

  // events for BONUS: add new sentence
  const handleNewSentence = (ev) => {
    const clonedNewSentence = { ...newSentence };
    clonedNewSentence[ev.target.id] = ev.target.value;
    setNewSentence(clonedNewSentence);
  };

  const handleAddNewSentence = (ev) => {
    ev.preventDefault();
    setSentencesList([...sentencesList, newSentence]);
    setNewSentence({
      quote: '',
      character: '',
    });
  };

  // render list

  const renderSentencesList = () => {
    return (
      sentencesList
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
        })
    );
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
          <label htmlFor='characters'>Filtrar por personaje</label>
          <select name='characters' id='characters' onChange={handleCharacterSearch} value={characterSearch}>
            <option value=''>Todos</option>
            <option value='ross'>Ross</option>
            <option value='monica'>Monica</option>
            <option value='joey'>Joey</option>
            <option value='phoebe'>Phoebe</option>
            <option value='chandler'>Chandler</option>
            <option value='rachel'>Rachel</option>
          </select>
        </form>
        <ul>{renderSentencesList()}</ul>
        <section>
          <h2>Añadir nueva frase</h2>
          <form>
            <label htmlFor='quote'>Frase</label>
            <input type='text' id='quote' value={newSentence.quote} onInput={handleNewSentence} />
            <label htmlFor='character'>Personaje</label>
            <input type='text' id='character' value={newSentence.character} onInput={handleNewSentence} />
            <input type='submit' value='Añadir una nueva frase' onClick={handleAddNewSentence} />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
