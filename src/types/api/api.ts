export type ApiRoute<TRequest = void, TResponse = void> = {
  path: string;
  auth: boolean;
  method: string;
};