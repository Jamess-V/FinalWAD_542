import Product from "@/models/Product";

export async function GET(request, { params }) {
  console.log(params)
  const id = params._id;
  const customer = await Customer.findById(id).populate("interest");
  console.log({ customer });
  return Response.json(customer);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  return Response.json(await Product.findByIdAndDelete(id));
}
