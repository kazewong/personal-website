import { Divider } from '@nextui-org/divider';

export default function HighJump() {
	return (
		<div className="lg:flex flex-col py-8 justify-center">
			<div className='text-center py-4'>
				<h1 className='text-5xl'>I jump</h1>
			</div>
			<div className=''>
				<div className='text-start'>
					<h3 className='text-2xl'>Story so far</h3>
					<Divider className='my-4'/>
					<p>
					I was originally forced to do high jump. I used to play a lot of volleyball during secondary school, so I had some hop. The track and field coach also manage the volleyball team, and when he figured I am probably his best jumper in the school, he forced me to do high jump or he is going to dismiss the volleyball team. 
					</p>
					<p>
					Over the year, I started enjoying jumping more and more, partly because of winning within the school, but I was never good enough to win nationally. I went on to study physics in my undergraduate, which I kept jumping. I did reasonably well, got a personal best at 185 cm in my freshman year. But after that, I never improved, which I was quite fustrated. Also I started to run into injuries. So when I got more and more involved in my research, I decided to bid a bitter farewell to high jump, said to myself my time was up.
					</p>
					<p>
					Although I stayed active during graduate school, I never touched the high jump pit once in that 4 years. In my third year, I started wanting to jump again. That desire kept coming back to me, and every time more intense. Once I graduated and moved on to my postdoc in 2021, I decided to get back to it, just hoping to reach 190 cm. Did that in 2022 June, which felt like I redeem myself in a way. And since then I am improving at a rate that will put the younger me to shame. Take that, 18 years old Kaze - From 28 years old Kaze.
					</p>
					<p>
					I want to go to the Olympics. Trust me, no one understand how crazy and unhinge this sounds more than I do. I doubt myself everytime I think about it. I am older now, I am not as talented, I don't have the best support either. Chances are differentiably small, but I want to push my limit with a goal in mind. If I can get to 230 cm, I should have a pretty good shot.
					</p>
					<p>
					My story was 
					</p>

					<h3 className='text-2xl'>Progression</h3>


					
					<Divider className='my-4'/>
					<div className='flex justify-center'>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/W2OABKUAQgg?si=MQR_-A1JPnXhru9E" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
					</div>

					<h3 className='text-2xl'>Data</h3>
					<Divider className='my-4'/>

					You might have already figured I also happen to be a scientist to some extent, and I value open source developement and open data. Since I am not as athletically talent as many of the greatest jumpers out there, I have to make up with whatever I have. To that, I try to build a pipeline to quantativaly improve my jumping, by using simulations, computer visions and machine learning. The codes and data will all be open, coming soon and stay tuned!
				</div>
			</div>
		</div>
	);
}