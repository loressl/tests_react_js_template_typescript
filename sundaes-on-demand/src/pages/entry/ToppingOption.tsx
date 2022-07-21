import { Col, Form } from 'react-bootstrap';

type ToppingOptionProps = {
  name: string
  imagePath: string
  updateItemCount: (itemName: string, newItemCount: string, optionType?: string) => void
}

export default function ToppingOption({ name, imagePath, updateItemCount }: ToppingOptionProps) {

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-topping-checkbox`}
      >
        <Form.Check
          type='checkbox'
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? '1':'0')
          }}
          label={name}
        />
        {/* <Form.Label column xs='6' style={{textAlign: 'right'}}>
          {name}
        </Form.Label>
        <Col xs="5" style={{textAlign: 'right'}}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col> */}
      </Form.Group>
    </Col>
  );
}