import Image from "next/image"

type FigureCardProps = {
    title: string;
    description: string;
    image: string;
}

export function FigureCard(props: FigureCardProps): JSX.Element {
    return (
        <div className=" px-[61px] py-[52px]  rounded-[25px] justify-start items-start gap-[75px] inline-flex">
        <div className=" bg-zinc-300 rounded-full">
            <Image src={props.image} alt="Kaze Wong" width={147} height={147} className="rounded-full" priority={true} />
        </div>
        <div className="text-black text-[12px] font-normal">{props.description}</div>
        </div>
    );
}
