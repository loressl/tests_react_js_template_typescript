import { render, screen, waitFor } from '@testing-library/react'

import { Options } from '../Options'

describe('Options', () => {
    it('displays image for each scoop option from server', async () =>{
        render(<Options optionType='scoops' />)

        //find images
        const scoopsImages = await screen.findAllByRole('img', {name: /scoop$/i})
        expect(scoopsImages).toHaveLength(2)

    })
})