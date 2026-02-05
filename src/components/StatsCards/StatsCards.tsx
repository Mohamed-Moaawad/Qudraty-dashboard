import StatsCard from "./StatsCard";

type TCard = {
    title: string;
    numbers: string | number;
    percentageNumber?: string;
};

type TStatsCardsProps = {
    card1: TCard;
    card2: TCard;
    card3: TCard;
    card4?: TCard;
};


const StatsCards = ({ card1, card2, card3, card4 }: TStatsCardsProps) => {
    if (card4) {
        return (
            <div className="flex flex-wrap">
                <div className="w-6/12 lg:w-3/12 mb-2">
                    <StatsCard
                        title={card1.title}
                        numbers={card1.numbers}
                    />
                </div>
                <div className="w-6/12 lg:w-3/12 mb-2">
                    <StatsCard
                        title={card2.title}
                        numbers={card2.numbers}
                    />
                </div>
                <div className="w-6/12 lg:w-3/12 mb-2">
                    <StatsCard
                        title={card3.title}
                        numbers={card3.numbers}
                    />
                </div>
                <div className="w-6/12 lg:w-3/12 mb-2">
                    <StatsCard
                        title={card4.title}
                        numbers={card4.numbers}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-6/12 lg:w-4/12 mb-2">
                <StatsCard
                    title={card1.title}
                    numbers={card1.numbers}
                />
            </div>
            <div className="w-6/12 lg:w-4/12 mb-2">
                <StatsCard
                    title={card2.title}
                    numbers={card2.numbers}
                />
            </div>
            <div className="w-12/12 lg:w-4/12 mb-2 flex justify-center lg:justify-start">
                <StatsCard
                    title={card3.title}
                    numbers={card3.numbers}
                />
            </div>
        </div>
    )


}

export default StatsCards