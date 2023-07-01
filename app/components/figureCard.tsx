import Image from "next/image"

type FigureCardProps = {
    title: string;
    description: string;
    image: string;
}

export function FigureCard(props: FigureCardProps): JSX.Element {
    return (
        <div className="py-16 rounded-[25px] flex-col w-3/5">
            <div className="flex place-content-center">
            <Image src={props.image} alt="" width={147} height={147} className="rounded-full" priority={true} />
            </div>
            <div className="px-4">
                <div className="text-black text-4xl ">{props.title}</div>
                <div className="text-black text-">{props.description}</div>
            </div>
        </div>
    );
}
