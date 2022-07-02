import './App.css';
import {Options} from './pages/entry/Options';
import { SummaryForm } from './pages/summary/SummaryForm';

function App() {
  return (
    <div className="App">
      <SummaryForm/>
      <br />
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
}

export default App;
