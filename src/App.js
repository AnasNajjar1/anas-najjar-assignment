import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Upload from "./components/Upload";
import { handleFile, performOcr } from "./utils/ocrUtils";
import { generateLlmResponse } from "./utils/llmUtils";

const Main = styled.div`
  background: #fafafb;
  min-height: 100vh;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`;

const Frame = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
`;

const App = () => {
  const [imgPreviewUri, setImgPreviewUri] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  /**
   * Handle errors by setting the error message state.
   * @param {string} msg - The error message to be displayed.
   */
  const handleError = (msg) => {
    setError(msg);
  };

  /**
   * Handle the drag over event for the file upload.
   * @param {Event} event - The drag over event.
   */
  const onDragOver = (event) => {
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  };

  /**
   * Handle the form submission by performing OCR on the uploaded image,
   * and then generating a response from the LLM to extract specific data fields.
   */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Perform OCR on the uploaded image to extract text
      const ocrText = await performOcr(imgFile, handleError);
      console.log("data ", ocrText);

      // Generate a response from the LLM to extract specific data fields from the OCR text
      const response = await generateLlmResponse(ocrText, handleError);
      setExtractedData(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      handleError(
        "An error occurred during the OCR process. Please try again."
      );
    }
  };

  return (
    <Main className="App">
      <Frame>
        <Switch>
          <Route path="/" exact>
            <Upload
              error={error}
              setError={setError}
              handleFile={(event) => handleFile(event, handleError, setImgFile, setImgPreviewUri)}
              onDragOver={onDragOver}
              imgPreviewUri={imgPreviewUri}
              setImgPreviewUri={setImgPreviewUri}
              uploadPicture={handleSubmit}
              loading={loading}
              data={extractedData}
              setData={setExtractedData}
              setFile={setImgPreviewUri}
            />
          </Route>
        </Switch>
      </Frame>
      <Footer>By Anas Najjar</Footer>
    </Main>
  );
};

export default App;
