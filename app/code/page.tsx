import { Divider } from '@nextui-org/divider';

import '../globals.css'
export default function Code() {
	return (
		<div className="lg:flex flex-col py-8 justify-center">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Nerdy Kaze</h1>
			</div>
			<div className="lg:flex flex-col py-8 justify-center">
				<div className=''>
					<div className='text-start'>
						<h3 className='text-2xl'>Libraries</h3>
						<Divider className='my-4'/>
					</div>
					<div className='text-start'>
						<h3 className='text-2xl'>Web demo gallery</h3>
						<Divider className='my-4'/>
						<p>
						One of the most underlooked aspect of software in science is the distribution side of the story. There reason why the internet has changed our society so much is because it is so easy to share information. Imagine in an alternative reality, browsing each website require one to compile the website from source, we would not be able to enjoy the internet as we do today.
						</p>

						<p>
						A part of my work is now dedicate to making web tools that can run on multiple platforms without the need of installing anything. They also run using client side resource, instead of relying on a server, meaning we don't have to worry about the server going down. Listed below is a bunch of webtools:
						</p>
						
					</div>
				</div>
			</div>
		</div>
	);
}