Goby API
========

Just another api built with loopback..

Development
-----------

To start developing this app you'll need a running instance of mongo. The
project expects a local mongo installation, but you can override this using the
`DB_HOST` environment var.

Once you have your mongo up and running, just do:

~~~bash
yarn run dev
~~~

And it will start the loopback server.

### Testing

~~~bash
yarn test
# or, if you wanna exclude coverage
yarn test -- --no-coverage
~~~
