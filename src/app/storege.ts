export const loadJwt = <T>(key: string): T | undefined => {
  try {
    const jsonJwt = localStorage.getItem(key);
    if (!jsonJwt) {
      return undefined;
    }
    return JSON.parse(jsonJwt);
  } catch (error) {
    if (error instanceof Error) {
      return undefined;
    }
    return undefined;
  }
};

export const saveJwt = <T>(jwt: T, key: string) => {
  const stringJwt = JSON.stringify(jwt);
  localStorage.setItem(key, stringJwt);
};
