import { Divider } from '@nextui-org/divider';

export default async function DataDrivenAstrophysics() {

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Data-driven Astrophysics</h1>
			</div>
			<div className=''>
                <div className='text-start'>
					<h3 className='text-2xl'>Why am I interested?</h3>
					<Divider className='my-4'/>
					 
				</div>
				<div className='text-start'>
					<h3 className='text-2xl'>What do I work on?</h3>
					<Divider className='my-4'/>

				</div>
				<div className='text-start'>
					<h3 className='text-2xl'>Publications</h3>
					<Divider className='my-4'/>
				</div>
			</div>
		</div>
	);
}