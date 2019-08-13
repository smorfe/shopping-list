import React from 'react';

function ShopLists(props) {

   const shoppingList = props.items.map((item, i) => 
      <li key={'shop-' + i}>
         <div className="content-wrapper">
            <p className="date"><strong>Date Added: </strong>{item.dateAdded.toLocaleString()}</p>
            <p className="text">{item.text}</p>
         </div>
         <div className="button-wrapper">
            <button type="button" onClick={() => props.deleteBtn(i)}>Delete</button>
         </div>
      </li>
   )

   return(
      <ul>{shoppingList}</ul>
   )
}

export default ShopLists;
