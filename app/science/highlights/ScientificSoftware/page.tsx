import { Divider } from '@nextui-org/divider';

export default async function ScientificSoftware() {

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Open Source Scientific Software</h1>
			</div>
			<div className=''>

                <div className='text-start'>
					<h3 className='text-2xl'>Why am I interested?</h3>
					<Divider className='my-4'/>
                    <p>
                        The nature of my research is very computational, but not necessary in the computer science way. I care about code running fast and efficient as much as I care about the practicality in applying to domain-specific problems and seeing results.
                        To do this, I believe honing the tools I use for these domain-specific problems is the first step to high quality research.
                        I love learning about new and wacky knowledge that are otherwise not going to cross path with me, and I enjoy asking and exploring unsolved problems even more.
                        Unfortunately, just like any other human being, I have limited time and capability, so I enjoy working with domain experts to tackle unsolve problems.
                        Domain experts often spend most of their time dealing with problems with the tools they picked up during their training, experimentalists are great at doing lab, theorists can do amazing math.
                        My role in projects I involved in is usually the person who talks to the computer a lot. On one hand I have to learn the theory and domain-specific knowledge, on the other hand I can apply whatever I know about buidling software, or even techniques from other domains to solve the problems.
                        I deeply enjoy helping others solving their problems, and build high quality open source software to serve the broad community. It is really fun to be able to work on black holes, biomechanical models, and seeing my CPU and GPU utilization goes to 100% at the same time!
                    </p>
                    <p>
                        Beside deeply enjoying supporting others and building efficient code, I believe this is also of interest the science community. 
                    </p>

				</div>
				<div className='text-start'>
					<h3 className='text-2xl'>What do I work on?</h3>
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