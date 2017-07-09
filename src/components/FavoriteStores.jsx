import React from 'react';
import StoreList from './Stores/StoreList';

const FavoriteStores = ({ stores }) => (
  <div className="panel panel-default height-100 scrollable">
    <div className="panel-heading">
      <h3 className="panel-title">
        My Favorite stores
      </h3>
    </div>
    <div className="panel-body">
      <StoreList stores={stores} />
    </div>
  </div>
);

export default FavoriteStores;
