import { rest } from "msw";
import { User, Photo } from "../types";
import image1 from "./big_sur.jpeg";
import image2 from "./big_sur_cloudy.jpeg";
import Jimp, { cssColorToHex } from "jimp";

const images = [image1, image2];

const root = process.env.REACT_APP_API_URL;

const users: User[] = [
  {
    id: 1,
    username: "jgrant",
    firstName: "Josh",
    lastName: "Grant",
  },
  {
    id: 2,
    username: "arod",
    firstName: "Adan",
    lastName: "Rodrigiez",
  },
];

export const handlers = [
  rest.get(`${root}user`, (req, res, ctx) => {
    const userId = 1;
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res(ctx.status(404));
    }
    return res(
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(user)
    );
  })
];
