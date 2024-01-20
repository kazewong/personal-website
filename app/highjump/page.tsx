import { Divider } from '@nextui-org/divider';

export default function HighJump() {
	return (
		<div className="lg:flex flex-col py-8 justify-center">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Athletic Kaze</h1>
			</div>

			<div className=''>
				<div className='text-start'>
					<h3 className='text-2xl'>Story so far</h3>
					<Divider className='my-4'/>

					<h3 className='text-2xl'>Progression</h3>
					<Divider className='my-4'/>
					<div className='flex justify-center'>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/W2OABKUAQgg?si=MQR_-A1JPnXhru9E" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
					</div>

					<h3 className='text-2xl'>Data</h3>
					<Divider className='my-4'/>
				</div>
			</div>
		</div>
	);
}