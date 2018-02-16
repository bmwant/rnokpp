import os
from functools import partial

import aiohttp
from aiohttp import web
from aiohttp import hdrs

import config
from utils import logger


async def index(request):
    # Content-Type: text/html;
    headers = {
        hdrs.CONTENT_TYPE: 'text/html',
    }
    response = web.FileResponse('templates/index.html', headers=headers)
    return response


def setup_static_routes(app):
    app.router.add_static('/static/',
                          path=config.PROJECT_ROOT / 'static',
                          name='static')
    app.router.add_static('/node_modules/',
                          path=config.PROJECT_ROOT / 'node_modules',
                          name='node_modules')


def launch():
    app = web.Application()
    app.router.add_get('/', index)
    setup_static_routes(app)
    uprint = partial(print, flush=True)
    port = int(os.environ.get('PORT', 8080))

    uprint('Running aiohttp {}'.format(aiohttp.__version__))
    web.run_app(app, print=uprint, port=port)


if __name__ == '__main__':
    launch()
