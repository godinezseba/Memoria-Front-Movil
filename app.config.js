import { env } from 'process';

export default {
  extra: {
    'API_URL': env.API_URL || 'https://memoria-back-end.herokuapp.com/v2/graphql',
  }
}
