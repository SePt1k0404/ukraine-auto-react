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

export const loadTheme = <T>(key: string): T | undefined => {
  try {
    const jsonTheme = localStorage.getItem(key);
    if (!jsonTheme) {
      return undefined;
    }
    return JSON.parse(jsonTheme);
  } catch (error) {
    if (error instanceof Error) {
      return undefined;
    }
    return undefined;
  }
};

export const saveTheme = <T>(theme: T, key: string) => {
  const stringTheme = JSON.stringify({ theme: !theme });
  localStorage.setItem(key, stringTheme);
};
