import Head from 'next/head';
import App from '../App';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard de Métricas de Retención</title>
        <meta name="description" content="Dashboard moderno para análisis de retención de clientes con métricas CLTV, RFM y campañas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dashboard Analytics Team" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dashboard de Métricas de Retención" />
        <meta property="og:description" content="Dashboard moderno para análisis de retención de clientes" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard de Métricas de Retención" />
        <meta name="twitter:description" content="Dashboard moderno para análisis de retención de clientes" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <App />
    </>
  );
}