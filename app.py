import os
from functools import partial

import aiohttp
from aiohttp import web

import config
from utils import logger


async def index(request):
    return web.Response(text='PR review notifier')


app = web.Application()
app.router.add_get('/', index)


if __name__ == '__main__':
    uprint = partial(print, flush=True)
    port = int(os.environ.get('PORT', 8080))
    web.run_app(app, print=uprint, port=port)
