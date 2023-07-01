import { FigureCard } from './components/figureCard'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FigureCard title='Kaze Wong' description='Example' image='/../public/static/images/portrait.jpg'/>
    </main>
  )
}
