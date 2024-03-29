import React from 'react';

import { Link } from 'src/components/Link';

import type { Certificate } from '@linode/api-v4';

export const initialValues = {
  ca: {
    certificate: '',
    label: '',
    type: 'ca',
  },
  downstream: {
    certificate: '',
    key: '',
    label: '',
    type: 'downstream',
  },
} as const;

export const CERTIFICATES_COPY = {
  Create: {
    ca:
      'For HTTPS, used by the load balancer to accept responses from your endpoints in your Service Target. This is the certificate installed on your endpoints.',
    downstream:
      'TLS certificates terminate incoming traffic to the load balancer. Once the load balancing policy is applied, traffic is forwarded to your service targets over TLS connections. ',
  },
  Description:
    'For HTTPS Cloud Load Balancers, a TLS termination certificate is required. To redirect web connections over port 443/HTTPS, upload your generated certificates for your domains.',
  Edit: {
    // TODO: ACLB - figure out what this should be
    ca: 'You can edit this cert here.',
    downstream:
      'TLS certificates terminate incoming traffic to the load balancer. Once the load balancing policy is applied, traffic is forwarded to your service targets over TLS connections.',
  },
  Tabs: {
    ca: (
      <>
        Used by the load balancer to accept responses from your service target
        endpoints. Apply these certificate(s) in the{' '}
        <Link to="../service-targets">Service Targets</Link> tab.
      </>
    ),
    downstream: (
      <>
        Used by the load balancer to terminate the connection and decrypt
        requests from clients. Apply these certificate(s) in the{' '}
        <Link to="../configurations">Configurations</Link> tab.
      </>
    ),
  },
  Tooltips: {
    Certificate:
      'Paste the PEM-formatted contents of your SSL certificate. If you have linked multiple segments of a chained certificate, be sure to copy all of its contents into the text field, appearing one after another. The certificate must be signed using the RSA algorithm, which is the default in most cases.',
    Key:
      'Paste the PEM-formatted contents of your private key. Your private key must not have a passphrase.',
  },
};

export const titleMap: Record<Certificate['type'], string> = {
  ca: 'Upload Service Target Certificate',
  downstream: 'Upload TLS Certificate',
};

export const labelMap: Record<Certificate['type'], string> = {
  ca: 'Server Certificate',
  downstream: 'TLS Certificate',
};

export const exampleCert = `-----BEGIN CERTIFICATE-----
Paste .pem format
-----END CERTIFICATE-----
`;

export const exampleKey = `-----BEGIN PRIVATE KEY-----
Paste .pem format
-----END PRIVATE KEY-----
`;
