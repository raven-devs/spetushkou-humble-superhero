function mutationWithBody(method: string): boolean {
  return method === 'POST' || method === 'PATCH' || method === 'PUT';
}

export const HttpMethodSatisfy = {
  mutationWithBody,
};
