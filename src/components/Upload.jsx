import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import ResultData from "./ResultData";
import ErrorPage from "./ErrorPage";

const Frame = styled.div`
  min-width: 402px;
  min-height: 469px;
  padding: 36px 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #4f4f4f;
  font-size: 18px;
  line-height: 27px;
`;

const Subtitle = styled.p`
  color: ${(props) => (props.color ? "firebrick" : "#828282")};
  font-size: 10px;
  line-height: 15px;
`;

const DragNDrop = styled.div`
  background: #f6f8fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 338px;
  height: 224.4px;
  border-radius: 12px;
  border: 1px dashed;
  border-color: ${(props) => (props.picture === "true" ? "green" : "#97BEF4")};
`;

const DnDText = styled.p`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #bdbdbd;
`;

const Preview = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
  border-radius: 12px;
`;

const Or = styled.p`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #bdbdbd;
  margin: 1em;
`;
const Button = styled.p`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.035em;
  background: ${(props) =>
    props.color === "cancel" ? "firebrick" : "#2F80ED"};
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
`;

const Loading = styled.div`
  padding: 36px 32px;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.035em;
  text-align: start;
`;
const Loader = styled.div`
  margin-top: 30px;
  width: 340px;
  height: 6px;
  background: #f2f2f2;
  border-radius: 8px;
`;
const LoaderBar = styled.div`
  height: 6px;
  background: #2f80ed;
  border-radius: 8px;
  animation: loading 2.2s ease-out infinite;
  position: relative;

  @keyframes loading {
    0% {
      left: 0%;
      right: 100%;
      width: 0;
    }
    10% {
      left: 0%;
      right: 75%;
      width: 25%;
    }
    90% {
      right: 0%;
      left: 75%;
      width: 25%;
    }
    100% {
      left: 100%;
      right: 0%;
      width: 0%;
    }
  }
`;

const Upload = ({
  error,
  setError,
  handleFile,
  onDragOver,
  imgPreviewUri,
  setImgPreviewUri,
  uploadPicture,
  loading,
  data,
  setData,
  setFile,
}) => {
  // Display error page if an error occurs
  if (error) {
    return (
      <ErrorPage
        setData={setData}
        setFile={setFile}
        error={error}
        setError={setError}
      />
    );
  }

   // Display loading state while data is being processed
  if (loading && !data)
    return (
      <Loading>
        Analysing...
        <Loader>
          <LoaderBar />
        </Loader>
      </Loading>
    );

    // Display result data if extraction is successful
  if (!loading && data)
    return <ResultData data={data} setData={setData} setFile={setFile} />;
  return (
    <Frame>
      <Header>
        <Title>Upload your ID Card</Title>
        <Subtitle>File should be Jpeg, Png,...</Subtitle>
      </Header>
      <DragNDrop
        onDrop={handleFile}
        onDragOver={onDragOver}
        picture={imgPreviewUri ? "true" : undefined}
      >
        {!!imgPreviewUri ? (
          <Preview id="output" width="200" alt="Preview" src={imgPreviewUri} />
        ) : (
          <>
            <Icon name="picture" size="massive" />
            <DnDText>Drag & Drop your image here</DnDText>
          </>
        )}
      </DragNDrop>
      {!!imgPreviewUri ? (
        <div>
          <Button onClick={uploadPicture}>Upload</Button>
          <Button
            onClick={() => {
              setImgPreviewUri(null);
            }}
            color="cancel"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <Or>Or</Or>
          <label htmlFor="button">
            <Button>Choose a file</Button>
          </label>
          <input
            hidden
            id="button"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </>
      )}
    </Frame>
  );
};

export default Upload;
