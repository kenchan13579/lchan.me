angular.module("myDirectives", [])
    .directive("goTop", function($window) {
        return function(scope, ele, attr) {
            ele.on("click", function(e) {
                e.preventDefault();
                $("html,body").stop().animate({
                    scrollTop: 0
                }, 1000, "easeOutCubic");
            });

        }
    })
    .directive("scrollSpy", function($window) {
        return {
            restrict: 'A',
            controller: function($scope) {
                $scope.spies = [];
                this.addSpy = function(spy) {
                    $scope.spies.push(spy);
                };
                $scope.section = [];
                $scope.highlight;

            },
            link: function(scope, ele, attr, ctrl) {
                var timeout;
                var spyElems = [];
                var prev;
                var highlight;
                scope.$watch("spies", function(spies) {
                    for (var i in spies) {
                        var spy = spies[i];
                        if (!spyElems[spy.id]) {
                            spyElems[spy.id] = ele.find("#" + spy.id);
                        }
                    }
                })
                $($window).on("scroll", function(e) {
                    spyHighlighter("xs");
                });
                $("#right-content").on("scroll", spyHighlighter);

                function spyHighlighter(size) {
                    var pos;
                    var highlightSpy = null;
                    for (var i in scope.spies) {
                        var spy = scope.spies[i];
                        spy.out();
                        if (size) {
                            pos = spyElems[spy.id].offset().top;
                        } else {
                            pos = spyElems[spy.id].position().top;
                        }

                        var scrollPos = $("#right-content").scrollTop() * 0.1 || $window.scrollY;

                        if (pos - scrollPos <= 0) {
                            spy.pos = pos;
                            if (highlightSpy == null) {

                                highlightSpy = spy;
                            }
                            if (highlightSpy.pos < spy.pos) {
                                highlightSpy = spy;
                            }


                        }
                    }
                    if (highlightSpy) {

                        highlightSpy.in();
                        prev = scope.highlight;
                        scope.highlight = highlightSpy.id;
                        if (scope.highlight != prev) {
                            if (timeout) {
                                clearInterval(timeout);
                                timeout = null;
                            }
                            var section = sectionName(scope.highlight);
                            var i = 0;
                            timeout = setInterval(function() {
                                i++;
                                scope.section = section.slice(0, i).split("");
                                scope.$apply();
                                if (i == section.length) {
                                    clearInterval(timeout);
                                    timeout = null;
                                }
                            }, 150);

                        }
                    }
                };
            }
        }

    })
    .directive("spy", function() {
        return {
            restrict: "A",
            require: "^scrollSpy",
            link: function(scope, elem, attr, ctrl) {
                ctrl.addSpy({
                    id: attr.spy,
                    in : function() {
                        elem.addClass("active");
                    },
                    out: function() {
                        elem.removeClass("active");
                    }
                });
            }
        }

    })
    .directive("goTo", function() {
        return {
            link: function(scope, ele, attr) {

                ele.on("click", function(e) {

                    scope.menu = false;
                    scope.$apply();

                })
            }
        }
    })
    .directive("flyingLabel", function() {

        return {
            link: function(scope, ele, attr) {
                ele.on("click", function(e) {
                    var input = this.previousElementSibling;
                    input.focus();

                });
            }
        }
    })

function sectionName(id) {
    switch (id) {
        case "aboutme":
            return "about me";
        case "education":
            return "edcuation";
        case "employment":
            return "employment";
        case "myskills":
            return "skills";
        case "contact":
            return "Contact Me";
        case "profolio":
            return "Profolio";
        default:
            "";
    }
}
