(function parseUrl() {
    var url = purl('http://telerikacademy.com/Courses/Courses/Details/239'),
        jsonUrl = {
            protocol: url.attr('protocol'),
            server: url.attr('host'),
            resource: url.attr('relative')
        };

    console.log(jsonUrl);
})();