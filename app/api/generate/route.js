import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("SenTools");
  const collection = db.collection("urls");

  // Check if the short url exists
  const doc = await collection.findOne({ shorturl: body.shorturl });
  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "URL already exists!",
    });
  }

  const result = await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl,
  });

  return Response.json({
    success: true,
    error: false,
    message: "URL Generated Successfully",
  });
}
// import { db } from "@/lib/firebase";
// import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// export async function POST(request) {
//   const body = await request.json();
//   const urlsCollection = collection(db, "urls");

//   // Check if the short URL exists
//   const q = query(urlsCollection, where("shorturl", "==", body.shorturl));
//   const querySnapshot = await getDocs(q);

//   if (!querySnapshot.empty) {
//     return Response.json({
//       success: false,
//       error: true,
//       message: "URL already exists!",
//     });
//   }

//   await addDoc(urlsCollection, {
//     url: body.url,
//     shorturl: body.shorturl,
//   });

//   return Response.json({
//     success: true,
//     error: false,
//     message: "URL Generated Successfully",
//   });
// }
