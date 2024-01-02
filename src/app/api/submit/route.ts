import connectToDatabase from "@/lib/db";

import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // ...

//   try {
//     await connectToDatabase();

//     const existingUser = await User.findOne({
//       email: req.body.email,
//     });
//     if (!existingUser) {
//       const user = await User.create({
//         ...req.body,
//         message: [
//           {
//             text: req.body.message,
//             date: new Date(),
//           },
//         ],
//       });
//       await user.save();
//       res.status(200).json({ message: "User created" });
//       return;
//     }
//     existingUser.message.push({
//       text: req.body.message,
//       date: new Date(),
//     });
//     await existingUser.save();
//     res.status(200).json({ message: "Message added" });
//     return;
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// }

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // ...

  try {
    // await connectToDatabase();
    // const users = await User.find({});
    res.status(200).json({ heello: "hello from the server" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
