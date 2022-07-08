import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

type Totals = {
    scoops: string
    toppins: string
    grandTotal: string
}

type UpdateItemCount = (
    itemName: string,
    newItemCount: string,
    optionType: string
) => void

type ResetOrder = () => void

// format number as currency
function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

type OrderDetailsData = [
    {
        scoops: Map<string, number>
        toppings: Map<string, number>
        totals: Totals
    },
    UpdateItemCount,
    ResetOrder
]

const OrderDetails = createContext<OrderDetailsData>([] as unknown as OrderDetailsData)

export function useOrderDetails() {
    const context = useContext(OrderDetails)

    if (!context) {
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider')
    }

    return context
}

interface OptionCountsProps<T> {
    [index: string]: T
}

function calculateSubtotal(optionType: string, optionCounts: OptionCountsProps<any>) {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props: any) {
    const [optionCounts, setOptionCounts] = useState<OptionCountsProps<any>>({
        scoops: new Map(),
        toppings: new Map(),
    });

    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal),
        });
    }, [optionCounts]);

    const valueData = useMemo(() => {
        function updateItemCount(itemName: any, newItemCount: any, optionType: string) {
            const newOptionCounts = { ...optionCounts };

            // update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }

        function resetOrder() {
            console.log('resetOrder Fired');
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map(),
            });
        }

        // getter: object containing option counts for scoops and toppings, subtotals and totals
        // setter: updateOptionCount
        return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
    }, [optionCounts, totals]);

    return (
        <OrderDetails.Provider value={valueData} {...props}/>
    )
}