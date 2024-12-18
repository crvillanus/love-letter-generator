import React, { useState } from 'react';
import axios from 'axios';

function LoveLetterForm() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'user', content: `Write a romantic love letter for ${recipient}. Message details: ${message}` },
          ],
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResult(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating letter:', error);
      setResult('Error generating the love letter. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Recipient's Name</label>
          <input
            type="text"
            className="form-control"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Name of your loved one"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message Details</label>
          <textarea
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write some details to personalize the letter"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Love Letter'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-white">
          <h4>Your Love Letter:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default LoveLetterForm;
