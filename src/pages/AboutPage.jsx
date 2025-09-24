import { Card } from "react-bootstrap";

export default function AboutPage() {
    return (
        <Card className="mt-4 mx-auto" style={{ maxWidth: 700 }}>
            <Card.Body>
                <h1 className="mb-4">About Movie App</h1>
                <p>
                    <b>Movie App</b> — це навчальний проєкт для пошуку фільмів, серіалів та відомих персон з бази <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>.
                </p>
                <ul>
                    <li>Пошук фільмів, серіалів та акторів за назвою</li>
                    <li>Перегляд детальної інформації про кожен фільм, серіал чи персону</li>
                    <li>Додавання улюблених записів до списку Favorites</li>
                    <li>Зручна пагінація та сучасний інтерфейс</li>
                </ul>
                <p>
                    Проєкт створено з використанням React, React Bootstrap, React Query та API TMDB.
                </p>
                <hr />
                <p>
                    <b>Автор:</b> Дмитро Караман<br />
                    <b>Рік:</b> 2025
                </p>
            </Card.Body>
        </Card>
    );
}