import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomQuoteMachine = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const { content, author } = response.data;
      setQuote(content);
      setAuthor(author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const testResult = () => {
    if(author ==='' && quote === ''){
      return (
        <div style={{color: 'red'}}>
        <h>Problem loading quote!!!!</h>
      </div>
      )
    }
  }

  const handleNewQuote = () => {
    fetchQuote();
  };

  const handleTweet = () => {
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box">
      {testResult()}
      <div id="text"><span>"</span>{quote}</div>
      <div id="author">- {author}</div>
      <div className='div--action'>
        <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
        <a id="tweet-quote" href="#" onClick={handleTweet}>Tweet Quote</a>
      </div>
    </div>
  );
};

export default RandomQuoteMachine;
