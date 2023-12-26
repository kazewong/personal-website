import {Card, CardHeader} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { Link } from "@nextui-org/link";

export type ImageCardData = {
    header: string;
    title: string;
    image_path: string;
    link: string;
}

export function ImageCard(data: ImageCardData) {
    return (
        <Link href={data.link}>
        {
             <Card className="h-32 w-32 md:h-48 md:w-48 md:m-8">
             <CardHeader className="absolute z-10 top-1 flex-col !items-start">
             <p className="text-tiny text-white/60 uppercase font-bold">{data.header}</p>
             <h4 className="text-white font-medium text-large">{data.title}</h4>
             </CardHeader>
             <Image
             removeWrapper
             alt="Card background"
             className="z-0 w-full h-full object-cover"
             src={data.image_path}
             />
         </Card>
        }
        </Link>
    );
}
