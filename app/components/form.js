"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { generateImage } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Download from "./download";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Create"}
    </Button>
  );
}

export default function Form() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const dataUrl = await generateImage(formData);
      setImageUrl(dataUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[600px]">
        <CardContent className="space-y-2 pt-6">
          <form action={handleSubmit}>
            <div className="flex w-full space-x-2">
              <Input
                name="prompt"
                placeholder="An astronaut riding a horse..."
              />
              <SubmitButton />
            </div>
          </form>
          {imageUrl && (
            <div className="mt-4 space-y-2 relative">
              <Separator />
              <div className="flex justify-center relative">
                <Image
                  className="rounded-sm"
                  src={imageUrl}
                  alt="Generated image"
                  width={500}
                  height={500}
                />
                <div className="absolute top-2 right-2">
                  <Download url={imageUrl} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
