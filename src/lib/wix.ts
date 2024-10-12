import { items } from '@wix/data';
import { createClient, OAuthStrategy } from '@wix/sdk';

const client = createClient({
	modules: { items },
	auth: OAuthStrategy({
		clientId: process.env.WIX_CLIENT_ID!,
	}),
});

export default client;
