import React, { useContext, useState } from 'react'
import './App.css'



// creating an AppContext, and this context can be access in any Component
const AppContext = React.createContext();

// converting ProducTableProvider into a function component
//necesito del estado por ello hago uso del hook useState
// los metodos los paso como inliner functions

const ProducTableProvider = (props) => {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [products] = useState({ PRODUCTS })


  return (

    <AppContext.Provider value={{
      filterText: filterText,
      inStockOnly: inStockOnly,
      products: products,

      handleFilterTextChange: (filterText) => {
        setFilterText(filterText)
      },

      handleInStockChange: (inStockOnly) => {

        setInStockOnly(inStockOnly)
      }

    }}
    >

      <div>
        {props.children}
      </div>

    </AppContext.Provider>


  );







}
// Eniminated FilterableProductTable and converted into a ProductTableProvider


// class ProducTableProvider extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       filterText: '',
//       inStockOnly: false,
//       products: { PRODUCTS },


//       //methods on state and converted with an arrow function to autobind it


//       handleFilterTextChange: (filterText) => {
//         this.setState({ filterText: filterText })


//       },

//       handleInStockChange: (inStockOnly) => {
//         this.setState({ inStockOnly: inStockOnly })
//       }


//     }




//   } //end constructor


//   render() {
//     return (
//       //sigue siendo un compoentne presentacional pero 
//       // retorno el AppContext que cree arriba y hago un grap de los elementos con el this.props.children
//       // asi puedo hacer wrap del state
//       <AppContext.Provider value={this.state}>
//         {this.props.children}
//       </AppContext.Provider>


//     );

//   }



// }

//cuando retorno solamente jsx no necesito poner las {} solamente parentesis
const ProductCategoryRow = (props) => (
  <tr>
    <th colSpan="2">
      {props.category}
    </th>
  </tr>
);

// class ProductCategoryRow extends React.Component {
//   render() {
//     const category = this.props.category;
//     return 
//   }
// }

// como tengo mas logica de asignacion de varibales uso las llaves
const ProductRow = (props) => {
  const product = props.product;
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
// Composability: Level 3
// class ProductRow extends React.Component {
//   render() {
//     const product = this.props.product;
//     const name = product.stocked ?
//       product.name :
//       <span style={{ color: 'red' }}>
//         {product.name}
//       </span>;

//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{product.price}</td>
//       </tr>
//     );
//   }
// }

// Composability: Level 2

const ProductTable = () => {

  //como necesito crear varibales antes del JSX uso la funcion useContext
  const context = useContext(AppContext)
  const filterText = context.filterText;
  const inStockOnly = context.inStockOnly;

  // const filterText = this.props.filterText;
  // const inStockOnly = this.props.inStockOnly;

  const rows = [];
  let lastCategory = null;

  context.products.PRODUCTS.forEach((product) => {
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

const SearchBar = (props) => {

  // ya no necesito siquiera colocar el AppContext.consumer>
  // agarro el context desde el useContext

  const context = useContext(AppContext);
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={context.filterText}
        // Reactivity: callback which will bubble up user interaction event values
        onChange={e => context.handleFilterTextChange(e.target.value)}
      />
      <p>
        <input
          type="checkbox"
          checked={context.inStockOnly}
          // Reactivity: callback which will bubble up user interaction event values
          onChange={e => context.handleInStockChange(e.target.checked)}
        />
        {' '}
        Only show products in stock
                    </p>
    </form>
  )

}



// Composability: Level 2
// class SearchBar extends React.Component {
//   // ya no debo crear state de la clase ni constructor ni instancia props ni pasar los callbacks a los
//   // metodos sino que puedo llamarlos con inline functions en el context

//   render() {
//     return (

//       //consumo el estado que me da el provider 


//       <AppContext.Consumer>

//         {/* ya no debo usar el this.props sino que directamente acceso el context que ya trae esos elementpos del state */}

//         {context =>

//           <form>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={context.filterText}
//               // Reactivity: callback which will bubble up user interaction event values
//               onChange={e => context.handleFilterTextChange(e.target.value)}
//             />
//             <p>
//               <input
//                 type="checkbox"
//                 checked={context.inStockOnly}
//                 // Reactivity: callback which will bubble up user interaction event values
//                 onChange={e => context.handleInStockChange(e.target.checked)}
//               />
//               {' '}
//               Only show products in stock
//                   </p>
//           </form>
//         }


//       </AppContext.Consumer>




//     );
//   }
// }


// Data Model, natural breakdown into components 
const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];



// convirtiendo App en un functional component


const App = () => (

  <ProducTableProvider>

    <SearchBar />
    <ProductTable />

  </ProducTableProvider>
)
// class App extends Component {
//   render() {
//     return (
//       // Provider creado que ahora hace wraps de los otros dos componentes directamente
//       //asi no tengo que pasar el estado como props pues ya paso el estado en el provider 
//       //haciendo el wrap

//       <ProducTableProvider>

//         <SearchBar />
//         <ProductTable />

//       </ProducTableProvider>
//     );
//   }
// }

export default App;

