import { useEffect, useState } from 'react';
import '../styles/App.scss';

//https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json

function App() {
  const [sentencesList, setSentencesList] = useState([]);
  const [sentenceSearch, setSentenceSearch] = useState('');

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

  // render list

  const renderSentencesList = () => {
    return sentencesList
      .filter((eachSentence) => eachSentence.quote.toLowerCase().includes(sentenceSearch.toLowerCase()))
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
        </form>
        <ul>{renderSentencesList()}</ul>
      </main>
    </div>
  );
}

export default App;
