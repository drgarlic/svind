import {
    SitemapStream,
    streamToPromise,
} from 'sitemap';

import * as faviconsConfig from '../config/favicons.json';

const urls = [
    {
        url: '/',
    },
    {
        url: '/date',
    },
];

export default (req, res) => {
    res.setHeader('Content-Type', 'application/xml');

    const sitemap = new SitemapStream({
        hostname: faviconsConfig.url,
    });

    urls.forEach((url) => {
        sitemap.write(url);
    });

    sitemap.end();

    streamToPromise(sitemap)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).end();
        });
};
