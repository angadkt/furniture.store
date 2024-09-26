import React, { useContext, useEffect, useState } from "react";
import { context_page } from "../context/ContextProduct";

const SearchBar = () => {
  const { products } = useContext(context_page);
  const [search, setSearch] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    if (search) {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchProducts(filtered);
    } else {
      setSearchProducts(products);
    }
  }, [search, products]);

  return (
    <div className="mt-20 flex justify-center">
      <input
        className="border border-black px-4 py-1 rounded-lg"
        type="search"
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {searchProducts.length > 0 ? (
          searchProducts.map((item) => (
            <div key={item.id} className="m-2">
              <img
                src={item.image ?? "/default-image.jpg"}
                alt={item.name ?? "Product"}
                className="w-20 h-20"
              />
              <h2>{item.name ?? "Unnamed Product"}</h2>
              <p>{item.price ? `$${item.price}` : "Price not available"}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
