import Replicate from "replicate";
import { config } from "dotenv";
import fetch from "isomorphic-fetch";

type IDFormat = `${string}/${string}:${string}`;

export default async function isDogPresent(imageUrl: string) {
  config();
  
  const dogPrompt =
    "return true if a dog is in the image; return false otherwise";

  
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("TOKEN MISSING.");
  }

  if (!process.env.IDENTIFIER) {
    throw new Error("ID MISSING.");
  }

  const ID : IDFormat = process.env.IDENTIFIER as IDFormat;

  // FETCH IMPORT REQUIRED TO HANDLE WEIRD ERROR. REMOVE TO SEE
  const replicate = new Replicate({
    auth    : process.env.REPLICATE_API_TOKEN,
    fetch,
  });

  const containsDog = await replicate.run(
    ID,
    {
      input      : {
        image    : imageUrl,
        question : dogPrompt,
      },
    }
  );

  return containsDog;
}
