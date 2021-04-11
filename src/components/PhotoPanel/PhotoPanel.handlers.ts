import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import image1 from "../../mocks/big_sur.jpeg"
import image2 from "../../mocks/big_sur_cloudy.jpeg";
import Jimp from "jimp";
import { Photo } from "../../types";

const images = [image1, image2];

const root = process.env.REACT_APP_API_URL;

export const photos: Photo[] = [
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

const successHanlder = async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
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
}

export const handlers = [
    rest.get(`${root}photos`, (req, res, ctx) => {
      return res(ctx.json(photos));
    }),
    rest.get(`${root}photos/:photoId`, async (req, res, ctx) => {
        return successHanlder(req, res, ctx);
    })
]