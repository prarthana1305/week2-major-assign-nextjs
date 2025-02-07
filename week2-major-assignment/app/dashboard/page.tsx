"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronLeft } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import Link from 'next/link';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  status: string;
}

interface Metric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  date?: string;
}

interface GraphData {
  month: string;
  sales: number;
  revenue: number;
}

export default function Dashboard() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [metrics, setMetrics] = useState<{ [key: string]: Metric }>({});
  const [chartData, setChartData] = useState<GraphData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 428); // iPhone 13/14 width
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dishesRes, metricsRes, graphRes] = await Promise.all([
          axios.get('http://localhost:4000/dashboard/dishes'),
          axios.get('http://localhost:4000/dashboard/metrics'),
          axios.get('http://localhost:4000/dashboard/graph')
        ]);

        setDishes(dishesRes.data);
        setMetrics(metricsRes.data);
        setChartData(graphRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      {!isMobile && <Sidebar />}
      <div className={`${isMobile ? 'w-full p-4' : 'p-6'} min-h-screen bg-black text-white flex-1`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button className="text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold`}>Dashboard</h1>
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

        {/* Metric Cards */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'md:grid-cols-3 gap-4'} mb-6`}>
          {Object.values(metrics).map((metric, index) => (
            <div key={index} className="bg-zinc-900/50 border-gray-700 text-white p-4 rounded-md h-[120px] relative">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-sm font-medium">{metric.label}</h2>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="pink" className="h-8 w-8">
                  <circle cx="12" cy="12" r="10" />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">
                    {metric.prefix || ''}
                  </text>
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold">
                  {metric.prefix}{metric.value}{metric.suffix}
                </div>
                {metric.date && <p className="text-xs text-gray-400">{metric.date}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Dishes Section */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mb-6`}>
          {[1, 2].map((section) => (
            <div key={section} className="bg-black border-gray-700 text-white">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium">Popular Dishes</h2>
                <Link href="#" className="text-xs text-pink-400">See All</Link>
              </div>
              <ScrollArea className={`${isMobile ? 'h-[200px]' : 'h-[150px]'} w-full rounded-md`}>
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-800 rounded-lg mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{dish.name}</p>
                        <p className="text-xs text-gray-400">${dish.price}</p>
                      </div>
                    </div>
                    <div className={`text-xs ${dish.status === 'In Stock' ? 'text-pink-500' : 'text-red-500'}`}>
                      {dish.status}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          ))}
        </div>

        {/* Overview Section with Chart */}
        <div className="bg-zinc-900/50 border border-gray-700 rounded-lg p-4">
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between'} items-center mb-4`}>
            <h2 className="text-sm font-medium">Overview</h2>
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1 text-xs bg-pink-500 text-white rounded-md">Monthly</button>
              <button className="px-3 py-1 text-xs bg-transparent text-gray-400 rounded-md">Daily</button>
              <button className="px-3 py-1 text-xs bg-transparent text-gray-400 rounded-md">Weekly</button>
              <button className="px-3 py-1 text-xs bg-transparent text-gray-400 rounded-md">Export</button>
            </div>
          </div>
          
          <div className={`${isMobile ? 'h-[300px]' : 'h-[200px]'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#333' }}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#333' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '4px'
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#ff69b4"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#666"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}