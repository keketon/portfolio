const useSearchParams = () => {
  const searchParam = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  };

  const setSearchParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    window.location.replace(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return { searchParam, setSearchParams };
};

export default useSearchParams;
