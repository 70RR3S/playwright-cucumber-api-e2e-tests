export interface IUser {
  name: string;
  job: string;
}

export class User {
  private user: IUser;
  constructor() {
    this.user = {
      name: '',
      job: '',
    };
  }

  getName(): string {
    return this.user.name;
  }

  setName(name: string): void {
    this.user.name = name;
  }

  getJob(): string {
    return this.user.job;
  }

  setJob(job: string): void {
    this.user.job = job;
  }

  toJSON(): string {
    return JSON.stringify(this.user);
  }
}
