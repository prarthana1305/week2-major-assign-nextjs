
"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, Bell, Edit, Trash, Eye, ChevronDown } from 'lucide-react'; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner"; 
import Link from 'next/link'; 

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  salary: number;
  timings: string;
  role: string; // Ensure role is included in the interface
  profilePicture: string;
  attendanceStatus?: 'Present' | 'Leave' | 'Absent' | 'Half Shift'; // Optional attendance status
  date?: string; // Optional date field
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); 

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await fetch('http://localhost:3001/staff');
        if (!response.ok) {
          throw new Error('Failed to fetch staff');
        }
        const data = await response.json();

        // Filter out any invalid records if necessary
        const validStaff = data.filter((member: Staff) => member.id && member.name && member.email); 

        setStaff(validStaff);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    }

    fetchStaff();
  }, []);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Limit the number of displayed staff members to 10
  const displayedStaff = staff.slice(0, 10);

  return (
    <div className="flex h-screen"> 
      <Sidebar />
      <div className="p-6 h-full bg-black text-white flex-1 overflow-hidden"> {/* Set height to full and hide overflow */}
        <Toaster /> {/* Include Toaster here */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <button className="text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-2xl font-semibold">Staff Management</h1>
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

        <div className="flex justify-between items-center mb-6">
          <div>
          <p className="text-gray-400 text-2xl">Staff ({displayedStaff.length})</p> {/* Apply Tailwind class here */}


          </div>
          <div className="flex items-center space-x-4">
          <Button variant="default" className="bg-pink-500 hover:bg-pink-600">Add staff</Button>{/* Light pink button with black text */}
          {/* Light pink button with black text */}
            <Button variant="secondary" className="bg-zinc-900/50 text-gray-400 flex items-center"> {/* Black button with grey text */}
              Sort by <ChevronDown size={16} className="ml-2" /> {/* Dropdown arrow */}
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button variant="secondary" onClick={() => setShowTable(true)}>Staff Management</Button>
          <Button variant="default" className="bg-pink-500 hover:bg-pink-600" onClick={() => setShowAttendance(!showAttendance)}>Attendance</Button>
        </div>

        {showTable && (
          <Card className="bg-gray-800 border-gray-700 overflow-auto"> {/* Allow overflow for the table */}
            <Table className="bg-black text-white">
              <TableHeader className="bg-gray-900/50 text-white">
                <TableRow>
                  <TableHead>
                    <input type="checkbox" className="form-checkbox text-pink-500" />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Timings</TableHead>
                  
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedStaff.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-700/50">
                    <TableCell>
                      <input type="checkbox" className="form-checkbox text-pink-500" />
                    </TableCell>
                    <TableCell>
  <div className="flex items-center">
    <Avatar>
      <AvatarImage src="https://s3-alpha-sig.figma.com/img/e4b8/6602/ca657f125cf14445eb6b9b7a15c568da?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lhgJzKmUWvffquUSrWadPlWeqdSOUFxK~Lxg9NnFifrZDQtjnx5JtHXYc0cWXe8cpimTevMpdX-FwtIF85vxkoDBuXZ0GUVtAhXO1XWptJBut5etB7iqHyF7RslKkw5O4hp9sO7HOzRXniqOduYZh4GlAe1bl1WwC9QUcc4cSlTaQic0HS-IxWttKXQtzEnUaP26O5ly6FmIAywotA2M~J9Otxha2rXjOz1rO3g~83XE1S9q9b1mRzuU7TaGNc8bKt6Y746zFoyNBwR1SWIUHpZPuKZ4168v2EQ9xAoC~nWBSLbg6qIEZgJHrS-kK5gTR8Qiuc2D5fuGGBga2OE4uA__" />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
    <div className="ml-2"> {/* Add margin-left to create a gap */}
      <span className="block">{member.name}</span>
      <span className="text-pink-300 text-sm">{member.role}</span> {/* Change text color to pink */}
    </div>
  </div>
</TableCell>


                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>${member.salary.toLocaleString()}</TableCell>
                    <TableCell>{member.timings}</TableCell>
                   
                    <TableCell>
                      <div className="flex space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-pink-500 rounded-full">
                          <Eye size={16} className="text-black" />
                        </div>
                        <button className="text-gray-400 hover:text-white">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-500 hover:text-white">
                          <Trash size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {showAttendance && (
          <Card className="bg-gray-800 border-gray-700 mt-6 overflow-auto"> {/* Allow overflow for the attendance table */}
            <Table className="bg-black text-white">
              <TableHeader className="bg-black text-white">
                <TableRow>
                  <TableHead>
                    <input type="checkbox" className="form-checkbox text-pink-500" />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Timings</TableHead>
                  <TableHead>Status</TableHead> {/* New Status Column */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedStaff.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-700/50">
                    <TableCell>
                      <input type="checkbox" className="form-checkbox text-pink-500" />
                    </TableCell>
                    <TableCell>{member.id}</TableCell>
                    <TableCell>
  <div className="flex items-center">
    <Avatar>
      <AvatarImage src="https://s3-alpha-sig.figma.com/img/e4b8/6602/ca657f125cf14445eb6b9b7a15c568da?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lhgJzKmUWvffquUSrWadPlWeqdSOUFxK~Lxg9NnFifrZDQtjnx5JtHXYc0cWXe8cpimTevMpdX-FwtIF85vxkoDBuXZ0GUVtAhXO1XWptJBut5etB7iqHyF7RslKkw5O4hp9sO7HOzRXniqOduYZh4GlAe1bl1WwC9QUcc4cSlTaQic0HS-IxWttKXQtzEnUaP26O5ly6FmIAywotA2M~J9Otxha2rXjOz1rO3g~83XE1S9q9b1mRzuU7TaGNc8bKt6Y746zFoyNBwR1SWIUHpZPuKZ4168v2EQ9xAoC~nWBSLbg6qIEZgJHrS-kK5gTR8Qiuc2D5fuGGBga2OE4uA__" />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
    <div className="ml-2"> {/* Add margin-left to create a gap */}
      <span className="block">{member.name}</span>
      <span className="text-pink-300 text-sm">{member.role}</span> {/* Change text color to pink */}
    </div>
  </div>
</TableCell>


                    <TableCell>6-01-2025</TableCell> {/* Hardcoded date */}
                    <TableCell>{member.timings}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Card className="bg-green-500 cursor-pointer w-24 border-none">
                          <div className="p-2 text-center text-black text-sm">Present</div>
                        </Card>
                        <Card className="bg-red-500 cursor-pointer w-24 border-none">
                          <div className="p-2 text-center text-black text-sm">Absent</div>
                        </Card>
                        <Card className="bg-yellow-500 cursor-pointer w-24 border-none">
                          <div className="p-2 text-center text-black text-sm">Half Shift</div>
                        </Card>
                        <Card className="bg-blue-500 cursor-pointer w-24 border-none">
                          <div className="p-2 text-center text-black text-sm">Leave</div>
                        </Card>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}
