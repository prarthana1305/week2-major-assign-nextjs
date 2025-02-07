"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Bell, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Sidebar } from '../components/Sidebar';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';
import { Toaster } from "@/components/ui/sonner"; 

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex min-h-screen bg-zinc-950 flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />
      <div className="p-4 md:p-6 h-full bg-black text-white flex-1 overflow-hidden"> {/* Set height to full and hide overflow */}
        <Toaster /> {/* Include Toaster here */}
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div className="flex items-center gap-2">
            <button className="text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold">Profile</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400">
              <Bell size={20} />
            </button>
            <Link href="/profile"> {/* Use Link for navigation */}
              <Avatar>
                <AvatarImage src="https://s3-alpha-sig.figma.com/img/e4b8/6602/ca657f125cf14445eb6b9b7a15c568da?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lhgJzKmUWvffquUSrWadPlWeqdSOUFxK~Lxg9NnFifrZDQtjnx5JtHXYc0cWXe8cpimTevMpdX-FwtIF85vxkoDBuXZ0GUVtAhXO1XWptJBut5etB7iqHyF7RslKkw5O4hp9sO7HOzRXniqOduYZh4GlAe1bl1WwC9QUcc4cSlTaQic0HS-IxWttKXQtzEnUaP26O5ly6FmIAywotA2M~J9Otxha2rXjOz1rO3g~83XE1S9q9b1mRzuU7TaGNc8bKt6Y746zFoyNBwR1SWIUHpZPuKZ4168v2EQ9xAoC~nWBSLbg6qIEZgJHrS-kK5gTR8Qiuc2D5fuGGBga2OE4uA__" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Div */}
          <div className="bg-zinc-900/50 border-0 p-4 space-y-2 md:w-1/4">
            <Button className="w-full bg-pink-200 hover:bg-pink-300 text-zinc-900">
              My Profile
            </Button>
            <Button variant="ghost" className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800">
              Manage Access
            </Button>
            <Button variant="ghost" className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800">
              Logout
            </Button>
          </div>

          {/* Right Div */}
          <div className="flex-1 bg-zinc-900/50 border-0 p-6">
            <h2 className="text-xl text-white mb-6">Personal Information</h2>
            
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-zinc-800 overflow-hidden">
                  <img 
                    src="https://s3-alpha-sig.figma.com/img/e4b8/6602/ca657f125cf14445eb6b9b7a15c568da?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lhgJzKmUWvffquUSrWadPlWeqdSOUFxK~Lxg9NnFifrZDQtjnx5JtHXYc0cWXe8cpimTevMpdX-FwtIF85vxkoDBuXZ0GUVtAhXO1XWptJBut5etB7iqHyF7RslKkw5O4hp9sO7HOzRXniqOduYZh4GlAe1bl1WwC9QUcc4cSlTaQic0HS-IxWttKXQtzEnUaP26O5ly6FmIAywotA2M~J9Otxha2rXjOz1rO3g~83XE1S9q9b1mRzuU7TaGNc8bKt6Y746zFoyNBwR1SWIUHpZPuKZ4168v2EQ9xAoC~nWBSLbg6qIEZgJHrS-kK5gTR8Qiuc2D5fuGGBga2OE4uA__" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button 
                  size="icon" 
                  className="absolute -bottom-1 -right-1 rounded-full bg-pink-400 hover:bg-pink-500 p-1.5"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">John Doe</h3>
                <p className="text-zinc-400">Manager</p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">First Name</label>
                <Input 
                  className="mt-1.5 bg-zinc-800/50 border-0 text-white"
                  value="John Doe"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Email</label>
                <Input 
                  className="mt-1.5 bg-zinc-800/50 border-0 text-white"
                  value="johndoe123@gmail.com"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Address</label>
                <Input 
                  className="mt-1.5 bg-zinc-800/50 border-0 text-white"
                  value="123 Street USA, Chicago"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-sm text-zinc-400">New Password</label>
                  <Input 
                    type={showPassword ? "text" : "password"}
                    className="mt-1.5 bg-zinc-800/50 border-0 text-white pr-10"
                  />
                  <div className="absolute right-2 top-8">
                    <Button 
                      size="icon" 
                      onClick={togglePasswordVisibility}
                      className="bg-transparent"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <label className="text-sm text-zinc-400">Confirm Password</label>
                  <Input 
                    type={showConfirmPassword ? "text" : "password"}
                    className="mt-1.5 bg-zinc-800/50 border-0 text-white pr-10"
                  />
                  <div className="absolute right-2 top-8">
                    <Button 
                      size="icon" 
                      onClick={toggleConfirmPasswordVisibility}
                      className="bg-transparent"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Discard Changes
              </Button>
              <Button className="bg-pink-400 hover:bg-pink-500 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
