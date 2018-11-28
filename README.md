
# Weather

[![Dependency status][deps]][deps-url]
[![Dev dependency status][dev-deps]][dev-deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[deps]: https://david-dm.org/TrigenSoftware/weather.svg
[deps-url]: https://david-dm.org/TrigenSoftware/weather

[dev-deps]: https://david-dm.org/TrigenSoftware/weather/dev-status.svg
[dev-deps-url]: https://david-dm.org/TrigenSoftware/weather?type=dev

[build]: http://img.shields.io/travis/TrigenSoftware/weather.svg
[build-url]: https://travis-ci.org/TrigenSoftware/weather

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/weather.svg
[greenkeeper-url]: https://greenkeeper.io/

Architecture demo app.

## Basic commands

Start development server: 

```bash
yarn start # or
npm start
```

Build sources for production:

```bash
yarn build # or
npm run build
```

Run tests:

```bash
yarn test # or
npm test
```

## Environment variables

To be able to build this app, you should provide some environment variables:

```
OPENWEATHER_APPID=XXX
```

You can create `.env` in project root with this variables.
