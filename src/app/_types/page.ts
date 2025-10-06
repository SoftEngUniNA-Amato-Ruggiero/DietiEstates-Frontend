export interface Page<T> {
    content: T[];
    pageable: {
        pageSize: number;
        pageNumber: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
}
