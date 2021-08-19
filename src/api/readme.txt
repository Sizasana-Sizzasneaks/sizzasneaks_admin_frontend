This folder "src\api" holds all the logical code that this application uses to interact with
the back-end application within this SIZZASNEAKS e-commerce platform.

The interactions between this application and the backend application are done via http requests
and responses. With this application utilizing all the various routes made available to it.
Each Route has its own requirements, and focuses of a single aspect of functionality within this system. 

Related aspects of functionality are group together under a common file.
For example - Product manipulation functionality can be accessed through the api functions found under
the file "src\api\products.js". 

HTTP requests and responses are executed using the Axios package - "https://www.npmjs.com/package/axios" .
.

The following is a breakdown of all the this folders contents:-
----------------------------------------------------------------------------------------------------------
src\api\index.js

This file contains constant variable and data that may be needed during the creation of current and future api
functionality. An example of this, is the main URL leading this application to the backend application and the
specific routes associated with different aspects of functionality.

----------------------------------------------------------------------------------------------------------
src\api\products.js

This file contains functions that interact with specific backend routes that provide product manipulation 
functionality.

A) updateProduct

Inputs(Arguments)
1. productId (String) - This variable holds a unique identifier that identifies a single product/inventory item.
2. productData (object) - This object contains variables that match the structure of a product/inventory item within this system.
This is the data to replace in the document. Details on how to structure a productData object can be inferred from the database
object models displayed in this systems documentation.

Use(purpose)
This method performs the act of updating a specific product item, the item to be updated is identified by its product id,
then when and productData supplied is used to update that product's details.
Performing such an action requires a user to be of type administrator, as a result
credentialClaims and an authentication token must be supplied when making this request. 

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. response.data (object) - This is an object that contains the response data sent back by the front ed application.

B) getProducts

Inputs(Arguments)
2. queryObject (object) - This object contains variables used to query the products within the system. These variables are
"searchBy" and "value" which are both strings

Instructions on how to construct a query object based on the type of query are as follows:-

Search by Product_id - {searchBy: "PRODUCTID",value: "342344"}
Search by visibility(showProduct) - {searchBy: "VISIBILITY",value: true/false }
Search by productName - {searchBy: "SEARCH",value: "air jordan" }
Search for New Products - {searchBy: "NEW",value: "" }
Get All Products - {searchBy: "",value: "" }

Use(purpose)
This method performs the act or retrieving product/inventory items from the systems database.
This function receives a query object that is used to structure various types of queries. 
This functionality is made available to all type of system users but filters the amount of product data returned 
based on the credential type of the user making the request. 

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. response.data (object) - This is an object that contains the response data sent back by the front-end application.


C) getProduct

Inputs(Arguments)
2. id (String) - Identifies a unique product item with the database.

Use(purpose)
This method performs the act or retrieving  a single product/inventory item from the systems database.
This function receives a product id that is used to identify the product on the database.
This functionality is made available to all type of system users but filters the amount of product data returned 
based on the credential type of the user making the request. 

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. response.data (object) - This is an object that contains the response data sent back by the front-end application.

D) createProduct

Inputs(Arguments)
1. productData (object) - This object contains variables that match the structure of a product/inventory item within this system.
This is the data to be used to create a new product. Details on how to structure a productData object can be inferred from the database
object models displayed in this systems documentation.

Use(purpose)
This method performs the act of creating a new product item.
The productData supplied is used as the product's details.
Performing such an action requires a user to be of type administrator, as a result
credentialClaims and an authentication token must be supplied when making this request. 

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. response.data (object) - This is an object that contains the response data sent back by the front ed application.

----------------------------------------------------------------------------------------------------------
src\api\review.js

This file contains functions that interact with specific backend routes that provide product review
functionality.

A) getReviewsByProductId 

Inputs(Arguments)
2. id (String) - Identifies a unique product item with the database.

Use(purpose)
This method performs the act or retrieving all reviews associated with a single product/inventory item.
This function receives a product id that is used to select the matching product reviews.
This functionality is made available to all type of system users but filters the amount of product data returned 
based on the credential type of the user making the request. 

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. response.data (object) - This is an object that contains the response data sent back by the front-end application.

B) deleteReviewByReviewId

Inputs(Arguments)
2. id (String) - Identifies a unique product review with the database.

Use(purpose)
This method performs the act of deleting a specific review on the system database.
The review to delete is identified using its unique id that is supplied to this function.
This functionality is made available to system users with a credential type of administrator.
A user with a credential type of customer can delete a review, but only if that specific user wrote that review. 

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. response.data (object) - This is an object that contains the response data sent back by the front-end application.


----------------------------------------------------------------------------------------------------------
src\api\user.js

A) getUserDetails

This function has no arguments.

Use(Purpose)
This function is used to retrieve the current signed in users account details. 
This function requires no arguments, the identify of a user is retrieved from the users ID token
that is sent within the headers of the HTTP request object.

Output (Returns)

1. ok (boolean) - This notifies other functions it was a successful execution or a failed execution 
2. message (string) -  a string message returns an error message if the ok value is false else no error message sends data
3. data (object) - This is an object that contains the response data sent back by the front-end application.
