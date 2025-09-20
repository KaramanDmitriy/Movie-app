import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function DetailPage() {
    const params = useParams();

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
                return data;
            } else {
                throw new Error(response.status);
            }
        }
        catch (err) {
            toast.error('Some error occured. ')
        }
    }
    const { data } = useQuery({
        queryKey: ['detail'],
        queryFn: fetchData
    })

    if (!data) return null

    return (
        <h1>{data.name || data.title}</h1>
    )
}