import { useState, useEffect } from "react";
import { H1, H2 } from "../../atoms/Headers";

interface NFTCollection {
  id: string;
  name: string;
  artist: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  items: number;
  remaining: number;
  category: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  featured: boolean;
}

const fakeCollections: NFTCollection[] = [
  {
    id: "1",
    name: "Kabila Genesis",
    artist: "Kabila",
    description: "Official genesis collection by Kabila on Hedera. Rare historical pieces.",
    price: 150,
    currency: "HBAR",
    image: "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png",
    items: 100,
    remaining: 23,
    category: "Digital Art",
    rarity: "legendary",
    featured: true
  },
  {
    id: "2",
    name: "Urban Legends",
    artist: "Kabila",
    description: "Limited series inspired by urban culture and street art.",
    price: 75,
    currency: "HBAR",
    image: "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png",
    items: 500,
    remaining: 156,
    category: "Street Art",
    rarity: "epic",
    featured: true
  },
  {
    id: "3",
    name: "Digital Revolution",
    artist: "Kabila",
    description: "Artistic exploration of the digital and blockchain revolution.",
    price: 45,
    currency: "HBAR",
    image: "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png",
    items: 1000,
    remaining: 678,
    category: "Conceptual Art",
    rarity: "rare",
    featured: false
  },
  {
    id: "4",
    name: "Hedera Warriors",
    artist: "Kabila",
    description: "Exclusive collection of digital warriors on the Hedera network.",
    price: 120,
    currency: "HBAR",
    image: "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png",
    items: 250,
    remaining: 89,
    category: "Fantasy",
    rarity: "epic",
    featured: true
  },
  {
    id: "5",
    name: "Crypto Icons",
    artist: "Kabila",
    description: "Artistic representations of crypto industry icons.",
    price: 60,
    currency: "HBAR",
    image: "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png",
    items: 750,
    remaining: 432,
    category: "Portrait",
    rarity: "rare",
    featured: false
  },
  {
    id: "6",
    name: "Future Vision",
    artist: "Kabila",
    description: "Futuristic vision of technological and social evolution.",
    price: 90,
    currency: "HBAR",
    image: "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png",
    items: 300,
    remaining: 45,
    category: "Futurism",
    rarity: "legendary",
    featured: true
  }
];

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case "common":
      return "#6B7280";
    case "rare":
      return "#3B82F6";
    case "epic":
      return "#8B5CF6";
    case "legendary":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

const getRarityLabel = (rarity: string): string => {
  switch (rarity) {
    case "common":
      return "⭐ Common";
    case "rare":
      return "🌟 Rare";
    case "epic":
      return "💎 Epic";
    case "legendary":
      return "🔥 Legendary";
    default:
      return "⭐ Common";
  }
};

