import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductImageItem.module.css";
import { LinearProgress } from "@material-ui/core";

import { validateFileName } from "../../services/InputValidation";
import firebase from "../../config/firebaseConfig.js";

import InputField from "../general/InputField.js";
import Button from "../general/Button.js";

function EditProductImageItem(props) {
  var [empty, setEmpty] = React.useState(props.empty);
  var [uploading, setUploading] = React.useState(false);
  var [uploadProgress, setUploadProgress] = React.useState(0);
  var [uploadError, setUploadError] = React.useState(null);
  var [deleteError, setDeleteError] = React.useState(null);
  var [fileName, setFileName] = React.useState(props.fileName || null);
  var [fileType, setFileType] = React.useState(props.fileType || null);
  var [fileNameError, setFileNameError] = React.useState(null);
  var [file, setFile] = React.useState(null);
  var [fileError, setFileError] = React.useState(null);

  async function checkInputFields() {
    var validateFileNameResult = await validateFileName(fileName);
    await setFileNameError(validateFileNameResult);

    var validateFileResult = await checkFileType(file);
    await setFileError(validateFileResult);

    return true;
  }

  async function checkFormValidity() {
    var checkInputFieldsResult = await checkInputFields();
    var output = false;
    if (fileNameError && fileError) {
      if (fileNameError.ok === true && fileError.ok === true) {
        output = true;
      }
    }

    return output;
  }

  async function checkFileType(fileObject) {
    try {
      if (typeof fileObject !== "undefined" && fileObject !== null) {
        if (
          fileObject.type === "image/jpeg" ||
          fileObject.type === "image/jpg" ||
          fileObject.type === "image/png"
        ) {
          setFileType("." + fileObject.type.substr(6));
          return { ok: true, message: "Valid File Type" };
        } else {
          return { ok: false, message: "Invalid File Type" };
        }
      } else {
        return { ok: false, message: "File Required" };
      }
    } catch {
      return { ok: false, message: "Invalid File Type" };
    }
  }

  return (
    <div className={Styles.EntireProductImageItem}>
      <Row>
        {empty ? (
          <>
            {uploading && (
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                style={{ margin: "8px 0px" }}
              />
            )}
          </>
        ) : (
          <Col className={Styles.ImageBox}>
            <img
              src={props.imgURL || URL.createObjectURL(props.file)}
              alt={fileName}
            />
          </Col>
        )}
      </Row>
      <Row
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
        }}
      >
        <Col
          style={{
            display: "flex",
            margin: "3px 3px",
            padding: "0px 3px",
          }}
        >
          {empty ? (
            <div style={{ padding: "5px" }}>
              <InputField
                label="File Name"
                value={fileName}
                entireComponentStyle={{ marginBottom: "25px" }}
                onChange={async (value) => {
                  setFileName(value);
                  var validateFileNameResult = await validateFileName(value);
                  setFileNameError(validateFileNameResult);
                }}
                error={fileNameError}
              />
              <input
                type="file"
                multiple={false}
                accept=".jpg,.jpeg,.png"
                onChange={async (event) => {
                  console.log(event.target.files[0]);

                  setFile(event.target.files[0]);
                  setFileType(event.target.files[0].type);
                  var checkFileTypeResult = await checkFileType(
                    event.target.files[0]
                  );
                  if (!checkFileTypeResult.ok) {
                    setFileError(checkFileTypeResult);
                  } else {
                    setFileError(checkFileTypeResult);
                  }
                }}
              />
              {fileError && !fileError.ok ? (
                <p className={Styles.UploadErrorText}>{fileError.message}</p>
              ) : (
                ""
              )}

              {uploadError && !uploadError.ok ? (
                <p className={Styles.UploadErrorText}>{uploadError.message}</p>
              ) : (
                ""
              )}

              <Button
                label="ADD"
                styles={{
                  padding: "5px 10px",
                  backgroundColor: "#FADA35",
                  marginTop: "10px",
                  float: "right",
                }}
                onClick={async () => {
                  var formValidityCheck = await checkFormValidity();

                  if (formValidityCheck) {
                    //Add Image to New Images
                    // uploadImage();

                    if (typeof props.addNewProductImage !== "undefined") {
                      props.addNewProductImage({
                        fileName,
                        fileType,
                        file,
                      });
                    }
                  } else {
                    console.log("No Upload");
                  }
                }}
              />
            </div>
          ) : (
            <>
              <p className={Styles.ImageName}>{fileName + fileType}</p>{" "}
              <div
                className={Styles.ImageDeleteButton}
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  if (typeof props.deleteProductImage !== "undefined") {
                    props.deleteProductImage({
                      fileName,
                      fileType,
                    });
                  }

                  console.log("Image Delete");
                }}
              >
                <span
                  style={{ float: "right", fontSize: "23px" }}
                  class="material-icons"
                >
                  delete
                </span>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EditProductImageItem;
