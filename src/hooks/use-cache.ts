import useStore from "../models/stores";


interface UseCacheProps<T> {
    storeKey: keyof ReturnType<typeof useStore.getState>;
    getData: () => Promise<void>;
}

const useCache = <T>({
    storeKey,
    getData
}: UseCacheProps<T>) => {
    const cachedData = useStore((state) => state[storeKey]) as T;

    if (!cachedData) getData();

    return { data: cachedData};
}

export default useCache;