const nextSEODefaultConfig = {
  title: 'Home | my-next-task',
  description: 'A personalised task management aplication',
  openGraph: {
    locale: 'en_US',
    url: 'https://www.my-next-task.com',
    site_name: 'my-next-task',
    images: [
      {
        url: 'https://www.my-next-task.com/og-image.png',
        alt: 'Main Og-Image',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    site: 'https://my-next-task.com',
    cardType: 'summary_large_image',
  },
};

export default nextSEODefaultConfig;
