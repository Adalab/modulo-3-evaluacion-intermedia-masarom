import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const [quotesList, setQuotesList] = useState([]);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [characterSearch, setCharacterSearch] = useState('');
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });

  const url = 'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json';

  //fetch
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuotesList(data);
      });
  }, []);

  // event for filter 1: quote search
  const handleQuoteSearch = (ev) => {
    setQuoteSearch(ev.target.value);
  };

  // event for filter 2: character search

  const handleCharacterSearch = (ev) => {
    setCharacterSearch(ev.target.value);
  };

  // events for BONUS: add new quote
  const handleNewQuote = (ev) => {
    const clonedNewquote = { ...newQuote };
    clonedNewquote[ev.target.id] = ev.target.value;
    setNewQuote(clonedNewquote);
  };

  const handleAddNewQuote = (ev) => {
    ev.preventDefault();
    setQuotesList([...quotesList, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };

  // render list

  const renderQuotesList = () => {
    return (
      quotesList
        // filter by character
        .filter((eachQuote) => eachQuote.character.toLowerCase().includes(characterSearch))
        // filter by quote
        .filter((eachQuote) => eachQuote.quote.toLowerCase().includes(quoteSearch.toLowerCase()))
        // render quotes
        .map((eachQuote, i) => {
          return (
            <li className='list__item' key={i}>
              <span>{eachQuote.quote}</span>
              <span> - </span>
              <span className='list__item--character'>{eachQuote.character}</span>
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
          <label htmlFor='quote__filter'>Filtrar por frase</label>
          <input
            type='text'
            id='quote__filter'
            name='quote__filter'
            value={quoteSearch}
            onInput={handleQuoteSearch}
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
        <ul>{renderQuotesList()}</ul>
        <section>
          <h2>Añadir nueva frase</h2>
          <form>
            <label htmlFor='quote'>Frase</label>
            <input type='text' id='quote' value={newQuote.quote} onInput={handleNewQuote} />
            <label htmlFor='character'>Personaje</label>
            <input type='text' id='character' value={newQuote.character} onInput={handleNewQuote} />
            <input type='submit' value='Añadir una nueva frase' onClick={handleAddNewQuote} />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
