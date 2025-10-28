import { PublicClientApplication } from '@azure/msal-browser';
import msalConfig from './msal-config';

export const msalInstance = new PublicClientApplication(msalConfig);

export const initializeMsal = () => msalInstance.initialize();