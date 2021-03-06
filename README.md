# Marketo Programming Challenge

## Setup

1. Install [NodeJS](https://nodejs.org/)
2. Run `node app.js [leads] [result] [logs]`. Parameters are optional.
  * `leads` is the name of input lead file.
  * `result` is the name of output processed lead file.
  * `logs` is the name of log file.

## Acknowledgements
* File read and write by NodeJS

## Notes
* Could be done much easier with Lodash, but this is a programming challenge for a reason.
* Could be made more user friendly with a web UI.
* Right now checks for duplicates with JS dictionary for simplicity. Could also be done with other ways, such as MongoDB unique key.

## License

Copyright 2017, Alex Yao

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
