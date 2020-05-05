# codedoodl.es doodle source archive

This repo contains all doodle assets for [codedoodl.es](http://github.com/fluuuid/codedoodl.es).

Since the project is no longer live (:sad face:), if you would like to view the site you can now run it yourself:

* Step 1: run a webserver on the root of this repository
* Step 2: build / run the site application from [fluuuid/codedoodl.es](http://github.com/fluuuid/codedoodl.es) and change the [`config.buckets.SOURCE`](https://github.com/fluuuid/codedoodl.es/blob/bc6dfcbe45cafa5ea4295aa73467bcdc39864156/config/server.coffee#L15) variable to be the domain you're serving the doodles from.

**NOTE** the static assets in this repository have all been gzip encoded so you'll need the webserver you run in step 1 to serve all assets with the `"Content-Encoding=gzip"` header.
