import axios from 'axios';
import { useEffect, useState } from 'react';
import {Row} from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

type OptionsProps = {
    optionType: string
}

interface Item {
    name: string
    imagePath: string
}

export function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<Item[]>([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
    .get(`http://localhost:3030/${optionType}`)
    .then((response) => setItems(response.data))
    .catch((error) => {
      // TODO: handle error response
    });
      // let unmounted = false
      // const loadScoops = async () => {
      //     await axios
      //     .get(`http://localhost:3030/${optionType}`)
      //     .then((response) => setItems(response.data))
      //     .catch((error) => {
      //       // TODO: handle error response
      //     });
      // }
      // loadScoops()

      // return () => {
      //   unmounted = true
      // }
  }, [optionType]);

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