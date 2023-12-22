# video-recorder-personal

>

[![NPM](https://img.shields.io/npm/v/video-recorder-personal.svg)](https://www.npmjs.com/package/video-recorder-personal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save video-recorder-personal
```

## Usage

for check the camera

```jsx
import React, { useEffect } from "react";

import { CameraCheck } from "video-recorder-personal";

const Example = () => {
  useEffect(() => {
    CameraCheck();
  }, []);
  return <div>{example}</div>;
};
```

for video recorder

```jsx
import React,  from "react";

import { RecordVideo } from "video-recorder-personal";

const Example = () => {

  return (
    <div>
      <RecordVideo
        setVideo={setvideo}
        videoHelp={videoHelp}
        reload={reload}
      />
    </div>
  );
};
```

For the style this package

```jsx
import "video-recorder-personal/src/style.css";
```

## License

MIT © [softkdev](https://github.com/softkdev)

---

This hook is package using [create-react-hook](https://github.com/hermanya/create-react-hook).
