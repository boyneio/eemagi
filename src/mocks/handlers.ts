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

const photos: Photo[] = [
  {
    id: 1,
    title: "Big Sur",
    caption: "BEACH!",
    thumbnailUrl: `${root}photos/1?mini=true`,
    fullSizeUrl: `${root}static/1?<some_signature>`,
  },
  {
    id: 2,
    title: "Big Sur with Clouds",
    caption: "Nice Bridge",
    thumbnailUrl: `${root}photos/2?mini=true`,
    fullSizeUrl: `${root}static/2?<some_signature>`,
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
  }),
  rest.get(`${root}photos`, (req, res, ctx) => {
    return res(ctx.json(photos));
  }),
  rest.get(`${root}photos/:photoId`, async (req, res, ctx) => {
    const { photoId } = req.params;
    const mini = !!req.url.searchParams.get("mini");
    const index = parseInt(photoId) - 1;
    const image = await Jimp.read(images[index]);
    if (mini) {
      (await image).resize(100, Jimp.AUTO);
    }
    const imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      // Respond with the "ArrayBuffer".
      ctx.body(imageBuffer)
    );
  }),
  rest.get(`${root}static/:photoId`, async (req, res, ctx) => {
    const { photoId } = req.params;
    const index = parseInt(photoId) - 1;
    const image = await Jimp.read(images[index]);
    const imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      // Respond with the "ArrayBuffer".
      ctx.body(imageBuffer)
    );
  }),
];
