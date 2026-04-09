export type HttpQueryValue = string | number | boolean | null | undefined
export type HttpQueryParams = Record<string, HttpQueryValue>

export interface HttpRequestOptions extends RequestInit {
    query?: HttpQueryParams
}

export class HttpError extends Error {
    status: number
    statusText: string
    data?: unknown

    constructor(status: number, statusText: string, data?: unknown) {
        super(`HTTP ${status}: ${statusText}`)
        this.name = 'HttpError'
        this.status = status
        this.statusText = statusText
        this.data = data
    }
}

function getApiBaseUrl(): string {
    const envBase = import.meta.env.VITE_API_BASE_URL?.trim()

    if (!envBase) {
        return window.location.origin
    }

    return envBase.replace(/\/+$/, '')
}

function buildUrl(path: string, query?: HttpQueryParams): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const url = new URL(normalizedPath, getApiBaseUrl())

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') return
            url.searchParams.set(key, String(value))
        })
    }

    return url.toString()
}

async function parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type') ?? ''
    const isJson = contentType.includes('application/json')

    const data = isJson
        ? await response.json().catch(() => null)
        : await response.text().catch(() => null)

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText, data)
    }

    return data as T
}

export async function http<T>(
    path: string,
    options: HttpRequestOptions = {},
): Promise<T> {
    const { query, headers, ...rest } = options

    const response = await fetch(buildUrl(path, query), {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    })

    return parseResponse<T>(response)
}

export const httpClient = {
    get<T>(path: string, query?: HttpQueryParams) {
        return http<T>(path, {
            method: 'GET',
            query,
        })
    },

    post<T, B = unknown>(path: string, body?: B) {
        return http<T>(path, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        })
    },

    put<T, B = unknown>(path: string, body?: B) {
        return http<T>(path, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        })
    },

    patch<T, B = unknown>(path: string, body?: B) {
        return http<T>(path, {
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        })
    },

    delete<T>(path: string) {
        return http<T>(path, {
            method: 'DELETE',
        })
    },
}