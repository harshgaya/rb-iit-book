import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function listBanners() {
  const db = await getDb();
  return db.collection("banners").find({}).sort({ order: 1 }).toArray();
}

export async function saveBanner(body) {
  const db = await getDb();
  if (body._id && ObjectId.isValid(body._id)) {
    const { _id, ...rest } = body;
    await db.collection("banners").updateOne({ _id: new ObjectId(_id) }, { $set: rest }, { upsert: true });
    return { ...rest, _id };
  }
  const result = await db.collection("banners").insertOne(body);
  return { ...body, _id: result.insertedId };
}

export async function deleteBanner(id) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) return false;
  const result = await db.collection("banners").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
