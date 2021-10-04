// import React from "react";
// import { Row, Col } from "react-bootstrap";
// //import Styles from "./EditProductDataCard.module.css";
// //import ProductImagesCarousel from "./ProductImagesCarousel.js";
// //import ProductImageItem from "./ProductImageItem.js";
// import OrderOptionsSection from "./OrderOptionsSection";
// import OrderOptionsLineHeader from "./OrderOptionsLineHeader.js";
// import OrderOptionLine from "./OrderOptionLine.js";
// import InputTextArea from "../general/InputTextArea.js";

// import { validateBasicString } from "../../services/InputValidation.js";

// function ProductDataCard(props) {
//   return (
//     <Row className={Styles.ProductDataCard}>
//       <p className={Styles.SectionBanner}>Product Images</p>
//       <hr style={{ marginTop: "10px", marginBottom: "20px" }} />
//       <ProductImagesCarousel>
//         {props.productImages &&
//           props.productImages.map((productImage, index) => {
//             return (
//               <ProductImageItem
//                 fileName={productImage.fileName}
//                 fileType={productImage.fileType}
//                 imgURL={productImage.imgURL}
//                 deleteProductImage={props.deleteProductImage}
//                 empty={false}
//               />
//             );
//           })}
//       </ProductImagesCarousel>
//       <Row>
//         <Col>
//           <ProductOptionsSection>
//             <ProductOptionsLineHeader />
//             {props.productOptions &&
//               props.productOptions.map((productOption) => {
//                 return productOption.variants.map((variant, index) => {
//                   return (
//                     <ProductOptionLine
//                       color={productOption.color}
//                       size={variant.size}
//                       quantity={variant.quantity}
//                     />
//                   );
//                 });
//               })}
//           </ProductOptionsSection>
//         </Col>
//       </Row>
//       <Row>
//         <p className={Styles.SectionBanner}>Product Description</p>
//         <hr style={{ marginTop: "15px", marginBottom: "20px" }} />

//         <Col>
//           <p>{props.productDescription}</p>
//         </Col>
//       </Row>
//     </Row>
//   );
// }

// export default ProductDataCard;
