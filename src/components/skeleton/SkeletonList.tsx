import { Skeleton } from "@mantine/core"

const SkeletonList = () => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full flex justify-between gap-5 p-4">
                <Skeleton height={30} width={'75%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
            </div>
            <div className="w-full flex justify-between gap-5 p-4">
                <Skeleton height={30} width={'75%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
            </div>
            <div className="w-full flex justify-between gap-5 p-4">
                <Skeleton height={30} width={'75%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
            </div>
            <div className="w-full flex justify-between gap-5 p-4">
                <Skeleton height={30} width={'75%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
                <Skeleton height={30} width={'5%'} radius={'sm'} />
            </div>
        </div>
    )
}

export default SkeletonList