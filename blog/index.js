var mongoClient = require('../mongo/connect');

exports.model = function(req, res, callback) {
    console.log(req.params);

    var model = {};

    //page
    var pageList = 5;
    var currentPage = req.params ? req.params[2] ? req.params[2] - 1 : 0 : 0;
    model.page = {
        current: currentPage + 1
    };

    //class
    var blogQuery = {};
    if (req.params && req.params.length >= 2) {
        model.classid = blogQuery.classid = req.params[1];
    }


    mongoClient.connect(function(db) {

        //get class
        db.collection('blogclass').find({}).sort({
            classid: 1
        }).toArray(function(err, res) {
            model.blogClass = res;
            queryOk();
        });

        //get list
        var blogCollection = db.collection('blog');
        blogCollection.count(function(err, res) {
            model.total = res;
            getList();
        });

        function getList() {
            var tarBlog = blogCollection.find(blogQuery);
            tarBlog.count(function(err, res) {
                model.page.total = Math.ceil(res / pageList);
                tarBlog.sort({
                    "pubtime": -1
                }).skip(currentPage * pageList).limit(pageList).toArray(function(err, res) {
                    model.blogList = res.length > 0 ? res : '';

                    queryOk();
                });
            });

        }


        var queryCount = 0;

        function queryOk() {

            queryCount++;
            if (queryCount >= 2) {
                if (callback) callback(model);
            }
        }
    });
};