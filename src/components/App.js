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
      })
      .catch((error) => alert(`Ha sucedido un error en la conexión con el servidor. Por favor, recarga la página o espera unos minutos para volver a intentarlo`));
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
            <li className='quote__list--item' key={i}>
              <span>{eachQuote.quote}</span>
              <span> - </span>
              <span className='list__item character'>{eachQuote.character}</span>
            </li>
          );
        })
    );
  };

  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>· Frases de Friends ·</h1>
      </header>
      <main className='main'>
        <form className='form__filters'>
          <fieldset className='form__fieldset'>
            <label className='form__label' htmlFor='quote__filter'>
              Filtrar por frase
            </label>
            <input
              type='text'
              className='form__filters--input'
              id='quote__filter'
              name='quote__filter'
              value={quoteSearch}
              onInput={handleQuoteSearch}
            />
            <label className='form__label' htmlFor='characters'>
              Filtrar por personaje
            </label>
            <select
              name='characters'
              className='form__filters--select'
              id='characters'
              onChange={handleCharacterSearch}
              value={characterSearch}
            >
              <option value=''>Todos</option>
              <option value='ross'>Ross</option>
              <option value='monica'>Monica</option>
              <option value='joey'>Joey</option>
              <option value='phoebe'>Phoebe</option>
              <option value='chandler'>Chandler</option>
              <option value='rachel'>Rachel</option>
            </select>
          </fieldset>
        </form>
        <ul className='quote__list'>{renderQuotesList()}</ul>
        <section>
          <h2 className='new-quote__title'>Nueva frase</h2>
          <form className='form__add'>
            <fieldset className='form__fieldset add-new'>
              <label htmlFor='quote' className='form__label'>
                Frase
              </label>
              <input
                type='text'
                className='form__add--input'
                id='quote'
                value={newQuote.quote}
                onInput={handleNewQuote}
              />
              <label htmlFor='character' className='form__label'>
                Personaje
              </label>
              <input
                type='text'
                className='form__add--input'
                id='character'
                value={newQuote.character}
                onInput={handleNewQuote}
              />
              <input
                type='submit'
                className='form__add--btn'
                value='Añadir una nueva frase'
                onClick={handleAddNewQuote}
              />
            </fieldset>
          </form>
        </section>
      </main>
      <footer className='footer'>Adalab &copy;2023</footer>
    </div>
  );
}

export default App;
