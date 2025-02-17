import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"

const getCategories = async () => {
    return await prisma.category.findMany()
}
const OrderSidebar = async () => {

    const categories = await getCategories()
    return (
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo />
            <nav className="">
                <h3 className="text-center text-2xl font-bold bg-gray-800 text-white w-full flex flex-col justify-center items-center">Menu</h3>
                {categories.map(category => (
                    <CategoryIcon
                        key={category.id}
                        category={category}
                    />
                )
                )}
            </nav>

        </aside>
    )
}

export default OrderSidebar