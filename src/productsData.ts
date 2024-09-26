import { ProductType } from './features/products/productsSlice';
import { Apple, Banana, BlackSeeds, Bread1, Bread2, Bread3, Bread4, Cauliflower, Cheese1, Cheese2, Cheese3, Detergent, DishLiquid, DisposableTableware, Eggs1, Eggs2, Milk, Paneer1, Paneer2, Pasta, Pear, Potato, Sanitizer, Shampoo, Spaghetti, Spinach, Tissue, ToiletPaper1, ToiletPaper2, Tomato, WhiteSeeds, Zucchini } from './assets/images/All-Images';

export const products: ProductType[] = [
  {
    id: 1,
    name: "Apple",
    price: 150,
    discount: 0,
    quantity: 1,
    image: Apple,
    category: "produce",
    description: "Crisp and juicy apples, perfect for snacking or adding to your favorite recipes. Each apple is handpicked to ensure quality and freshness.",
    info: "These apples are rich in fiber and vitamins. They are best stored in a cool, dry place and should be washed thoroughly before consumption.",
    delivery: 0
  },
  {
    id: 2,
    name: "Banana",
    price: 50,
    discount: 0,
    quantity: 1,
    image: Banana,
    category: "produce",
    description: "Deliciously sweet bananas, packed with essential nutrients and energy. Ideal for a quick snack or to add to smoothies and desserts.",
    info: "Bananas are high in potassium and natural sugars. Store in a cool place, but avoid refrigeration. Best consumed within a few days of purchase.",
    delivery: 0
  },
  {
    id: 3,
    name: "Black Seeds",
    price: 120,
    discount: 0,
    quantity: 1,
    image: BlackSeeds,
    category: "bread-grains",
    description: "Nutrient-rich black seeds, known for their strong flavor and medicinal properties. Perfect for adding a healthy boost to your meals.",
    info: "These seeds are a great source of antioxidants and healthy fats. Store in a cool, dry place and use within six months for best results.",
    delivery: 0
  },
  {
    id: 4,
    name: "Bread1",
    price: 60,
    discount: 0,
    quantity: 1,
    image: Bread1,
    category: "bread-grains",
    description: "Soft and fresh white bread, perfect for making sandwiches or toast. Baked to perfection and packed with flavor.",
    info: "This bread is made from high-quality wheat flour. Keep in a cool, dry place and consume within 3-4 days of purchase.",
    delivery: 0
  },
  {
    id: 5,
    name: "Bread2",
    price: 70,
    discount: 10,
    quantity: 1,
    image: Bread2,
    category: "bread-grains",
    description: "Whole grain bread, rich in fiber and nutrients. A healthier choice for your breakfast or snack.",
    info: "Made with whole grains for added fiber and nutrients. Store in a cool, dry place and consume within 3-4 days.",
    delivery: 0
  },
  {
    id: 6,
    name: "Bread3",
    price: 75,
    discount: 10,
    quantity: 1,
    image: Bread3,
    category: "bread-grains",
    description: "Multigrain bread, packed with seeds and grains for added texture and nutrition. Perfect for health-conscious consumers.",
    info: "This bread is made from a blend of whole grains and seeds. Best enjoyed fresh or lightly toasted.",
    delivery: 0
  },
  {
    id: 7,
    name: "Bread4",
    price: 80,
    discount: 10,
    quantity: 1,
    image: Bread4,
    category: "bread-grains",
    description: "Gluten-free bread, ideal for those with gluten sensitivities. Soft and flavorful, it pairs well with any meal.",
    info: "Made with gluten-free ingredients. Store in a cool, dry place and consume within 3-4 days for best taste.",
    delivery: 0
  },
  {
    id: 8,
    name: "Cauliflower",
    price: 60,
    discount: 10,
    quantity: 1,
    image: Cauliflower,
    category: "produce",
    description: "Fresh and crunchy cauliflower, a versatile vegetable that can be used in a variety of dishes.",
    info: "Cauliflower is rich in vitamins and low in calories. Keep refrigerated and consume within a week.",
    delivery: 0
  },
  {
    id: 9,
    name: "Cheese1",
    price: 200,
    discount: 0,
    quantity: 1,
    image: Cheese1,
    category: "dairy-eggs",
    description: "Rich and creamy cheddar cheese, perfect for sandwiches, burgers, and snacks.",
    info: "This cheese is made from high-quality milk. Store in the refrigerator and consume within two weeks.",
    delivery: 0
  },
  {
    id: 10,
    name: "Cheese2",
    price: 220,
    discount: 10,
    quantity: 1,
    image: Cheese2,
    category: "dairy-eggs",
    description: "Smooth and tangy mozzarella cheese, ideal for pizzas and pastas.",
    info: "Mozzarella is best used fresh and stored in the refrigerator. Use within a week for optimal flavor.",
    delivery: 0
  },
  {
    id: 11,
    name: "Cheese3",
    price: 240,
    discount: 10,
    quantity: 1,
    image: Cheese3,
    category: "dairy-eggs",
    description: "Gourmet blue cheese, known for its strong flavor and creamy texture. Perfect for salads and dressings.",
    info: "This cheese should be stored in the refrigerator and used within two weeks. Ideal for adding a bold flavor to your dishes.",
    delivery: 0
  },
  {
    id: 12,
    name: "Detergent",
    price: 180,
    discount: 0,
    quantity: 1,
    image: Detergent,
    category: "household",
    description: "Powerful detergent for all your laundry needs. Leaves clothes fresh and clean.",
    info: "Suitable for all types of fabrics. Follow care instructions on clothing labels and use as directed.",
    delivery: 0
  },
  {
    id: 13,
    name: "Dish Liquid",
    price: 120,
    discount: 0,
    quantity: 1,
    image: DishLiquid,
    category: "household",
    description: "Effective dishwashing liquid that cuts through grease and leaves dishes sparkling clean.",
    info: "Gentle on hands but tough on grease. Use with warm water for best results.",
    delivery: 0
  },
  {
    id: 14,
    name: "Disposable Tableware",
    price: 90,
    discount: 10,
    quantity: 1,
    image: DisposableTableware,
    category: "household",
    description: "Convenient and eco-friendly disposable tableware for your parties and picnics.",
    info: "Made from biodegradable materials. Dispose of responsibly after use.",
    delivery: 0
  },
  {
    id: 15,
    name: "Eggs1",
    price: 60,
    discount: 0,
    quantity: 1,
    image: Eggs1,
    category: "dairy-eggs",
    description: "Fresh farm eggs, perfect for breakfast or baking. Rich in protein and essential nutrients.",
    info: "Store in the refrigerator and consume within a week. Eggs should be cooked thoroughly before consumption.",
    delivery: 0
  },
  {
    id: 16,
    name: "Eggs2",
    price: 70,
    discount: 0,
    quantity: 1,
    image: Eggs2,
    category: "dairy-eggs",
    description: "Organic eggs from free-range hens. Higher in omega-3 fatty acids and rich in flavor.",
    info: "Keep refrigerated and consume within a week. These eggs are best used fresh.",
    delivery: 0
  },
  {
    id: 17,
    name: "Milk",
    price: 50,
    discount: 0,
    quantity: 1,
    image: Milk,
    category: "dairy-eggs",
    description: "Fresh and wholesome milk, ideal for drinking, cooking, and baking. Rich in calcium and vitamin D.",
    info: "Store in the refrigerator and consume within a few days of opening.",
    delivery: 0
  },
  {
    id: 18,
    name: "Paneer1",
    price: 180,
    discount: 0,
    quantity: 1,
    image: Paneer1,
    category: "dairy-eggs",
    description: "Soft and creamy paneer, perfect for curries and grilled dishes. A rich source of protein.",
    info: "Paneer is best used fresh. Store in the refrigerator and use within a week.",
    delivery: 0
  },
  {
    id: 19,
    name: "Paneer2",
    price: 200,
    discount: 0,
    quantity: 1,
    image: Paneer2,
    category: "dairy-eggs",
    description: "Low-fat paneer, ideal for health-conscious consumers. Enjoy in a variety of dishes.",
    info: "Store in the refrigerator and use within a week. Paneer should be kept sealed to maintain freshness.",
    delivery: 0
  },
  {
    id: 20,
    name: "Pasta",
    price: 90,
    discount: 0,
    quantity: 1,
    image: Pasta,
    category: "bread-grains",
    description: "High-quality pasta, perfect for all your favorite Italian dishes. Made from durum wheat.",
    info: "Store in a cool, dry place. Cook in boiling water for 8-10 minutes for the perfect al dente texture.",
    delivery: 0
  },
  {
    id: 21,
    name: "Pear",
    price: 80,
    discount: 0,
    quantity: 1,
    image: Pear,
    category: "produce",
    description: "Juicy and sweet pears, perfect for snacking or adding to desserts. Rich in fiber and vitamins.",
    info: "Pears should be stored at room temperature until ripe, then refrigerated. Best consumed within a few days.",
    delivery: 0
  },
  {
    id: 22,
    name: "Potato",
    price: 40,
    discount: 0,
    quantity: 1,
    image: Potato,
    category: "produce",
    description: "Fresh potatoes, versatile and nutritious. Perfect for roasting, mashing, or frying.",
    info: "Store in a cool, dark place. Avoid refrigeration to maintain texture and flavor.",
    delivery: 0
  },
  {
    id: 23,
    name: "Sanitizer",
    price: 100,
    discount: 0,
    quantity: 1,
    image: Sanitizer,
    category: "household",
    description: "Effective hand sanitizer that kills 99.9% of germs. Keeps hands clean and refreshed.",
    info: "Use as needed to disinfect hands. Allow to dry completely before touching surfaces.",
    delivery: 0
  },
  {
    id: 24,
    name: "Shampoo",
    price: 150,
    discount: 0,
    quantity: 1,
    image: Shampoo,
    category: "household",
    description: "Gentle shampoo for all hair types. Leaves hair clean, soft, and manageable.",
    info: "Apply to wet hair, lather, and rinse thoroughly. Suitable for daily use.",
    delivery: 0
  },
  {
    id: 25,
    name: "Spaghetti",
    price: 100,
    discount: 0,
    quantity: 1,
    image: Spaghetti,
    category: "bread-grains",
    description: "Classic spaghetti, perfect for traditional Italian dishes. Made from premium durum wheat.",
    info: "Store in a cool, dry place. Cook in boiling water for 10-12 minutes for best results.",
    delivery: 0
  },
  {
    id: 26,
    name: "Spinach",
    price: 50,
    discount: 0,
    quantity: 1,
    image: Spinach,
    category: "produce",
    description: "Fresh spinach leaves, packed with vitamins and minerals. Ideal for salads, smoothies, and cooking.",
    info: "Store in the refrigerator and use within a few days for maximum freshness.",
    delivery: 0
  },
  {
    id: 27,
    name: "Toilet Paper1",
    price: 60,
    discount: 0,
    quantity: 1,
    image: ToiletPaper1,
    category: "household",
    description: "Soft and absorbent toilet paper. Gentle on skin, with strong and reliable quality.",
    info: "Store in a cool, dry place. Avoid direct sunlight and moisture.",
    delivery: 0
  },
  {
    id: 28,
    name: "Toilet Paper2",
    price: 70,
    discount: 0,
    quantity: 1,
    image: ToiletPaper2,
    category: "household",
    description: "Premium toilet paper with extra layers for added comfort and absorbency.",
    info: "Store in a cool, dry place. Keep away from moisture and direct sunlight.",
    delivery: 0
  },
  {
    id: 29,
    name: "Tissue",
    price: 40,
    discount: 0,
    quantity: 1,
    image: Tissue,
    category: "household",
    description: "Soft and gentle tissues, perfect for everyday use. Convenient and easy to carry.",
    info: "Store in a cool, dry place. Dispose of after use.",
    delivery: 0
  },
  {
    id: 30,
    name: "Tomato",
    price: 30,
    discount: 0,
    quantity: 1,
    image: Tomato,
    category: "produce",
    description: "Fresh and juicy tomatoes, perfect for salads, sandwiches, and cooking.",
    info: "Store at room temperature for ripening, then refrigerate. Best consumed within a week.",
    delivery: 0
  },
  {
    id: 31,
    name: "White Seeds",
    price: 100,
    discount: 0,
    quantity: 1,
    image: WhiteSeeds,
    category: "bread-grains",
    description: "Nutritious white seeds, perfect for adding a crunchy texture and healthy boost to your meals.",
    info: "Store in a cool, dry place. Use within six months for the best taste and freshness.",
    delivery: 0
  },
  {
    id: 32,
    name: "Zucchini",
    price: 40,
    discount: 0,
    quantity: 1,
    image: Zucchini,
    category: "produce",
    description: "Fresh zucchini, versatile and nutritious. Great for grilling, roasting, or adding to salads.",
    info: "Store in the refrigerator and use within a week for maximum freshness.",
    delivery: 0
  },
];


export const cartProducts: ProductType[] = [];