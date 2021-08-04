# video-recorder-itsaaz

>

[![NPM](https://img.shields.io/npm/v/video-recorder-itsaaz.svg)](https://www.npmjs.com/package/video-recorder-itsaaz) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save video-recorder-itsaaz
```

## Usage

for check the camera

```jsx
import React, { useEffect } from "react";

import { CameraCheck } from "video-recorder-itsaaz";

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

import { RecordVideo } from "video-recorder-itsaaz";

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
import "video-recorder-itsaaz/src/style.css";
```

## License

MIT © [Kavand-1400](https://github.com/Kavand-1400)

---

This hook is package using [create-react-hook](https://github.com/hermanya/create-react-hook).
