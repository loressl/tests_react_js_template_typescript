import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOptions from '../ScoopOption';

describe('ScoopOption', () => {
    it('indicate if scoop count is non-int or out of range', async() => {
        render(<ScoopOptions name='' imagePath='' updateItemCount={jest.fn()} />)

        // expect input to be invalid with negative number
        const vanillaInput = screen.getByRole('spinbutton')
        await userEvent.clear(vanillaInput)
        await userEvent.type(vanillaInput, '-1')
        expect(vanillaInput).toHaveClass('is-invalid')

        //replace with decimal input
        await userEvent.clear(vanillaInput)
        await userEvent.type(vanillaInput, '2.5')
        expect(vanillaInput).toHaveClass('is-invalid')

        // replace with input that's too high
        await userEvent.clear(vanillaInput)
        await userEvent.type(vanillaInput, '11')
        expect(vanillaInput).toHaveClass('is-invalid')

        //replace with valid input
        // note:here we're testing our validation rules (namely that the input can display as valid)
        // and not react-bootstrap's response
        await userEvent.clear(vanillaInput)
        await userEvent.type(vanillaInput, '3')
        expect(vanillaInput).not.toHaveClass('is-invalid')
    })
})