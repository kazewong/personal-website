import { Divider } from '@nextui-org/divider';
import '../globals.css'
import { getScienceHighlightData } from '../science/contentParser';
import Image from 'next/image'
import Link from 'next/link'

export default function Science() {

	const data = getScienceHighlightData();

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Science Kaze</h1>
			</div>
			<div className=''>
				<div className='text-start'>
					<h3 className='text-2xl'>Summary</h3>
					<Divider className='my-4'/>
					<div className="lg:flex py-16 w-full lg:w-[840px]">
						<div className="flex-col justify-center">
							<div className="justify-center flex">
								<Image src='/static/images/portrait.jpg' alt="" width={147} height={147} className="rounded-full"/>
							</div>
							<div className="justify-center flex-col">
								<p className="text-3xl text-center">Kaze W. K Wong</p>
								<p className="text-base text-center">Flatiron research fellow</p>
								<p className=" text-base text-center">Flatiron institute</p>
							</div>
						</div>
						<div className="px-4 lg:w-2/3">
							<div className=" text-xl flex-row justify-start">
								<p className="py-3 text-base">
								I am a research fellow at the Flatiron Institute, mostly spending my time <b>building codes</b> to analyze <b>gravitational-wave</b> data and studying <b>black holes</b>.
								I also spend a significant amount of time trying to figure out how to use <b>machine-learning</b> techniques to answer science questions in <b>robust and interpretable ways</b>.
								</p>
								<p className=" py-3 text-base">
								Feel free to use whatever materials you find on this site, and I will greatly appreciate it if you can credit me for the material.
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
					
				</div>
				<div className='text-start'>
					<h3 className='text-2xl'>Materials</h3>
					<Divider className='my-4'/>
				</div>
			</div>
		</div>
	);
}