const NFTStore = () => {
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setCollections(fakeCollections);
  }, []);

  const filteredCollections = collections.filter(collection => {
    const categoryMatch = selectedCategory === "all" || collection.category === selectedCategory;
    const rarityMatch = selectedRarity === "all" || collection.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const categories = ["all", ...new Set(collections.map(c => c.category))];
  const rarities = ["all", "common", "rare", "epic", "legendary"];

  const addToCart = (collectionId: string) => {
    setCart(prev => ({
      ...prev,
      [collectionId]: (prev[collectionId] || 0) + 1
    }));
  };

  const removeFromCart = (collectionId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[collectionId] > 1) {
        newCart[collectionId]--;
      } else {
        delete newCart[collectionId];
      }
      return newCart;
    });
  };

  const getCartTotal = (): number => {
    return Object.entries(cart).reduce((total, [collectionId, quantity]) => {
      const collection = collections.find(c => c.id === collectionId);
      return total + (collection ? collection.price * quantity : 0);
    }, 0);
  };

  const getCartItemsCount = (): number => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const featuredCollections = collections.filter(c => c.featured);

  return (
    <div className="w-full p-6 relative max-h-[86vh] overflow-y-auto">
      <H1 className="mb-8 mx-0 lg:text-left text-4xl">🎨 NFT Store</H1>

      {showCart && (
        <div className="fixed top-0 right-0 w-96 h-full bg-gray-900 border-l border-purple-500 p-6 overflow-y-auto z-50">
          <div className="flex justify-between items-center mb-6">
            <H2 className="m-0">🛒 My Cart</H2>
            <button 
              onClick={() => setShowCart(false)}
              className="text-2xl text-purple-400 hover:text-purple-300"
            >
              ×
            </button>
          </div>
          
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-400 text-center">Your cart is empty</p>
          ) : (
            <>
              {Object.entries(cart).map(([collectionId, quantity]) => {
                const collection = collections.find(c => c.id === collectionId);
                if (!collection) return null;
                
                return (
                  <div key={collectionId} className="flex items-center gap-3 mb-4 p-3 bg-gray-800 rounded">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{collection.name}</p>
                      <p className="text-sm text-gray-400">{collection.price} HBAR × {quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => removeFromCart(collectionId)}
                        className="w-8 h-8 bg-red-600 rounded text-white"
                      >
                        -
                      </button>
                      <span className="text-white">{quantity}</span>
                      <button 
                        onClick={() => addToCart(collectionId)}
                        className="w-8 h-8 bg-green-600 rounded text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="border-t border-gray-600 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-white mb-4">
                  <span>Total:</span>
                  <span>{getCartTotal()} HBAR</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                  💰 Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button 
        onClick={() => setShowCart(true)}
        className="fixed top-20 right-6 z-40 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
      >
        🛒 Cart ({getCartItemsCount()})
      </button>

      <section className="p-6 rounded-lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <H2 className="mb-4 mt-0 text-2xl lg:text-left font-semibold">📊 Store Statistics</H2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded border border-purple-500">
            <p className="text-2xl font-bold text-purple-400">{collections.length}</p>
            <p className="text-sm text-gray-300">Collections</p>
          </div>
          <div className="text-center p-4 rounded border border-blue-500">
            <p className="text-2xl font-bold text-blue-400">
              {collections.reduce((sum, c) => sum + c.items, 0)}
            </p>
            <p className="text-sm text-gray-300">Total NFTs</p>
          </div>
          <div className="text-center p-4 rounded border border-green-500">
            <p className="text-2xl font-bold text-green-400">
              {collections.reduce((sum, c) => sum + (c.items - c.remaining), 0)}
            </p>
            <p className="text-sm text-gray-300">NFTs Sold</p>
          </div>
          <div className="text-center p-4 rounded border border-yellow-500">
            <p className="text-2xl font-bold text-yellow-400">
              {collections.filter(c => c.rarity === "legendary").length}
            </p>
            <p className="text-sm text-gray-300">Legendary</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
  <H2 className="mb-6 text-2xl lg:text-left font-semibold">🔥 Featured Collections</H2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {featuredCollections.map(collection => (
      <div
        key={collection.id}
        className="relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 h-full"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, ${getRarityColor(collection.rarity)}20 100%)`
        }}
      >
        <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: getRarityColor(collection.rarity) }}
        >
          {getRarityLabel(collection.rarity)}
        </div>
        
        <img 
          src={collection.image} 
          alt={collection.name}
          className="w-full h-48 object-cover"
        />
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
          <p className="text-sm text-gray-300 mb-3 flex-grow">{collection.description}</p>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-purple-400">
              {collection.price} {collection.currency}
            </span>
            <span className="text-sm text-gray-400">
              {collection.remaining}/{collection.items} available
            </span>
          </div>
          
          <button
            onClick={() => addToCart(collection.id)}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all mt-auto"
          >
            🎁 Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

      <section className="mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rarity</label>
            <select 
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>
                  {rarity === "all" ? "All Rarities" : getRarityLabel(rarity)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section>
        <H2 className="mb-6 text-2xl lg:text-left font-semibold">📦 All Collections</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCollections.map(collection => (
            <div
              key={collection.id}
              className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-purple-500 overflow-hidden"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="relative">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: getRarityColor(collection.rarity) }}
                >
                  {getRarityLabel(collection.rarity)}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{collection.name}</h3>
                <p className="text-sm text-gray-400 mb-1">Artist: {collection.artist}</p>
                <p className="text-sm text-gray-400 mb-3">Category: {collection.category}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-md font-bold text-purple-400">
                    {collection.price} {collection.currency}
                  </span>
                  <span className="text-xs text-gray-400">
                    {collection.remaining} left
                  </span>
                </div>
                
                <button
                  onClick={() => addToCart(collection.id)}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all text-sm"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NFTStore;