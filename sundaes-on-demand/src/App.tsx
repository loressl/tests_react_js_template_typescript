import './App.css';
import { Container } from 'react-bootstrap'
import { OrderEntry } from './pages/entry/OrderEntry';
import { SummaryForm } from './pages/summary/SummaryForm';
import { OrderDetailsProvider } from './context/OrderDetails';

function App() {
  return (
    <Container>
      <SummaryForm/>
      <br />
      <OrderDetailsProvider>
        <OrderEntry/>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
