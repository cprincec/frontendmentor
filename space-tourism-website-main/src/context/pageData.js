import { createContext, useCallback, useReducer, useState } from "react";

/*********** PAGE DATA CONTEXT FOR THE APP ******/

const DataContext = createContext({
    data: {},
});

export default DataContext;

// function OrdersList() {
//     return (
//         <ul className={classes.list}>
//             {orders.map((order) => (
//                 <li key={order.id}>
//                     <Link to="/orders">
//                         <OrderItem order={order} />
//                     </Link>
//                 </li>
//             ))}
//         </ul>
//     );
// }
