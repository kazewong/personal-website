import { Divider } from '@nextui-org/divider';
import Image from 'next/image'
import Link from 'next/link'


export default async function GravitationalWave() {

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Gravitational waves</h1>
			</div>
			<div className=''>
                <div className='text-start'>
					<h3 className='text-3xl'>Background</h3>
					<Divider className='my-4'/>
					<p>
					</p>
				</div>
				<div className='text-start'>
					<h3 className='text-3xl'>Why am I interested?</h3>
					<Divider className='my-4'/>
					{/* <p>
					The year was 2016, which is the year when the first direct detection of GWs was announced by the LIGO collaboration. Before I started doing GW, I was working on a project that was related to trying to improve <a href='https://en.wikipedia.org/wiki/Baryon_acoustic_oscillations'>Baryonic Acostic Oscillation</a> (BAO) reconstruction to beyond first order method. Failing to make any significant progress, thinking I am too dumb for any research and considering dropping out of physics. A new faculty member <a href='https://www.google.com/search?client=firefox-b-1-e&q=tjonnie+li'>Tjonnie G.F. Li</a>. joined the department and started a research group on GWs. Decided to give myself another chance, I started working on GWs as my final year project.</p>
					<p>
					Instead of driven by fascination of the discovery, I enjoyed problem solving and programming more. As opposed to more "astro" type of research problem, problems in GWs are usually very well and clearly defined. I love how I can check whether a problem is solved quickly and move on to the next one
					</p> */}
					<p>
					GWs problems are very well defined yet challenging. For example, the parameter estimation (PE) problem is quite simply defined: given a time series and a model, establish the parameters of the source. In principle, one can just throw a big enough machine and MCMC at it and get the answer. However, the challenge is to do it in a reasonable time and with a reasonable accuracy. GW PE has all sort of technical challenges to it, multimodality, (somewhat) high dimensionality, local correlation, etc. This makes the problem straightforward and difficult at the same time, and it makes GW a great test bench for many statistical and computational methods. 
					</p>
				</div>
				<div className='text-start'>
					<h3 className='text-3xl'>What do I work on?</h3>
					<Divider className='my-4'/>
					<p>
						I am mostly interested in the tool development and the data analysis side of GWs. Here is a list of research problems I am working on:
					</p>
					<h4 className='text-xl py-1'>Accelerated parameter estimation</h4>
					<p>
						One of the most important task in GW data analysis is parameter estimation: given a time series of the strain and a model of the signal, guess what are the parameters corresponds to the observed event. This is often done by some sort of sampling such as nested sampling or MCMC, which can be quite expensive, ranging from hundreds to thounsands of CPU hours per event.
					</p>
					<p>
						There has been different attempts to speed up parameter estimation, either through more modern engineering but sticking with traditional sampling method, or completely new deep learning-based method such as simulation-based inference.
					</p>

					<h4 className='text-xl py-1'>Modern wave waveform model</h4>
					<p>

					</p>
					<h4 className='text-xl py-1'>Numerical relativitiy</h4>
					<p>
						Having incredibly accurate numerical relativity (NR) simulations and waveform catalog is one of the reason why the community can build surrogate waveform models such IMRPhenom, SEOB, and the surrogate, which in turns give our detector more sensitivity through match filtering. In the coming decade (2030-2040), next generation detectors are going to be built. They are sensitive enough which the accuracy of NR simulation could be a limiting factor. One of the question is how can we improve the existing model, in turns requiuring us to simulate NR signal in a more precise fashion. 
						There are multiple famous group such as caltech and cornnell working on this, I am by no mean an expert in simulation, as my education background is not based on works related to simulations. Yet, I am very curious about what modern computing paradigm and deep learning can do for numerical relativitiy. For me, it is not so important that I make the best NR simulations or gain some new insights to a particular system, there are more qualified people than me to do that. I am more interested in designing algorithms and making code that might contribute to building the next generation NR simulations. For example, when the mass ratio of the system is going to more and more extreme, there are multiple time and length scales one has to resolve. This is usually done either by domain decomposition or adaptive mesh refinement. <span className="font-bold">Whenever there is such hierarchy of scales, there is some interpolation involved in between different scales. Can machine learning learning helps?</span> Another example is eccentric system. Ideally we would want to simulate the entire signal with the prescription from NR, but then we are spending a lot of time in parts which the two objects are far apart and interacting weakly. <span className="font-bold">Can we learn to approximate that part on-the-fly.</span>
					</p>
				</div>
				<div className='text-start'>
					<h3 className='text-3xl'>Materials</h3>
					<Divider className='my-4'/>

				</div>
			</div>
		</div>
	);
}