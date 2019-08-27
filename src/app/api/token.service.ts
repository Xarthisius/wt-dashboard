// src/app/framework/http/token.service.ts

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenService {
  // JWT helper service for checking token expiration
  jwt: JwtHelperService = new JwtHelperService();

  // Cache the user that this token represents
  user: any = null;

  setToken(token: string): void {
    localStorage.setItem('girderToken', token);
  }
  getToken(): string {
    return localStorage.getItem('girderToken');
  }
  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();

    if (!token) {
      return false;
    }

    // Other functions
    const expirationDate = this.jwt.getTokenExpirationDate(token);
    const isExpired = this.jwt.isTokenExpired(token);

    console.log(`Token expires: ${expirationDate}. Is Expired? ${isExpired}`);

    // return a boolean reflecting
    // whether or not the token is expired
    return !isExpired;
  }
}