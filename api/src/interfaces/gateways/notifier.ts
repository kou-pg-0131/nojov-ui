export interface INotifier {
  success(text: string): Promise<void>;
  error(text: string): Promise<void>;
}
