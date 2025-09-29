const baseApiURL = import.meta.env.VITE_API_URL || "";
const baseHRApiURL = import.meta.env.VITE_HR_URL || "";

export const HRApiURL = `${baseApiURL}/${baseHRApiURL}`

export interface Response<T = unknown> {
    data: T;
    status: number;
    ok: boolean;
}

const createApiFetch = (baseURL: string, token?: string) => {
    return {
        async get<T>(endpoint: string): Promise<Response<T>> {
            const res = await fetch(`${baseURL}${endpoint}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                data: (await res.json()) as T,
                status: res.status,
                ok: res.ok,
            };
        },

        async post<T>(endpoint: string, body: unknown): Promise<Response<T>> {
            const res = await fetch(`${baseURL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(body),
            });

            return {
                data: (await res.json()) as T,
                status: res.status,
                ok: res.ok,
            };
        },

        async put<T>(endpoint: string, body: unknown): Promise<Response<T>> {
            const res = await fetch(`${baseURL}${endpoint}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(body),
            });

            return {
                data: (await res.json()) as T,
                status: res.status,
                ok: res.ok,
            };
        },

        async delete<T>(endpoint: string): Promise<Response<T>> {
            const res = await fetch(`${baseURL}${endpoint}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            return {
                data: (await res.json()) as T,
                status: res.status,
                ok: res.ok,
            };
        },
    };
}

export const hrApiFetch = (token?: string) => createApiFetch(HRApiURL, token);
