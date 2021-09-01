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
  var [imageUrl, setImageUrl] = React.useState(props.imgURL || null);
  var [uploadError, setUploadError] = React.useState(null);
  var [deleteError, setDeleteError] = React.useState(null);
  var [fileName, setFileName] = React.useState(props.fileName || null);
  var [fileType, setFileType] = React.useState(props.fileType || null);
  var [fileNameError, setFileNameError] = React.useState(null);
  var [file, setFile] = React.useState(null);
  var [fileError, setFileError] = React.useState(null);

  function uploadImage() {
    try {
      //Upload Image
      //Root Ref
      var storageRef = firebase.storage().ref();

      //Create
      var metadata = {
        name: fileName,
        contentType: fileType,
      };

      //change to correct dynamic type/
      var imagesRef = storageRef.child("images/" + fileName + fileType);
      setUploading(true);

      var imageUpload = imagesRef.put(file, metadata);

      //Handle Image Upload
      imageUpload.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              setUploadError({ ok: false, message: "Upload Paused" });
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              setUploadError({ ok: true, message: "Upload Running" });
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("Error");
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          imageUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setUploading(false);
            setImageUrl(downloadURL);
            setEmpty(false);
            if (typeof props.addNewProductImage !== "undefined") {
              props.addNewProductImage({
                fileName,
                fileType,
                imgURL: downloadURL,
              });
            }
          });
        }
      );
    } catch (error) {
      console.log("Error in Upload Function");
      console.log(error);
    }
  }

  function deleteImage() {
    var storageRef = firebase.storage();

    //Delete image By it URL
    var imgRef = storageRef.refFromURL(imageUrl);

    // Delete the file
    imgRef
      .delete()
      .then(() => {
        setEmpty(true);
        setFileName("");
        setFileType("");
        setFileNameError(null);
        setFileError(null);
        setFile(null);

        if (typeof props.deleteProductImage !== "undefined") {
          props.deleteProductImage({
            fileName,
            fileType,
            imgURL: imageUrl,
          });
        }
      })
      .catch((error) => {
        //Set Delete Error to Show
        console.log("Delete Error");
        console.log(error);
      });
  }

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
            <img src={imageUrl} alt={fileName} />
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
                label="Upload"
                styles={{
                  padding: "5px 10px",
                  backgroundColor: "#FADA35",
                  marginTop: "10px",
                  float: "right",
                }}
                onClick={async () => {
                  var formValidityCheck = await checkFormValidity();

                  if (formValidityCheck) {
                    console.log("Upload");
                    uploadImage();
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
                  if (!empty) {
                    deleteImage();
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
