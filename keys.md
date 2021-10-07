Authentication for the Termly API uses 2 keys - a public and private. The public key is sent with each request. The private key is used to generate [signatures](signature.md) that Termly uses to verify the request.

Each public key will have AT MOST one unexpired private key. If your key is compromised, you can immediately expire it and get a new key. If you are doing regularly scheduled key rolling, you can create a new private key for the public key. The old private key will be given an expiration 30 days from the date the new key is created. This expiration can be changed to be shorter or longer. Thirty days is just the default.

When you have multiple private keys, Termly attempts signature validation with them from newest to oldest.

# Example

In the beginning, you have a single key pair.

public_key | private_key | expiration
---------- | ----------- | ----------
public_1 | priv_1 | nil

With the prior data, Termly will try to validate requests first with `priv_1`.

It has been a few months, and you've decided to role the key. You go to the key dashboard and create a new private key for `public_1`. You use the 30 days default expiration.

public_key | private_key | expiration
---------- | ----------- | ----------
public_1 | priv_1 | 2021-07-15
public_1 | priv_2 | nil

With the prior data, Termly will try to validate requests first with `priv_2` and then `priv_1`.

A couple of days go by and you realize that you accidently commited your private key to your repository. You go to key management page and immediately expire the new key and add a new one.

public_key | private_key | expiration
---------- | ----------- | ----------
public_1 | priv_1 | 2021-07-15
public_1 | priv_2 | 2021-06-17
public_1 | priv_3 | nil

With the prior data, Termly will try to validate requests first with `priv_3` and then `priv_1`.

Termly tracks usages of keys and exposes that on your key management page. This way you'll know if there is still usage of an expiring key.

