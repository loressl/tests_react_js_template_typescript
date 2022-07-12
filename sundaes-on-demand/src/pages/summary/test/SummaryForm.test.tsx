import {render, screen, waitFor} from '@testing-library/react'
import {SummaryForm} from '../SummaryForm'
import userEvent from "@testing-library/user-event"

/**
 * get: expect element to be in DOM
 * query: expect element not to be in DOM
 * find: expext element to appear async
 */

describe('SummaryForm', () => {
    it('Initial conditions', ()=>{
        render(<SummaryForm setOrderPhase={jest.fn()} />)
        const checkbox = screen.getByRole('checkbox', {
            name: /I agree to Terms and Conditions/i,
        })
        expect(checkbox).not.toBeChecked()

        const confirmButton = screen.getByRole('button', {name: /confirm order/i})
        expect(confirmButton).toBeDisabled()
    })

    it('Checkbox enables button on first click and disables on second click', async () =>{
        render(<SummaryForm setOrderPhase={jest.fn()}/>)
        const checkbox = screen.getByRole('checkbox', {
            name: /I agree to Terms and Conditions/i,
        })
        const confirmButton = screen.getByRole('button', {name: /confirm order/i})

        await userEvent.click(checkbox)
        expect(confirmButton).toBeEnabled()

        await userEvent.click(checkbox)
        expect(confirmButton).toBeDisabled()
    })

    it('popover responds to hover', async () => {
        render(<SummaryForm setOrderPhase={jest.fn()}/>)

        //popover starts out hidden
        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
        expect(nullPopover).not.toBeInTheDocument()

        //popover appears upon mouseover of checkbox label
        const termsAndConditions = screen.getByText(/Terms and Conditions/i)
        await userEvent.hover(termsAndConditions)
         
        const popover = screen.queryByText(/no ice cream will actually be delivered/i)
        expect(popover).toBeInTheDocument()

        //popover disappears when we mouse out
        await userEvent.unhover(termsAndConditions)
        const overlay = screen.queryByText(/no ice cream will actually be delivered/i)
        await waitFor(() => {
            expect(overlay).not.toBeInTheDocument()
        })

    })
})