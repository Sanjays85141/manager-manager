import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProductInformationBanner } from 'src/components/ProductInformationBanner/ProductInformationBanner';
import { SuspenseLoader } from 'src/components/SuspenseLoader';
import { useFlags } from 'src/hooks/useFlags';

const LoadBalancerBasicCreate = React.lazy(() =>
  import('./LoadBalancerCreate/LoadBalancerBasicCreate').then((module) => ({
    default: module.LoadBalancerBasicCreate,
  }))
);

const LoadBalancerCreateFormWrapper = React.lazy(() =>
  import('./LoadBalancerCreate/LoadBalancerCreateFormWrapper').then(
    (module) => ({
      default: module.LoadBalancerCreateFormWrapper,
    })
  )
);

const LoadBalancerLanding = React.lazy(() =>
  import('./LoadBalancerLanding/LoadBalancerLanding').then((module) => ({
    default: module.LoadBalancerLanding,
  }))
);

const LoadBalancerDetail = React.lazy(() =>
  import('./LoadBalancerDetail/LoadBalancerDetail').then((module) => ({
    default: module.LoadBalancerDetail,
  }))
);

export const LoadBalancers = () => {
  const flags = useFlags();
  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      <ProductInformationBanner bannerLocation="LoadBalancers" />
      <Switch>
        {/**
         * TODO: ACLB - remove alternative create flow
         */}
        <Route
          component={
            flags.aclbFullCreateFlow
              ? LoadBalancerCreateFormWrapper
              : LoadBalancerBasicCreate
          }
          path="/loadbalancers/create"
        />
        <Route
          component={LoadBalancerDetail}
          path="/loadbalancers/:loadbalancerId"
        />
        <Route component={LoadBalancerLanding} path="/loadbalancers" />
      </Switch>
    </React.Suspense>
  );
};
