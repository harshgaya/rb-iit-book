import { getDb } from "@/lib/mongodb";

export async function getDashboard() {
  const db = await getDb();
  const [
    totalBooks,
    inStock,
    outOfStock,
    byClass,
    totalLeads,
    leadsLast7Days,
    recentBooks,
    recentLeads,
    eventCounts,
  ] = await Promise.all([
    db.collection("products").countDocuments({}),
    db.collection("products").countDocuments({ in_stock: true }),
    db.collection("products").countDocuments({ in_stock: false }),
    db
      .collection("products")
      .aggregate([
        { $group: { _id: "$class", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ])
      .toArray(),
    db.collection("query").countDocuments({}),
    db
      .collection("query")
      .countDocuments({
        created_at: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }),
    db
      .collection("products")
      .find({})
      .sort({ created_at: -1 })
      .limit(5)
      .toArray(),
    db.collection("query").find({}).sort({ created_at: -1 }).limit(5).toArray(),
    db
      .collection("website_events")
      .aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }])
      .toArray(),
  ]);
  return {
    totalBooks,
    inStock,
    outOfStock,
    byClass,
    totalLeads,
    leadsLast7Days,
    recentBooks,
    recentLeads,
    eventCounts,
  };
}
