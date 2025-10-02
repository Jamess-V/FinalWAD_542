"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit } = useForm();
  const [ customers, setCustomers] = useState([]);

  async function fetchCustomers() {
    const data = await fetch(`${API_BASE}/customers`);
    // const data = await fetch(`http://localhost:3000/product`);
    const p = await data.json();
    setCustomers(p);
  }

  async function fetchInterests() {
    const data = await fetch(`${API_BASE}/interests`);
    const c = await data.json();
    setInterests(c);
  }

  const createCustomer = (data) => {
    fetch(`${API_BASE}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchCustomers());
  }
  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API_BASE}/customers/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  }
  useEffect(() => {
    fetchCustomers();
    fetchInterests();
  }, []);
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 w-64 ">
        <form onSubmit={handleSubmit(createCustomer)}>
          <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
            <div>First Name:</div>
            <div>
              <input
                name="firstName"
                type="text"
                {...register("firstName", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Last Name:</div>
            <div>
              <input
                name="lastName"
                type="text"
                {...register("lastName", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Date of Birth:</div>
            <div>
              <input
                name="dateOfBirth"
                {...register("dateOfBirth", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Member Number:</div>
            <div>
              <input
                name="memberNumber"
                type="number"
                {...register("memberNumber", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Interest:</div>
            <div>
              <select
                name="interest"
                {...register("interest", { required: true })}
                className="border border-black w-full"
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <input
                type="submit"
                value="Add"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="border m-4 bg-slate-300 flex-1 w-64">
        <h1 className="text-2xl">Customers ({customers.length})</h1>
        <ul className="list-disc ml-8">
          {
            customers.map((c) => (
              <li key={c._id}>
                <button className="border border-black p-1/2" onClick={deleteById(c._id)}>❌</button>{' '}
                <Link href={`/customers/${c._id}`} className="font-bold">
                  {c.firstName} {c.lastName}
                </Link>{" "}
                - {c.dateOfBirth}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
