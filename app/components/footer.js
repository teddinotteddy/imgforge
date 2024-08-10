import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="py-2">
      <Separator />
      <p className="py-2 text-xs text-center">Made with ❤️</p>
      <div className="flex justify-center">
        <Link href="https://github.com/teddinotteddy">
          <Image src="/github.svg" width={15} height={15} />
        </Link>
      </div>
    </div>
  );
}
