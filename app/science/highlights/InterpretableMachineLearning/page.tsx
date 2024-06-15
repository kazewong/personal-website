import { Divider } from '@nextui-org/divider';

export default async function InterpretableMachineLearning() {

	return (
		<div className="h-screen lg:flex flex-col py-8">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>Robustness and interpretability in deep learning</h1>
			</div>
			<div className=''>
                <div className='text-start'>
					<h3 className='text-2xl'>Why am I interested?</h3>
					<Divider className='my-4'/>
						<p>
							I come from a physics background, and it happens that the objects I studies are quite far away from Earth. Astrophysical measurements cannot be easily validated in a lab on Earth, it often relies on many people coming together to work on one specific telescope or instrument. When that is the case, we better make sure we are exactly sure about what our model and code are doing. If my model is not robust, i.e. susceptible to adversarial conditions, it is unclear to me how we are going to be comfortable deploying the model into a downstream task. For example, let say I have a complex emulators of a suite of simulations and I want to use it to infer some properties about the universe. Somehow I managed to get a very tight constraints on all the quantities I care, I submit it to a prestigious journal and got a big prize. Some years later, it was found out that the constraints I got corresponds to universes with a non-constant speed-of-light and Earth being flat, this won't make a great news headline. 
						</p>
						<p>
							While non-robustness can lead to serious issues such as exploding rockets and mistreatments, I have a bigger issue with uninterpretability. By definition, we cannot understand how the universe works if our model of the universe is uninterpretable. This goes directly against the main purpose of science, and that's why I think DL is more similar to alchemy instead of chemistry. Nothing wrong about trying different things and see what sticks, but claiming victory after the test loss is beating all other benchmarks annoy me to no end. 
						</p>
						<p>
							Beyond practical purposes, I think making our model robust and interpretable actually go hand-in-hand with understanding deep neural networks. There are neural networks that work better than others for specific problems, and we have some ideas on why that is the case. But there are relatively few literature going into understanding neural networks in a practical setting. There are seminal works on understanding neural networks in a theoretical setting, but ultimately I care about applying neural networks to real-world problems, so having guides and principles behind choosing the architecture and hyper-parameters is very important to me.
						</p>
				</div>
				<div className='text-start'>
					<h3 className='text-2xl'>What do I work on?</h3>
					<Divider className='my-4'/>
					<h4 className='text-xl py-1'>Tuning guide for practical architectures</h4>
					<p>
						Given a neural network, how do you know it will work for a particular task? And when it doesn't do what you want, should you just change architecture? Or maybe just change some hyper-parameters and hope for the best?
					</p>
					<h4 className='text-xl py-1'>Smoothness of neural networks</h4>
					<p>
						
					</p>
					<h4 className='text-xl py-1'></h4>
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