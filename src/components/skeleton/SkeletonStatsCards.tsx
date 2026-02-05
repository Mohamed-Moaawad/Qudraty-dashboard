import { Skeleton } from "@mantine/core";

const SkeletonStatsCards = () => {
    return (
        <div className="flex flex-wrap">
            <div className="w-6/12 lg:w-3/12 mb-2  py-3 pl-10">
                <Skeleton height={150} width="100%" radius="md" />
            </div>
            <div className="w-6/12 lg:w-3/12 mb-2  py-3 pl-10">
                <Skeleton height={150} width="100%" radius="md" />
            </div>
            <div className="w-6/12 lg:w-3/12 mb-2  py-3 pl-10">
                <Skeleton height={150} width="100%" radius="md" />
            </div>
            <div className="w-6/12 lg:w-3/12 mb-2  py-3 pl-10">
                <Skeleton height={150} width="100%" radius="md" />
            </div>
        </div>
    );
};

export default SkeletonStatsCards;