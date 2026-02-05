import { Skeleton } from '@mantine/core'

const SkeletonPlanCards = () => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-6/12 md:w-4/12 p-3">
                <Skeleton height={250} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 p-3">
                <Skeleton height={250} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 p-3">
                <Skeleton height={250} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 p-3">
                <Skeleton height={250} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 p-3">
                <Skeleton height={250} width="100%" radius="md" />
            </div>
            <div className="w-full sm:w-6/12 md:w-4/12 p-3">
                <Skeleton height={250} width="100%" radius="md" />
            </div>
        </div>
    )
}

export default SkeletonPlanCards