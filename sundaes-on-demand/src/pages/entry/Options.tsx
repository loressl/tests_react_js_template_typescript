import axios from 'axios';
import { useEffect, useState } from 'react';
import {Row} from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import {AlertBanner} from '../common/AlertBanner'
import { useOrderDetails } from '../../context/OrderDetails';

type OptionsProps = {
    optionType: string
}

interface Item {
    name: string
    imagePath: string
}

export function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()

  console.log(orderDetails)
  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
    .get(`http://localhost:3030/${optionType}`)
    .then((response) => setItems(response.data))
    .catch((error) => setError(true));
  }, [optionType]);

  if(error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items?.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}