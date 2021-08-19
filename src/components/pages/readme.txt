This folder "src\components\pages" holds all visual components that make up full pages
within this web application. 

These components are built as react functional components with any state being managed through
the use of react hooks.

CSS Styling for each component is supplied via css module files that mirror the file names of
the corresponding javascript component file. 

Components (Pages)
---------------------------------------------------------------------------------------------
Dashboard.js

This component represents the dashboard page of the application, where users will be able
to vew summary data concerning the sales of product items. 


---------------------------------------------------------------------------------------------
InventoryCreatePage.js

This component represents the page that will be used to create a new product item. 
This page will contain multiple components with input fields used to retrieve data from the user.
This data will then be used to create a new product. 


---------------------------------------------------------------------------------------------
InventoryItemPage.js

This component represents the page that will be used to display a single product and its
corresponding details (Sales, reviews, product description). 

---------------------------------------------------------------------------------------------
InventoryPage.js

This page is used to display a list of all the products on the platform. Users will be able to
filter and search through the products within the system. allowing them to view product details at a glance.
Users will also be able to click on individual products, allowing them to visit that specific product's
details page.

----------------------------------------------------------------------------------------------
LogInPage.js

This component contains user input fields that are used to facilitate the signing in of an existing system user. 


----------------------------------------------------------------------------------------------
UpdateInventoryItemPage.js

This page contains input fields that will be used to update the details of a product.
