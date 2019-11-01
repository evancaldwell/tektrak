import { prodConfig } from './prod.js';
import { devConfig } from './prod.js';

let config = {};
if (process.env.NODE_ENV === "production") {
  console.log('prodConfig: ', prodConfig);
  config = prodConfig;
} else {
  console.log('devConfig: ', devConfig);
  config = devConfig;;
}

export const firebaseConfig = config;