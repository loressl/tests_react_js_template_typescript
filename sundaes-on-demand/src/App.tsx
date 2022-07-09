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
        {/*Summary page and entry page need provider*/}
        <OrderEntry/>
      </OrderDetailsProvider>
      {/*confirmation page does not need provider*/}
    </Container>
  );
}

export default App;
