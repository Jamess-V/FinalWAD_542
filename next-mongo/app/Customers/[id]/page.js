export default async function Home({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${API_BASE}/customers/${params.id}`, { cache: "no-store" });
  const customer = await data.json();
  console.log({ customer, interest: customer.interest });
  // const id = params.id;
  return (
    <div className="m-4">
      <h1>Customer</h1>
      <p className="font-bold text-xl text-blue-800">{customer.firstName} {customer.lastName}</p>
      <p>{customer.dateOfBirth}</p>
      <p>{customer.memberNumber}</p>
      <p>Interest: {customer.interest.name}</p>
    </div>
  );
}
