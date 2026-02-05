import { Skeleton } from "@mantine/core"

const SkeletonCards = () => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3">
                <Skeleton height={200} width="100%" radius="md" />
            </div>

            <div className="flex gap-3 w-4/12">
                <Skeleton height={30} width={'20%'} radius="sm" />
                <Skeleton height={30} width={'20%'} radius="sm" />
                <Skeleton height={30} width={'20%'} radius="sm" />
                <Skeleton height={30} width={'20%'} radius="sm" />
            </div>
        </div>
    )
}

export default SkeletonCards