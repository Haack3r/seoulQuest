import { useNavigate } from "react-router-dom";

export const useAdminMovePages = () => {
    const navigate = useNavigate()
    // const [refresh, setRefresh] = useState(false)

    const moveToOrder = () => {
        navigate({ pathname: '/admin/order' }, { replace: true })
    }

    const moveToProduct = () => {
        navigate({ pathname: './admin/product' }, { replace: true })
    }

    const moveToInventory = () => {
        navigate({ pathname: './admin/inventory' }, { replace: true })
    }

    const moveToDelivery = () => {
        navigate({ pathname: './admin/delivery' }, { replace: true })
    }

    const moveToExchange = () => {
        navigate({ pathname: './admin/exchange' }, { replace: true })
    }

    const moveToFee = () => {
        navigate({ pathname: './admin/Fee' }, { replace: true })
    }

    const moveToCustomer = () => {
        navigate({ pathname: './admin/customer' }, { replace: true })
    }

    const moveToTour = () => {
        navigate({ pathname: './admin/tour' }, { replace: true })
    }

    const moveToReservation = () => {
        navigate({ pathname: './admin/reservation' }, { replace: true })
    }

    return {
        moveToOrder,
        moveToProduct,
        moveToInventory,
        moveToDelivery,
        moveToExchange,
        moveToFee,
        moveToCustomer,
        moveToTour,
        moveToReservation
    }
}