import Pagination from 'react-bootstrap/Pagination';
import '../assets/scss/CustomPagination.scss'

export default function CustomPagination({ page, total, onPageChange }) {
    if (total === 0) return null;

    const getPages = () => {
        let items = [];

        // Якщо мало сторінок - показати всі
        if (total <= 5) {
            for (let i = 1; i <= total; i++) {
                items.push(
                    <Pagination.Item key={i} active={page === i} onClick={() => onPageChange(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
            return items;
        }

        // Початок: 1, 2, 3, ..., total
        if (page <= 2) {
            for (let i = 1; i <= 3; i++) {
                items.push(
                    <Pagination.Item key={i} active={page === i} onClick={() => onPageChange(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
            items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            items.push(
                <Pagination.Item key={total} active={page === total} onClick={() => onPageChange(total)}>
                    {total}
                </Pagination.Item>
            );
            return items;
        }

        // Третя сторінка: 1, 2, 3, 4, ..., total
        if (page === 3) {
            for (let i = 1; i <= 4; i++) {
                items.push(
                    <Pagination.Item key={i} active={page === i} onClick={() => onPageChange(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
            items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            items.push(
                <Pagination.Item key={total} active={page === total} onClick={() => onPageChange(total)}>
                    {total}
                </Pagination.Item>
            );
            return items;
        }

        // Середина: 1, ..., page-1, page, page+1, ..., total
        if (page > 3 && page < total - 2) {
            items.push(
                <Pagination.Item key={1} active={page === 1} onClick={() => onPageChange(1)}>
                    1
                </Pagination.Item>
            );
            items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            for (let i = page - 1; i <= page + 1; i++) {
                items.push(
                    <Pagination.Item key={i} active={page === i} onClick={() => onPageChange(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
            items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            items.push(
                <Pagination.Item key={total} active={page === total} onClick={() => onPageChange(total)}>
                    {total}
                </Pagination.Item>
            );
            return items;
        }

        // Кінець: 1, ..., total-3, total-2, total-1, total
        if (page >= total - 2) {
            items.push(
                <Pagination.Item key={1} active={page === 1} onClick={() => onPageChange(1)}>
                    1
                </Pagination.Item>
            );
            items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            for (let i = total - 3; i <= total; i++) {
                if (i > 1) {
                    items.push(
                        <Pagination.Item key={i} active={page === i} onClick={() => onPageChange(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
            }
            return items;
        }

        return items;
    };

    return (
        <Pagination className='justify-content-center my-4'>
            {page !== 1 && (
                <>
                    <Pagination.First onClick={() => onPageChange(1)} />
                    <Pagination.Prev onClick={() => onPageChange(page - 1)} />
                </>
            )}
            {getPages()}
            {page !== total && (
                <>
                    <Pagination.Next onClick={() => onPageChange(page + 1)} />
                    <Pagination.Last onClick={() => onPageChange(total)} />
                </>
            )}
        </Pagination>
    );
}