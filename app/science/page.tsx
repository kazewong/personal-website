import { Divider } from '@nextui-org/divider';
import '../globals.css'
import { getScienceHighlightData } from '../science/contentParser';
import Image from 'next/image'
import Link from 'next/link'
import { MaterialGroup } from './materialGroup';

export default async function Science() {

	const data = await getScienceHighlightData();

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>I do science</h1>
			</div>
			<div className=''>
				<div className='text-start'>
					<h3 className='text-2xl'>Summary</h3>
					<Divider className='my-4'/>
					<div className="lg:flex py-8 w-full lg:w-[840px]">
						<div className="flex-col justify-center">
							<div className="justify-center flex">
								<Image src='/static/images/portrait.jpg' alt="" width={147} height={147} className="rounded-full"/>
							</div>
							<div className="justify-center flex-col">
								<div className="text-3xl text-center dark:text-gray-300">Kaze W. K Wong</div>
								<div className="text-base text-center dark:text-gray-300">Assistant research professor</div>
								<div className=" text-base text-center dark:text-gray-300">Johns Hopkins University</div>
							</div>
						</div>
						<div className="px-4 lg:w-2/3">
							<div className=" text-xl flex-row justify-start">
								<p className="py-3 text-base">
								I am an assistant research professor in the Department of Applied Mathematics and Statistics at Johns Hopkins University. I am also a software engineer with the Data Science and AI Institute.
								
								I have very broad interest in many different subjects. In brief, I spend 20-30% of my time thinking about <strong>astrophysics</strong>, ~40% of my time trying to <strong>understand to make neural network robust and how to tune them</strong>, and the remaining time <strong>building production-grade domain science applications</strong>. My work is primarily computational and I care about <strong>open source software</strong> a lot. See below for some of the topics I am currently working on. 
								
								<div className='flex flex-col py-4'>
									<div className='flex flex-row py-2'>
										<p className='px-2'>
											<a href="https://kazewong.github.io/CV">
												<img src="https://img.shields.io/badge/My-CV-blue?style=for-the-badge" alt="" className="h-6"/>
											</a>
										</p>

									</div>
									<div className='flex flex-row py-2'>
										<p className='px-2'>
											<a href="https://inspirehep.net/authors/1789361?ui-citation-summary=true">
												<img src="https://img.shields.io/badge/publication-inspire-green?style=for-the-badge" alt="" className="h-6"/>
											</a>
										</p>
										<p className='px-2'>
											<a href="https://scholar.google.com/citations?user=oQDoPMsAAAAJ&hl=en">
												<img src="https://img.shields.io/badge/publication-google-green?style=for-the-badge" alt="" className="h-6"/>
											</a>
										</p>

									</div>
									<div className='flex flex-row py-2'>
										<p className='px-2'>
											<img src="https://img.shields.io/github/stars/kazewong"/>
										</p>
									</div>
								</div>

								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='text-start'>
					<h3 className='text-2xl'>Research Highlight</h3>
					<Divider className='my-4'/>
						<p className='px-4 py-2'>
							Here are some topics I am or have been working on. I am big believer in collaborative work instead of racing against each other, so if you find any of the following topics interested you, feel free to reach out to me.
						</p>
						<div className="flex-column">
							{data.map((HighlighData) => (
								<div className="p-2">
									<Link href={HighlighData.link} className='text-cyan-500 text-large'>{HighlighData.title}</Link>
									<div className="text-san">{HighlighData.description}</div>
								</div>	
							))}
						</div>
				</div>

				<div className='text-start'>
					<h3 className='text-2xl'>Machine learning clinic</h3>
					<Divider className='my-4'/>
						<p className='px-4 py-2'>
							
						</p>
				</div>
			</div>
		</div>
	);
}