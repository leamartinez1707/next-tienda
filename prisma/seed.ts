import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    try {
        for (const category of categories) {
            await prisma.category.create({ data: category });
        }

        for (const product of products) {
            await prisma.product.create({
                data: {
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: {
                        connect: { id: product.categoryId.toString() },
                    },
                },
            });
        }
    } catch (error) {
        console.error(error);

    }
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });