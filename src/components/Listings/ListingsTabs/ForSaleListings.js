import React, { Component } from 'react';
import DataTable from "../ListingsTable/ListingsTable";
// import Styles from "../ListingsTable/ListingsTableStyles";

class ForSaleListings extends Component {

  render(){
    return (
      <div><DataTable listingType="forSale"/></div>
      )
  }
}

export default ForSaleListings;