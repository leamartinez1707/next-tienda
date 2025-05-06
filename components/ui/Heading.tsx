const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className='text-4xl font-semibold my-10'>
            {children}
        </h1>
    )
}

export default Heading