import { env } from 'process';

export default {
  extra: {
    'API_URL': process.env.API_URL || 'http://192.168.1.96:8081/v2/graphql',
  }
}
