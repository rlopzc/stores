import React from 'react';
import Store from './Store';
import _ from 'lodash';

const StoreList = ({ stores = [] }) => {
  if (_.isEmpty(stores)) {
    return <p>No favorite stores</p>;
  }

  return (
    <ul>
      {stores.map((store, index) => <Store key={index} {...store} />)}
    </ul>
  );
};

export default StoreList;
