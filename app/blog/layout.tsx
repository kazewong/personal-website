export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={"flex flex-col items-center"}>
      <div className='px-8 w-[480px] lg:w-[840px] '>
          {children}
      </div>
    </section>
  )
}
