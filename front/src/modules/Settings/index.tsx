import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import SearchIcon from "@icons/search.svg?react";
import DeleteIcon from "@icons/trash.svg?react";

import FieldInput from "@/components/FieldInput";
import TabView from "@/components/TabView";
import { FormatPrice } from "@/utils/Numbers";

import {
  DummyProducts,
  IProduct,
  ProductCategories,
} from "./Constants/DummyProducts";

interface IProductCardProps {
  product: IProduct;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="w-[calc(25%-18px)] bg-kAppDarkNavy border border-kAppCharcoal rounded-lg p-4 flex flex-col items-center text-center gap-1">
      <img
        alt={product.name}
        src={product.img}
        className="w-20 h-20 object-contain mb-2"
      />
      <p className="font-bold truncate w-full">{product.name}</p>
      <p className="text-kAppCoral font-bold">$ {FormatPrice(product.price)}</p>
      <button
        className="mt-2 border border-kAppCoral p-2 rounded-md hover:border-kAppRed"
        onClick={() => onDelete(product.id)}
        aria-label={`Delete ${product.name}`}
      >
        <DeleteIcon className="fill-kAppCoral" />
      </button>
    </div>
  );
};

const AddProductDialog = ({
  onAdd,
}: {
  onAdd: (product: Omit<IProduct, "id">) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const HandleDiscard = (): void => {
    setName("");
    setPrice("");
    setOpen(false);
  };

  const HandleSave = (): void => {
    if (!name.trim()) return;
    onAdd({
      name,
      price: Number.parseFloat(price) || 0,
      category: "hot-dishes",
      img: "/images/meals/noodle.png",
    });
    HandleDiscard();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-kAppCoral font-bold text-sm rounded-md px-6 py-4 hover:bg-kAppRed shrink-0">
          Add Product
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-kAppDarkNavy border border-kAppCharcoal rounded-lg p-6">
          <Dialog.Title className="text-xl font-bold mb-6">
            Add Product
          </Dialog.Title>
          <div className="flex flex-col gap-3 mb-6">
            <FieldInput
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FieldInput
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              className="w-1/2 border border-kAppCoral text-kAppCoral font-bold text-sm rounded-md p-3 hover:border-kAppRed hover:text-kAppRed"
              onClick={HandleDiscard}
            >
              Discard
            </button>
            <button
              className="w-1/2 bg-kAppCoral font-bold text-sm rounded-md p-3 hover:bg-kAppRed"
              onClick={HandleSave}
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const SettingsScreen = () => {
  const [products, setProducts] = useState<IProduct[]>(DummyProducts);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(ProductCategories[0].value);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => activeTab === "all" || p.category === activeTab)
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, activeTab, search]);

  const HandleDelete = (id: string): void => {
    setProducts((current) => current.filter((p) => p.id !== id));
  };

  const HandleAdd = (product: Omit<IProduct, "id">): void => {
    setProducts((current) => [
      ...current,
      { ...product, id: crypto.randomUUID() },
    ]);
  };

  return (
    <div className="p-7">
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <h2 className="text-kAppCoolGray">Product Management</h2>
        </div>
        <div className="flex gap-4">
          <FieldInput
            placeholder="Search products..."
            icon={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AddProductDialog onAdd={HandleAdd} />
        </div>
      </div>

      <TabView
        tabs={ProductCategories}
        defaultTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="flex flex-wrap gap-6 mt-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={HandleDelete}
            />
          ))}
          {filteredProducts.length < 1 && (
            <p className="text-kAppCoolGray mt-4">No products found.</p>
          )}
        </div>
      </TabView>
    </div>
  );
};

export { SettingsScreen };

export function Component() {
  return <SettingsScreen />;
}
