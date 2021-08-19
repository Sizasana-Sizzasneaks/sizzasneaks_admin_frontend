This folder "src\components\inventory" holds all visual components associated with displaying
product/inventory related information.

These components are built as react functional components with any state being managed through
the use of react hooks.

CSS Styling for each component is supplied via css module files that mirror the file names of
the corresponding javascript component file. 

Components
----------------------------------------------------------------------------------------------
InventoryItemLine.js

Used to display a single product/inventory item on the Inventory Page(src\components\pages\InventoryPage.js).

This component has the following properties:-
1.pushToProductPage - Is fired when a single InventoryItemLine is clicked, intended to push a user to the 
inventory items dedicated details page. 
2. productId - Displays the product id.
3. brand - Displays the product brand
4. productName - Used to display the name of the product.
5. visibility - Used to display the visibility state of the product (If it is currently visible to customer or not).
6. sellingPrice - Used to display the current selling price of the product. 

----------------------------------------------------------------------------------------------
InventoryItemLineHeader.js

This is a static component used to display the heading fields displayed in the body of the InventoryPage
(src\components\pages\InventoryPage.js). 

----------------------------------------------------------------------------------------------
ProductDetailsCard.js

This component is used to display the details of a single product on the InventoryItemPage 
(src\components\pages\InventoryItemPage.js)

This component has the following properties:-
 
1. productId - Displays the product id.
2. brand - Displays the product brand
3. productName - Used to display the name of the product.
4. showProduct - Used to display the visibility state of the product (If it is currently visible to customer or not).
5. sellingPrice - Used to display the current selling price of the product. 
6. supplierCost - Displays the supplier cost of a product.
7. supplierTax - Displays the supplier Tax of the product.
8. sellingTax - Displays the selling tax.
9. categories - Displays the product categories the product belongs to.

