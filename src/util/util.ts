const appendPath = (path: string, sub: string): string => {
  if (path === '/') {
    return `/${sub}`;
  }
  return `${path}/${sub}`;
};

export { appendPath };
