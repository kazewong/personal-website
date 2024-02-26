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
					<h4 className='text-xl'>Accelerated parameter estimation</h4>
					<h4 className='text-xl'>Modern wave waveform model</h4>
					<h4 className='text-xl'>Numerical relativitiy</h4>
				</div>
				<div className='text-start'>
					<h3 className='text-3xl'>Materials</h3>
					<Divider className='my-4'/>

				</div>
			</div>
		</div>
	);
}