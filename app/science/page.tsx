import { Divider } from '@nextui-org/divider';
import '../globals.css'
import { getScienceHighlightData } from '../science/contentParser';
import Image from 'next/image'
import Link from 'next/link'

export default async function Science() {

	const data = await getScienceHighlightData();

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Science Kaze</h1>
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
								<div className="text-base text-center dark:text-gray-300">Flatiron research fellow</div>
								<div className=" text-base text-center dark:text-gray-300">Flatiron institute</div>
							</div>
						</div>
						<div className="px-4 lg:w-2/3">
							<div className=" text-xl flex-row justify-start">
								<p className="py-3 text-base">
								I am a research fellow at the Flatiron Institute, mostly spending my time <b className='dark:text-gray-300'>building codes</b> to analyze <b className='dark:text-gray-300'>gravitational-wave</b> data and studying <b className='dark:text-gray-300'>black holes</b>.
								I also spend a significant amount of time trying to figure out how to use <b className='dark:text-gray-300'>machine-learning</b> techniques to answer science questions in <b className='dark:text-gray-300'>robust and interpretable ways</b>.
								</p>
								<p className="py-3 text-base">Link to CV: <Link href="https://kazewong.github.io/CV" className='text-cyan-500 underline'>https://kazewong.github.io/CV</Link></p>
								<p className="py-3 text-base">Publication profile: <Link href="https://inspirehep.net/authors/1789361?ui-citation-summary=true" className='text-cyan-500  underline'>https://inspirehep.net/authors/1789361?ui-citation-summary=true</Link></p>
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
					<h3 className='text-2xl'>Materials</h3>
					<Divider className='my-4'/>
					<p className='px-4 '>
							Open science is one of my fundamental beliefs. I spent a great deal of time developing open-source codes and workflow, as well as writing tutorials (for teaching myself, more often than not) and documentations, so it would be weird if I don't share them here. You can find my codes, tutorials, as well as presentations and other kind of materials below, feel free to use them and share them. I would appreciate any feedbacks and if you can cite the relevant papers if you find them useful.
					</p>
				</div>
			</div>
		</div>
	);
}