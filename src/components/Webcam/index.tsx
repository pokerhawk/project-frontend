import React, { useState } from "react";
import * as S from './style'
import Webcam from "react-webcam";
import { PageWrapper } from "../../styles/Global";
import Button from "../Button";

const WebCam = () => {
  const [webcamActive, setWebcamActive] = useState(false);
  const webcamRef = React.useRef(null);

  return (
    <PageWrapper>
      <div>
        <S.WebcamWrapper>
          {webcamActive ? (
            <Webcam
              audio={false}
              ref={webcamRef}
            />
          ) : (<div><p>Webcam Off</p></div>)}
          <Button
            socialButton
            onClick={() => setWebcamActive(!webcamActive)}
          >
            {webcamActive ? "Turn Off" : "Turn On"} Webcam
          </Button>
        </S.WebcamWrapper>
      </div>
    </PageWrapper>
  );
};

export default WebCam;
