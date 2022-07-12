//import { render, screen, waitFor } from '@testing-library/react'
import { render, screen  } from '../../../test-utils/testing-library-utils'
import { Options } from '../Options'

describe('Options', () => {
    it('displays image for each scoop option from server', async () =>{
        render(<Options optionType='scoops' />)

        //find images
        const scoopsImages: HTMLImageElement[] = await screen.findAllByRole('img', {name: /scoop$/i})
        expect(scoopsImages).toHaveLength(2)

        // confirm alt text of images
        const altText = scoopsImages.map((element) => element.alt)
        expect(altText).toEqual([ 'Chocolate scoop', 'Vanilla scoop' ])
    })

    it('displays image for each toppings option from server', async() => {
        // mock service worker will return three toppings from server
        render(<Options optionType='toppings' />)

        //find images, expect 3 based on what msw returns
        const toopingsImages: HTMLImageElement[] = await screen.findAllByRole('img', {name: /topping$/i})
        expect(toopingsImages).toHaveLength(3)

        //check the actual alt text for the images
        const imageTitles = toopingsImages.map((element) => element.alt)
        expect(imageTitles).toEqual([
            'Cherries topping',
            'M&Ms topping',
            'Hot fudge topping',
        ])
    })
})