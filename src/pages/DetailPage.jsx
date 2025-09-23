import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import './../assets/scss/DetailPage.scss'

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
            toast.error('Some error occured.');
            return null;
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['detail', params.type, params.id],
        queryFn: fetchData
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error loading details.</div>;

    // Вивід для різних типів
    let content = null;
    if (params.type === "movie") {
        content = (
            <div>
                <div className="card-img">
                    {data.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} style={{ maxWidth: 300 }} />
                    )}
                </div>

                <h1>{data.title}</h1>
                <p><b>Release date:</b> {data.release_date}</p>
                <p><b>Overview:</b> {data.overview}</p>
                <p><b>Rating:</b> {data.vote_average} ({data.vote_count} votes)</p>

            </div>
        );
    } else if (params.type === "tv") {
        content = (
            <div>
                <div className="card-img">
                    {data.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name} style={{ maxWidth: 300 }} />
                    )}
                </div>

                <h1>{data.name}</h1>
                <p><b>First air date:</b> {data.first_air_date}</p>
                <p><b>Overview:</b> {data.overview}</p>
                <p><b>Rating:</b> {data.vote_average} ({data.vote_count} votes)</p>

            </div>
        );
    } else if (params.type === "person") {
        content = (
            <div>
                <div className="card-img">
                    {data.profile_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt={data.name} style={{ maxWidth: 300 }} />
                    )}
                </div>

                <h1>{data.name}</h1>
                <p><b>Known for:</b> {data.known_for_department}</p>
                <p><b>Birthday:</b> {data.birthday}</p>
                <p><b>Place of birth:</b> {data.place_of_birth}</p>
                <p><b>Biography:</b> {data.biography}</p>

            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            {content}
        </div>
    );
}