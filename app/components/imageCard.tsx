import {Card, CardHeader} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { Link } from "@nextui-org/link";

export type ImageCardData = {
    header: string;
    title: string;
    image_path: string;
    link: string;
}

export function ImageCard(props: {data: ImageCardData, expanded?: boolean}) {

    const data = props.data;
    const expanded = props.expanded;

    if (expanded) {
        return(
            <Link href={data.link}>
            </Link>
        );
    }
    return (
        <Link href={data.link} className="hover:opacity-100">
        {
            <Card className="h-32 w-32 m-4 md:h-48 md:w-48 ">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-gray-500 dark:text-white/60 uppercase font-bold">{data.header}</p>
            <h4 className="text-gray-800 dark:text-white font-medium text-large">{data.title}</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Card background"
            className="transition ease-out hover:transition-all z-0 w-full h-full object-cover brightness-50 hover:brightness-75"
            src={data.image_path}
            />
        </Card>
        }
        </Link>
    );
}
