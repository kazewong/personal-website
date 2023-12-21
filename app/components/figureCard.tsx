import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export type ImageCardData = {
    header: string;
    title: string;
    image_path: string;
    link: string;
}

export function ImageCard(data: ImageCardData) {
    return (
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
    <Card className="col-span-12 sm:col-span-4 h-[300px]" isPressable onPress={()=>console.log("item pressed")}>
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
    </div>
    );
}
