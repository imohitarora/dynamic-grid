"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
}

interface UserDetailsFormProps {
  userId: number;
}

async function fetchData(userId: number) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

export default function UserDetailsForm({ userId }: UserDetailsFormProps) {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userId", userId],
    queryFn: () => fetchData(userId),
  });

  React.useEffect(() => {
    if (data) {
      const user = data.user;
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        street: user.address.street,
        city: user.address.city,
        zipCode: user.address.zipCode,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button onClick={() => router.push("/dashboard")} variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">User Details</h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button onClick={() => router.push("/dashboard")} variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save User</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardDescription>Edit the user&apos;s personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" value={user.name} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" value={user.phone} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" name="street" type="text" value={user.street} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" type="text" value={user.city} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input id="zipCode" name="zipCode" type="text" value={user.zipCode} onChange={handleInputChange} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>User Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Delete User</CardTitle>
                    <CardDescription>Permanently remove this user and all their data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="destructive">
                      Delete User
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save User</Button>
            </div>
          </div>
        </main>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
