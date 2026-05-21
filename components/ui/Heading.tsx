const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className='my-4 text-3xl font-black tracking-tight text-slate-950 sm:my-6 sm:text-4xl'>
            {children}
        </h1>
    )
}

export default Heading