import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET() {
    await client.connect();
    const db = client.db();
    const customers = await db.collection('customers').find({}).toArray();
    return NextResponse.json(customers);
}

export async function POST(request) {
    const data = await request.json();
    await client.connect();
    const db = client.db();
    const result = await db.collection('customers').insertOne(data);
    return NextResponse.json(result.ops[0]);
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await client.connect();
    const db = client.db();
    const result = await db.collection('customers').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });

}
export async function GET(){ 
    await client.connect();
    const db = client.db();
    const customers = await db.collection('customers').find({}).toArray();
    return NextResponse.json(customers);
}