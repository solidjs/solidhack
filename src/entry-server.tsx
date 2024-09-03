// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>SolidHack 2024</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/img/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/img/favicons/favicon-16x16.png"
          />
          <meta
            name="msapplication-TileImage"
            content="/img/favicons/ms-icon-144x144.png"
          />
          <meta name="msapplication-TileColor" content="#2c4f7c" />
          <meta name="theme-color" content="#2c4f7c" />
          <meta name="msapplication-TileColor" content="#2c4f7c" />
          <meta name="theme-color" content="#2c4f7c" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
          />
          <meta name="og:title" content="SolidHack" />
          <meta name="og:url" content="https://hack.solidjs.com" />
          <meta name="og:type" content="article" />
          <meta name="og:image:width" content="1200" />
          <meta name="og:image:height" content="627" />
          <meta
            name="og:image:url"
            content="https://hack.solidjs.com/ograph.jpg"
          />
          <meta
            name="og:image:secure_url"
            content="https://hack.solidjs.com/ograph.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://hack.solidjs.com/ograph.jpg"
          />
          <meta name="twitter:site" content="@solid_js" />
          <meta
            name="msvalidate.01"
            content="2430336572A8F5A3CCB92DC181ADA489"
          />
          <meta
            name="og:description"
            content="SolidHack 2024 is a public hackathon presented by the Solid Team giving away USD$15k in prizes in 3 categories."
          />
          <meta
            name="description"
            content="SolidHack 2024 is a public hackathon presented by the Solid Team giving away USD$15k in prizes in 3 categories."
          />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body id="app">
          {children}
          {scripts}
        </body>
      </html>
    )}
  />
));
