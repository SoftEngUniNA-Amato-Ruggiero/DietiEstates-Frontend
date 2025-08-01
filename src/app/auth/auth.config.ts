import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_tKWUxvA4t',
    redirectUrl: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: '5qdd485015k9doea0l14jcv5k0',
    scope: 'email openid phone profile', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    // silentRenew: true,
    // useRefreshToken: true,
    // renewTimeBeforeTokenExpiresInSeconds: 30,
  }
}
