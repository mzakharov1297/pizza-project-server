import {DataSource} from 'typeorm';
import {User} from "../user/user.entity";
import {Category} from "../category/category.entity";
import {Ingredient} from "../ingredient/ingredient.entity";
import {seedCategory, seedIngredients, seedProducts, seedUsers} from "./create-seed.consts";
import {Product} from "../product/entities/product.entity";
import {ProductItem} from "../product/entities/product-item.entity";
import {Cart} from "../cart/entities/cart.entity";
import {CartItem} from "../cart/entities/cart-item.entity";

export async function createSeeds(dataSource: DataSource) {
    const randomDecimalNumber = (min: number, max: number) => {
        return Math.floor(Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10)
    }

    const userRepository = dataSource.getRepository(User);
    await userRepository.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE')

    const categoryRepository = dataSource.getRepository(Category);
    await categoryRepository.query('TRUNCATE TABLE "category" RESTART IDENTITY CASCADE')


    const ingredientsRepository = dataSource.getRepository(Ingredient);
    await ingredientsRepository.query('TRUNCATE TABLE "ingredient" RESTART IDENTITY CASCADE')

    const productRepository = dataSource.getRepository(Product);
    await productRepository.query('TRUNCATE TABLE "product" RESTART IDENTITY CASCADE')

    const productItemRepository = dataSource.getRepository(ProductItem);
    await productItemRepository.query('TRUNCATE TABLE "product_item" RESTART IDENTITY CASCADE')

    const cartRepository = dataSource.getRepository(Cart)
    await cartRepository.query('TRUNCATE TABLE "cart" RESTART IDENTITY CASCADE')

    const cartItemRepository = dataSource.getRepository(CartItem)
    await cartItemRepository.query('TRUNCATE TABLE "cart_item" RESTART IDENTITY CASCADE')

    await userRepository.save(seedUsers);
    await categoryRepository.save(seedCategory)
    await ingredientsRepository.save(seedIngredients)
    await productRepository.save(seedProducts)

    const pizza1 = productRepository.create({
        name: 'Пепперони фреш',
        imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
        category: {
            id: 1
        },
        ingredients: await ingredientsRepository.find().then(data => data.slice(0, 5))
    })

    const pizza2 = productRepository.create({
        name: 'Сырная',
        imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
        category: {
            id: 1
        },
        ingredients: await ingredientsRepository.find().then(data => data.slice(5, 10))
    })

    const pizza3 = productRepository.create({
        name: 'Чоризо фреш',
        imageUrl:
            'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
        category: {
            id: 1
        },
        ingredients: await ingredientsRepository.find().then(data => data.slice(10, 40))
    })

    await productRepository.save([pizza1, pizza2, pizza3])

    const productItems = productItemRepository.create([
        {
            product: {id: pizza1.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 1,
            size: 20
        },
        {
            product: {id: pizza1.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 30
        },
        {
            product: {id: pizza1.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 40
        },
        {
            product: {id: pizza2.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 1,
            size: 20
        },
        {
            product: {id: pizza2.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 1,
            size: 30
        },
        {
            product: {id: pizza2.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 1,
            size: 40
        },
        {
            product: {id: pizza2.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 20
        },
        {
            product: {id: pizza2.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 30
        },
        {
            product: {id: pizza2.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 40
        },
        {
            product: {id: pizza3.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 1,
            size: 20
        },
        {
            product: {id: pizza3.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 30
        },
        {
            product: {id: pizza3.id},
            price: randomDecimalNumber(190, 600),
            pizzaType: 2,
            size: 40
        },
        {
            product: {id: 1},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 2},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 3},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 4},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 5},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 6},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 7},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 8},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 9},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 10},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 11},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 12},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 13},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 14},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 15},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 16},
            price: randomDecimalNumber(190, 600),
        },
        {
            product: {id: 17},
            price: randomDecimalNumber(190, 600),
        }

    ])

    await productItemRepository.save(productItems)

    const carts = cartRepository.create([
        {
            user: await userRepository.findOne({where: {id: 1}}),
            totalAmount: 0,
            token: "11111"
        },
        {
            user:  await userRepository.findOne({where: {id: 2}}),
            totalAmount: 0,
            token: "22222"
        }
    ])
    await cartRepository.save(carts)

    const cartItems = cartItemRepository.create([
        {
            productItem: {
                id: 1
            },
            cart: {
                id: 1
            },
            quantity: 2,
            ingredients: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                }
            ]
        }
    ])

    await cartItemRepository.save(cartItems)
}