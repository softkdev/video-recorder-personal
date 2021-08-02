# test-hook-custom

> 

[![NPM](https://img.shields.io/npm/v/test-hook-custom.svg)](https://www.npmjs.com/package/test-hook-custom) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save test-hook-custom
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'test-hook-custom'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [Kavand-1400](https://github.com/Kavand-1400)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
