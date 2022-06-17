import React from 'react'
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', () => {
    it('should render list items', () =>{
        const { getByText, rerender, queryByText, unmount } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />)
 
        expect(getByText('Diego')).toBeInTheDocument()
        expect(getByText('Rodz')).toBeInTheDocument()
        expect(getByText('Mayk')).toBeInTheDocument()
        
        //unmount()
        // rerender(<List initialItems={['Julia']} />)

        // expect(getByText('Julia')).toBeInTheDocument()
        // expect(queryByText('Mayk')).not.toBeInTheDocument()
    })

    it('should be able to add new item to the list', async () => {
        const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

        const inputElement = getByPlaceholderText('Novo item')
        const addButton = getByText('Adicionar')
        
        await userEvent.type(inputElement, 'Novo')
        
        await userEvent.click(addButton)
        
        // opção 1
        await waitFor(() => {
            expect(getByText('Novo')).toBeInTheDocument()
        })

        //opção 2
        //expect( await findByText('Novo')).toBeInTheDocument()
    })

    it('should be able to remove item from the list', async () => {
        const { getByText,getAllByText, queryByText } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />)

        const removeButtons = getAllByText('Remover')

        
        await userEvent.click(removeButtons[0])
        
        await waitForElementToBeRemoved(() => {
            return getByText('Diego')
        })

        // opção 2
        // await waitFor(() => {
        //     expect(queryByText('Diego')).not.toBeInTheDocument()
        // })
    })
})
