import apiEndpoints from '../../../../utils/apiEndpoints';
import { expect } from '@playwright/test';
import { fixture } from '../../../../hooks/hooks';

export default class CreateUser {
  private responseDataJson: any;
  private responseDataCode: number;

  constructor() {
    this.responseDataJson = null;
    this.responseDataCode = null;
  }

  async sendRequest(body: string): Promise<any> {
    try {
      const requestCreateUser = fixture.api;
      const response = await requestCreateUser.post(apiEndpoints.users.create, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: body,
      });
      this.responseDataJson = await response.json();
      this.responseDataCode = response.status();
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  }

  verifyResponseCode(code: number) {
    expect(this.responseDataCode).toBe(code);
  }

  verifyResponseName(name: string) {
    expect(this.responseDataJson.name).toContain(name);
  }
}
