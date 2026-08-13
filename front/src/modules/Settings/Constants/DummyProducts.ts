export interface IProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  img: string;
}

export const ProductCategories = [
  { trigger: "All", value: "all" },
  { trigger: "Hot dishes", value: "hot-dishes" },
  { trigger: "Cold dishes", value: "cold-dishes" },
  { trigger: "Soup", value: "soup" },
  { trigger: "Grill", value: "grill" },
];

export const DummyProducts: IProduct[] = [
  {
    id: "1",
    name: "Beef Dumpling Soup",
    price: 3.99,
    category: "soup",
    img: "/images/meals/beef_dumpling.png",
  },
  {
    id: "2",
    name: "Healthy Veggie Noodle",
    price: 2.49,
    category: "cold-dishes",
    img: "/images/meals/healthy_noodle.png",
  },
  {
    id: "3",
    name: "Instant Noodle Classic",
    price: 1.89,
    category: "hot-dishes",
    img: "/images/meals/instant_noodle.png",
  },
  {
    id: "4",
    name: "Miso Soup Bowl",
    price: 2.15,
    category: "soup",
    img: "/images/meals/miso_soup.png",
  },
  {
    id: "5",
    name: "Classic Noodles",
    price: 2.0,
    category: "hot-dishes",
    img: "/images/meals/noodle.png",
  },
  {
    id: "6",
    name: "Pasta with Mushrooms",
    price: 3.59,
    category: "hot-dishes",
    img: "/images/meals/pasta_mushroom.png",
  },
  {
    id: "7",
    name: "Spicy Ramen Delight",
    price: 2.79,
    category: "grill",
    img: "/images/meals/spicy_ramen.png",
  },
  {
    id: "8",
    name: "Spicy Seasoned Seafood Noodles",
    price: 2.29,
    category: "grill",
    img: "/images/meals/spicy_seasoned_noodles.png",
  },
];
