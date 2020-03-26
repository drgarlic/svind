import {
    SitemapStream,
    streamToPromise,
} from 'sitemap';

import * as packageJson from '../package.json';

// More information here: https://www.npmjs.com/package/sitemap

const urls = [
    {
        url: '/',
    }
];

export default (req, res) => {
    res.setHeader('Content-Type', 'application/xml');

    const sitemap = new SitemapStream({
        hostname: packageJson.homepage,
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
