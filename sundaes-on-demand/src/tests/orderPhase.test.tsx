import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
    test('Order phases for happy path', async () => {
        // render app
        // Don't need to wrap in provider; already wrapped!
        render(<App />);
        // add ice cream scoops and toppings
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '1');

        const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
        await userEvent.clear(chocolateInput);
        await userEvent.type(chocolateInput, '2');

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });
        await userEvent.click(cherriesCheckbox);

        // find and click order summary button
        const orderSummaryButton = screen.getByRole('button', {
            name: /order sundae/i,
        });
        await userEvent.click(orderSummaryButton);

        // check summary subtotals
        const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
        expect(summaryHeading).toBeInTheDocument();

        const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
        expect(scoopsHeading).toBeInTheDocument();

        const toppingsHeading = screen.getByRole('heading', {
            name: 'Toppings: $1.50',
        });
        expect(toppingsHeading).toBeInTheDocument();

        // check summary option items
        expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
        expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Cherries')).toBeInTheDocument();

        // // alternatively...
        // // const optionItems = screen.getAllByRole('listitem');
        // // const optionItemsText = optionItems.map((item) => item.textContent);
        // // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

        // accept terms and click button
        const tcCheckbox = screen.getByRole('checkbox', {
            name: /terms and conditions/i,
        });
        await userEvent.click(tcCheckbox);

        const confirmOrderButton = screen.getByRole('button', {
            name: /confirm order/i,
        });
        await userEvent.click(confirmOrderButton);

        // check confirmation page text
        // this one is async because there is a POST request to server in between summary
        //    and confirmation pages
        const thankYouHeader = await screen.findByRole('heading', {
            name: /thank you/i,
        });
        expect(thankYouHeader).toBeInTheDocument();

        const orderNumber = await screen.findByText(/order number/i);
        expect(orderNumber).toBeInTheDocument();

        // find and click "new order" button on confirmation page
        const newOrderButton = screen.getByRole('button', { name: /new order/i });
        await userEvent.click(newOrderButton);

        // check that scoops and toppings have been reset
        const scoopsTotal = screen.getByText('Scoops total: $0.00');
        expect(scoopsTotal).toBeInTheDocument();
        const toppingsTotal = screen.getByText('Toppings total: $0.00');
        expect(toppingsTotal).toBeInTheDocument();

        // wait for items to appear so that Testing Library doesn't get angry about stuff
        // happening after test is over
        await screen.findByRole('spinbutton', { name: 'Vanilla' });
        await screen.findByRole('checkbox', { name: 'Cherries' });
    })
})