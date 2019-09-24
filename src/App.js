import React, { Component } from 'react'
import './App.css'

// Composability: Level 3
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

// Composability: Level 3
class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

// Composability: Level 2
class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(

          // Props: Level 3
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        // Props: Level 3
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

// Composability: Level 2
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    // Reactivity: callbacks which flow down to this child user interface component
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          // Reactivity: callback which will bubble up user interaction event values
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            // Reactivity: callback which will bubble up user interaction event values
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
                    </p>
      </form>
    );
  }
}

// Composability: Level 1
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    // Reactivity: this is the event handler triggered via callbacks which flow down to child user interface components
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    // Reactivity: this is the event handler triggered via callbacks which flow down to child user interface components
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        {/* State: passed as props */}
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          // Reactivity: callbacks which flow down to child user interface components
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        {/* Props: Level 2 */}
        {/* State: passed as props */}
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

// Data Model, natural breakdown into components 
const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

class App extends Component {
  render() {
    return (
      // Props: Level 1
      <FilterableProductTable products={PRODUCTS} />
    );
  }
}

export default App;

