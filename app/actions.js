"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  const result = await response.blob();
  return result;
}

export async function generateImage(formData) {
  const cookieStore = cookies();
  let userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    userId = uuidv4();
    cookieStore.set("user_id", userId, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });
  }

  const image = await query({ inputs: formData.get("prompt") });
  const filename = `${uuidv4()}.jpg`;

  const { url } = await put(filename, image, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const existingUrls = (await kv.get(userId)) || [];
  const updatedUrls = Array.isArray(existingUrls)
    ? [...existingUrls, url]
    : [existingUrls, url];

  await kv.set(userId, updatedUrls);

  revalidatePath("/");

  return url;
}

export async function getImages(userId) {
  const urls = await kv.get(userId);

  if (!urls) {
    return [];
  }

  return Array.isArray(urls) ? urls : [urls];
}
