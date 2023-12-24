import { Divider } from '@nextui-org/divider';
import '../globals.css'
import { getScienceHighlightData } from '../science/contentParser';

export default function Science() {

	const data = getScienceHighlightData();

	return (
		<div className="lg:flex flex-col py-8 justify-center">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Science Kaze</h1>
			</div>
			<div className=''>
				<div className='text-start'>
					<h3 className='text-2xl'>Summary</h3>
					<Divider className='my-4'/>
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