import { useLoaderData } from 'react-router-dom'
import { useParams } from 'react-router-dom'
export default function Github() {
    const data = useLoaderData()

    return (
        <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
            <img src={data.avatar_url} alt="Git picture" width={300} />
        </div>)

}

export const gegithubtdata = async ({ params }) => {
    const gitname = params.gitname || "Strange144"

    const response = await fetch(
        `https://api.github.com/users/${gitname}`
    )

    return response.json()
}