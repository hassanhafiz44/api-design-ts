export default class AugError extends Error {
  public status: number;
  public type: string;
  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
    this.type = "server error";
  }
}
