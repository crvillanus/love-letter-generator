import { useState } from "react";
import LoveLetterForm from './components/LoveLetterForm';

function App() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Generador de Cartas de Amor</h1>
      <LoveLetterForm />
    </div>
  );
}

export default App;