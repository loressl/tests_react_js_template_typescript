import {Col} from 'react-bootstrap';

type ToppingOptionProps = {
    name: string
    imagePath: string
}

export default function ToppingOption({ name, imagePath }: ToppingOptionProps) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}