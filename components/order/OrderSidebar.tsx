import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";
import { categories as seedCategories } from "@/prisma/data/categories";

const getCategories = async () => {
    try {
        return await prisma.category.findMany();
    } catch {
        return seedCategories;
    }
};

const OrderSidebar = async () => {
    const categories = await getCategories();

    return (
        <aside className="w-full max-w-full min-w-0 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur md:h-screen md:w-80 md:border-b-0 md:border-r md:overflow-y-auto">
            <div className="sticky top-0 z-20 border-b border-gray-100 bg-[linear-gradient(145deg,_#ffffff,_#f8fafc)] px-4 py-3 sm:px-5 md:static md:py-4">
                <Logo />
                <div className="mt-2 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-sm">Selecciona tu categoria</p>
                </div>
            </div>

            <nav className="pb-2" aria-label="Menu principal de categorias">
                <h3 className="w-full bg-slate-900 py-2.5 text-center text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base md:py-3 md:text-lg md:tracking-wide">
                    Menu
                </h3>
                <div className="flex w-full min-w-0 gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-1 md:gap-0 md:overflow-visible md:px-0 md:py-0">
                    {categories.map((category) => (
                        <CategoryIcon
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default OrderSidebar;