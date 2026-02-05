import './StatsCard.css'

type TStatsCardProps = {
  title: string;
  numbers: string | number;
  percentageNumber?: string;
}

const StatsCard = ({ title = 'العنوان', numbers = '2,318', percentageNumber }: TStatsCardProps) => {
  return (
    <div className='stats-card rounded-2xl'>
      <h5>{title}</h5>
      <div className="numbers flex justify-between items-end">
        <h3>{numbers}</h3>
        <span>{percentageNumber}</span>
      </div>
    </div>
  )
}

export default StatsCard