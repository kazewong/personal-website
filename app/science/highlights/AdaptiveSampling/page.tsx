import { Divider } from '@nextui-org/divider';

export default async function AdaptiveSampling() {

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>AdaptiveSampling</h1>
			</div>
			<div className=''>
                <div className='text-start'>
					<h3 className='text-2xl'>Why am I interested?</h3>
					<Divider className='my-4'/>
					<p>
						Solving inverse problems is a very common task in many scientific and engineering fields. The task can be summarized as: "You give me some data, I will give you some probability distributions of parameters that you might care about.". For example, given a time series of gravitational wave strain, find out what is the posterior distribution of the masses of the black holes that caused the gravitational wave. The is a very important process that quantify the uncertainty of a measurement. A measurement without any uncertainty is the same as no measurement.
					</p>
					<p>
						Solving inverse problems often involves some sampling procedure or optimization procedure, such as Markov Chain Monte Carlo (MCMC), Variational Inference (VI), or more modernly, through simulated-based inference (SBI). There are different trade-offs between these methods. For example, MCMC is regarded as the gold standard for sampling from a posterior distribution, but it can be slow when compared to VI. SBI can be very fast and very accurate, but if the simulation does not represent the true systems well, it is very hard to diagnose where the systematics are coming from. I am interested in composing these methods to exploit their strengths and mitigate their weaknesses.
					</p>
					<p>
						The interplay between these methods are quite delicate and rather unclear to the community (as of 2024). For me, on one hand I enjoy adding new stuffs into the mix to see what it does, but it is also important to understand the reasons why certain ways of composing these methods work better than others.
					</p>
				</div>
				<div className='text-start'>
					<h3 className='text-2xl'>What do I work on?</h3>
					<Divider className='my-4'/>
					<h4 className='text-xl py-1'>Tuning for flowMC</h4>
					<p>
					</p>
					<h4 className='text-xl py-1'>Scaling to higher dimension</h4>
					<p>
					</p>

				</div>

				<div className='text-start'>
					<h3 className='text-2xl'>Materials</h3>
					<Divider className='my-4'/>
				</div>
			</div>
		</div>
	);
}