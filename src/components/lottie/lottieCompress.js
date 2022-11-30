const assert = require('assert');
import LottieCompress from 'lottie-compress'
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './banner.json')).toString()

(async () => {
  const lottieCompress = new LottieCompress(data);
  const ret = await lottieCompress.execute()
  assert(ret.tiny === '75')
})()