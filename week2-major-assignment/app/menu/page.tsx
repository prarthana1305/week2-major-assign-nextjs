// components/MenuPage.tsx
"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, Pizza, Drumstick, Cake, Coffee, Fish, Plus, Edit, Trash } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';
import { Bell, ChevronLeft, X } from 'lucide-react';

const categories = [
  { name: "All", count: 116, icon: <Menu className="w-5 h-5" /> },
  { name: "Pizza", count: 20, icon: <Pizza className="w-5 h-5" /> },
  { name: "Chicken", count: 10, icon: <Drumstick className="w-5 h-5" /> },
  { name: "Bakery", count: 18, icon: <Cake className="w-5 h-5" /> },
  { name: "Beverage", count: 12, icon: <Coffee className="w-5 h-5" /> },
  { name: "Seafood", count: 16, icon: <Fish className="w-5 h-5" /> },
];

const menuItems = Array(6).fill({
  name: "Chicken Parmesan",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  itemId: "#22314644",
  stock: "119 Items",
  category: "Chicken",
  price: "$55.00",
  availability: "In Stock",
});

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Limit to the first 5 items
  const limitedMenuItems = filteredMenuItems.slice(0, 5);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="p-4 bg-black w-full h-full text-white flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Menu</h1>
          <Link href="/profile">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://s3-alpha-sig.figma.com/img/e4b8/6602/ca657f125cf14445eb6b9b7a15c568da?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lhgJzKmUWvffquUSrWadPlWeqdSOUFxK~Lxg9NnFifrZDQtjnx5JtHXYc0cWXe8cpimTevMpdX-FwtIF85vxkoDBuXZ0GUVtAhXO1XWptJBut5etB7iqHyF7RslKkw5O4hp9sO7HOzRXniqOduYZh4GlAe1bl1WwC9QUcc4cSlTaQic0HS-IxWttKXQtzEnUaP26O5ly6FmIAywotA2M~J9Otxha2rXjOz1rO3g~83XE1S9q9b1mRzuU7TaGNc8bKt6Y746zFoyNBwR1SWIUHpZPuKZ4168v2EQ9xAoC~nWBSLbg6qIEZgJHrS-kK5gTR8Qiuc2D5fuGGBga2OE4uA__" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* Desktop Header - hidden on mobile */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <button className="text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-2xl font-semibold">Menu</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400">
              <Bell size={20} />
            </button>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="https://s3-alpha-sig.figma.com/img/e4b8/6602/ca657f125cf14445eb6b9b7a15c568da?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lhgJzKmUWvffquUSrWadPlWeqdSOUFxK~Lxg9NnFifrZDQtjnx5JtHXYc0cWXe8cpimTevMpdX-FwtIF85vxkoDBuXZ0GUVtAhXO1XWptJBut5etB7iqHyF7RslKkw5O4hp9sO7HOzRXniqOduYZh4GlAe1bl1WwC9QUcc4cSlTaQic0HS-IxWttKXQtzEnUaP26O5ly6FmIAywotA2M~J9Otxha2rXjOz1rO3g~83XE1S9q9b1mRzuU7TaGNc8bKt6Y746zFoyNBwR1SWIUHpZPuKZ4168v2EQ9xAoC~nWBSLbg6qIEZgJHrS-kK5gTR8Qiuc2D5fuGGBga2OE4uA__" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        {/* Mobile Categories - Sliding Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} className="text-white" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div 
                    key={cat.name} 
                    className={`relative w-full h-24 rounded-lg bg-gray-800 flex flex-col items-center justify-center cursor-pointer 
                      ${selectedCategory === cat.name ? 'bg-pink-500' : 'hover:bg-pink-500'}`} 
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="absolute top-2 right-2">{cat.icon}</div>
                    <div className="text-center">
                      <span>{cat.name}</span>
                      <p className="text-gray-400 text-sm">({cat.count} items)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Category Section - hidden on mobile */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Categories</h3>
            <Button className="bg-pink-500 flex items-center space-x-2">
              <span>Add Category</span>
            </Button>
          </div>

          <div className="flex space-x-6 mb-4">
            {categories.map((cat) => (
              <div 
                key={cat.name} 
                className={`relative flex-1 w-20 h-28 rounded-lg bg-gray-800 flex flex-col items-center justify-center cursor-pointer 
                  ${selectedCategory === cat.name ? 'bg-pink-500' : 'hover:bg-pink-500'}`} 
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className="absolute top-2 right-2">{cat.icon}</div>
                <div className="text-center">
                  <span>{cat.name}</span>
                  <p className="text-gray-400 text-sm">({cat.count} items)</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Heading for Special Items */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Special menu all items</h3>
          <Button className="bg-pink-500">Add New Item</Button> {/* New button added here */}
        </div>

        {/* Mobile Special Menu Button */}
        <div className="md:hidden mb-4">
          <Button className="w-full bg-pink-500 flex items-center justify-center space-x-2">
            <span>Add Menu Item</span>
          </Button>
        </div>

        {/* Desktop Special Menu Buttons - hidden on mobile */}
<div className="hidden md:flex space-x-2 mb-4">
  <Button className="w-40 py-3 text-lg hover:bg-pink-500">Normal Menu</Button>
  <Button className="w-40 py-3 text-lg hover:bg-pink-500">Special Deals</Button>
  <Button className="w-40 py-3 text-lg hover:bg-pink-500">New Year Special</Button>
  <Button className="w-40 py-3 text-lg hover:bg-pink-500">Desserts and Drinks</Button>
</div>


        {/* Mobile Menu Items View */}
        <div className="md:hidden">
          {limitedMenuItems.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-4 mb-2">
                <img 
                  src="https://assets.bonappetit.com/photos/5ea8f0df16738800085ad5d2/1:1/w_2560%2Cc_limit/Chicken-Parmesean-Recipe-Lede.jpg" 
                  alt="Food" 
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Item ID:</span> {item.itemId}
                </div>
                <div>
                  <span className="text-gray-400">Stock:</span> {item.stock}
                </div>
                <div>
                  <span className="text-gray-400">Category:</span> {item.category}
                </div>
                <div>
                  <span className="text-gray-400">Price:</span> {item.price}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-pink-400">{item.availability}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500"><Trash className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View - hidden on mobile */}
        <div className="hidden md:block bg-black p-4 rounded-lg flex-grow overflow-hidden">
          <table className="w-full text-left bg-black">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2"><input type="checkbox" className="form-checkbox" /></th>
                <th className="py-2">Product</th>
                <th>Product Name</th>
                <th>Item ID</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {limitedMenuItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 bg-black">
                  <td className="py-3"><input type="checkbox" className="form-checkbox" /></td>
                  <td className="py-3">
                    <img src="https://assets.bonappetit.com/photos/5ea8f0df16738800085ad5d2/1:1/w_2560%2Cc_limit/Chicken-Parmesean-Recipe-Lede.jpg" alt="Food" className="w-12 h-12 rounded" />
                  </td>
                  <td>{item.name} <p className="text-gray-400 text-sm">{item.description}</p></td>
                  <td>{item.itemId}</td>
                  <td>{item.stock}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td className="text-pink-400">{item.availability}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-500"><Trash className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}