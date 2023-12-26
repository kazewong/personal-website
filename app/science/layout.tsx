export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <section className=" flex justify-center">
        <div className='px-8 w-[480px] md:w-[640px] lg:w-[840px] '>
          {children}
        </div>
      </section>
      
  )
}
