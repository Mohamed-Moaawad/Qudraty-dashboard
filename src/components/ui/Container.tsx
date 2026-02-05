
type ContainerType = {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerType) => {
    return (
        <div className="py-5 px-10">
            {children}
        </div>
    )
}

export default Container;