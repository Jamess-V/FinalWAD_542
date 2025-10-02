import Category from "@/models/Category";

export async function GET(request) {
  // console.log('GET /api/category',request.nextUrl.searchParams.get("pno"))
  const pno = request.nextUrl.searchParams.get("pno")
  if (pno) {
    const size = 3 // TODO fix this hard code
    const startIndex = (pno - 1) * size
    const interests = await Interest.find()
      .sort({ order: -1 })
      .skip(startIndex)
      .limit(size)
    return Response.json(interests)
  }

  const s = request.nextUrl.searchParams.get("s")
  if (s) {
    const interests = await Interest
      .find({ name: { $regex: s, $options: 'i' } })
      .sort({ order: -1 })
    return Response.json(interests)
  }

  const interests = await Interest.find().sort({ order: -1 })
  return Response.json(interests)
}

export async function POST(request) {
  const body = await request.json()
  const interest = new Interest(body)
  await interest.save()
  return Response.json(interest)
}



// for V2
export async function PUT(request) {
  const body = await request.json()
  const category = await Category.findByIdAndUpdate(body._id, body)
  return Response.json(category)
}