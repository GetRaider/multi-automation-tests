export interface IRetryDataHelper {
  create: (data: Record<string, unknown>, retryName: string) => void;
  getByName: <R>(retryName: string) => Record<string, R>;
  isExistByName: (retryName: string) => boolean;
}
