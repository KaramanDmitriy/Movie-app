import { useEffect, useState } from "react";
import { useParams } from "react-router";
export default function DetailPage() {
    const params = useParams();
    const [item, setItem] = useState(null);
    console.log(params);

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/${params.type}/${params.id}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN_TMDB
            }
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                setItem(data);

            } else {
                throw new Error(`Error fetching data. Status: ${response.status}`);
            }
        }
        catch (error) {
            toast.error('Some error occured. ')
        }
    }
    useEffect(() => {
        fetchData()
    }, [params])


    if (!item) return null
    return (
        <h1>{item.title}</h1>
    )
}