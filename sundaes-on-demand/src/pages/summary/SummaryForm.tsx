import { useState } from 'react'
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'

type SummaryFormProps = {
    setOrderPhase: Function
}

export function SummaryForm({ setOrderPhase }: SummaryFormProps) {
    const [tcChecked, setTcChecked] = useState(false)


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // pass along to the next phase.
        // The next page will handle submitting order from context.
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id="termsandconditions-popover">
            <Popover.Body>No ice cream will actually be delivered</Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: 'blue' }}> Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    )

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='terms-and-conditions'>
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
    )
}