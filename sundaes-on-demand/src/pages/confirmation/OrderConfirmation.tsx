import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetails"

type OrderConfirmationProps = {
    setOrderPhase: Function
}

export function OrderConfirmation({ setOrderPhase }: OrderConfirmationProps) {
    const [, , resetOrder] = useOrderDetails()
    const [orderNumber, setOrderNumber] = useState(null)

    useEffect(() => {
        axios
            // in real a app we would get order details from context
            // and send with POST
            .post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber)
            })
            .catch((error) => { })
    }, [])

    function handleClick() {
        // clear the order details
        resetOrder()

        // send back to order page
        setOrderPhase('inProgress')
    }

    if(orderNumber){
        return(
            <div style={{textAlign: 'center'}}>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{fontSize: '25%'}}>
                    as per our terms and conditions, nothing will happen now
                </p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
        )
    } else {
        return <div>Loading</div>
    }
}