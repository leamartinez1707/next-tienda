import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import Notification from "@/components/ui/Notification";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ordenes",
    description: "Maneja tus ordenes y pide la comida que más te guste",
    keywords: ["Ordenes", "Comida", "Pedidos"],
}

const OrderLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {

    return (
        <>
            <div className="md:flex">

                <OrderSidebar />

                <main className="md:flex-1 md:h-screen md:overflow-y-auto p-5">
                    {children}
                </main>

                <OrderSummary />
            </div>
            <Notification />
        </>
    )


}


export default OrderLayout;