import { useParams } from 'react-router-dom'

const SupportTeamDetails = () => {
    const { id } = useParams();

    return (
        <section className='support-team-details'>
            {/* <Header  /> */}
            {id}
        </section>
    )
}

export default SupportTeamDetails;